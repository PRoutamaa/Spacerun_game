import 'dart:async';
import 'dart:math' as math; 
import 'package:flame/components.dart';
import 'package:flame/events.dart'; 
import 'package:flame/game.dart';
import 'package:flutter/material.dart';                       
import 'package:flutter/services.dart';  
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
 
import 'components/components.dart';
import 'config.dart';
import 'main.dart';

enum GameState { intro, playing, gameOver, won }

class SpaceRun extends FlameGame with HasCollisionDetection, KeyboardEvents, DragCallbacks {
  int level;

  SpaceRun({this.level = 1})
    : super(
        camera: CameraComponent.withFixedResolution(
          width: gameWidth,
          height: gameHeight,
        ),
      );

  final rand = math.Random();  
  double get width => size.x;
  double get height => size.y;
  double _spawnTimer = 0.0;
  int score = 0;
  int lives = 3;
  int highestScore = 0;
  int levelScore = 0;
  int _lastScore = 0;
  double _introTimer = 5.0;
  TextComponent? _introText;
  late TextComponent _scoreText;
  late TextComponent _livesText;
  late TextComponent _levelText;
  late TextComponent _levelScoreText;
  GameState gameState = GameState.intro;

  @override
  FutureOr<void> onLoad() async {
    super.onLoad();

    await _loadGameData();

    camera.viewfinder.anchor = Anchor.topLeft;

    world.add(Arena());

    world.add(
      Ship(
        size: Vector2(shipWidth, shipHeight),
        position: Vector2(width * 0.1, height * (2 / 3)),
      ),
    ); 

    _livesText = TextComponent(
      text: 'Lives: $lives',
      position: Vector2(20, 20),
      textRenderer: TextPaint(
        style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
      ),
    );

    _scoreText = TextComponent(
      text: 'Score: $score',
      position: Vector2(width - 20, 20),
      anchor: Anchor.topRight,
      textRenderer: TextPaint(
        style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
      ),
    );

    _levelText = TextComponent(
      text: 'Level: $level',
      position: Vector2(width / 2, 20),
      anchor: Anchor.topCenter,
      textRenderer: TextPaint(
        style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
      ),
    );

    _levelScoreText = TextComponent(
      text: 'Level parts: $levelScore / 5',
      position: Vector2(width - 20, 60),
      anchor: Anchor.topRight,
      textRenderer: TextPaint(
        style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
      ),
    );

    camera.viewport.addAll([_livesText, _scoreText, _levelText, _levelScoreText]);

    _showIntroText();
  }

  @override
  void update(double dt) {
    super.update(dt);

    if (score > _lastScore) {
      levelScore += (score - _lastScore);
      _lastScore = score;
      _saveGameData();
    }

    _livesText.text = 'Lives: $lives';
    _scoreText.text = 'Score: $score';
    _levelText.text = 'Level: $level';
    _levelScoreText.text = 'Level parts: $levelScore / 5';

    if (gameState == GameState.intro) {
      _introTimer -= dt;
      if (_introTimer <= 0) {
        if (_introText != null) {
          _introText?.removeFromParent();
          _introText = null;
        }
        gameState = GameState.playing;
      }
      return; // Block game updates during intro
    }

    if (gameState != GameState.playing) {
      return; 
    }

    final ships = world.children.query<Ship>();
    if (ships.isNotEmpty) {
      final ship = ships.first;
      // Clamp ship position to be within screen bounds.
      // The right boundary has special game logic, so we only handle left, top, and bottom here.
      if (ship.position.x < 0) {
        ship.position.x = 0;
      }
      ship.position.y = ship.position.y.clamp(0, height - ship.height);
    }

    if (lives <= 0) {
      gameState = GameState.gameOver;
      _showGameOver();
      return;
    }

    if (ships.isNotEmpty && ships.last.position.x > (width - 20)) {
      if (levelScore >= 5) {
        gameState = GameState.won;
        _showLevelComplete();
        return;
      } else {
        ships.last.position.x = width - 20; 
      }
    }

    _spawnTimer -= dt;
    if (_spawnTimer <= 0) {
      _spawnBall();
      _spawnTimer = (rand.nextDouble() * 2) / (level * 2);
    }
  }

  void _spawnBall() {
    final isKiller = rand.nextBool();
    
    final spawnX = ballRadius + rand.nextDouble() * (width - 2 * ballRadius);
    final spawnPosition = Vector2(spawnX, 0);
    final speedMultiplier = level == 1 ? 1.0 : level / 2.0;
    final spawnVelocity = Vector2(0, height / 4) * speedMultiplier;

    if (isKiller) {
      world.add(
        Meteorite(radius: ballRadius, position: spawnPosition, velocity: spawnVelocity),
      );
    } else {
      world.add(
        ShipParts(radius: ballRadius, position: spawnPosition, velocity: spawnVelocity),
      );
    }
  }

  void _showIntroText() {
    gameState = GameState.intro;
    _introTimer = 5.0;
    _introText = TextComponent(
      text: 'Level $level: collect minimum 5 parts before moving to next level',
      position: Vector2(width / 2, height / 2),
      anchor: Anchor.center,
      textRenderer: TextPaint(
        style: const TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.bold),
      ),
    );
    camera.viewport.add(_introText!);
  }

  void _showGameOver() {
    if (score > highestScore) {
      highestScore = score;
    }
    _saveGameData();
     
    camera.viewport.add(
      TextComponent(
        text: 'Game Over',
        position: Vector2(width / 2, height / 2 - 50),
        anchor: Anchor.center,
        textRenderer: TextPaint(
          style: const TextStyle(color: Colors.red, fontSize: 64, fontWeight: FontWeight.bold),
        ),
      ),
    );

    camera.viewport.add(
      ScoreScreenButton(
        text: 'Review score',
        position: Vector2(width / 2, height / 2 + 50),
        anchor: Anchor.center,
        textRenderer: TextPaint(
          style: const TextStyle(color: Colors.blue, fontSize: 32, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  void _showLevelComplete() {
    if (score > highestScore) {
      highestScore = score;
    }
    _saveGameData();
     
    final winText = level < 5 ? 'You passed level $level' : 'You won!';

    camera.viewport.add(
      TextComponent(
        text: winText,
        position: Vector2(width / 2, height / 2 - 50),
        anchor: Anchor.center,
        textRenderer: TextPaint(
          style: const TextStyle(color: Colors.green, fontSize: 48, fontWeight: FontWeight.bold),
        ),
      ),
    );

    if (level < 5) {
      camera.viewport.add(
        NextLevelButton(
          gameRef: this,
          text: 'Next Level',
          position: Vector2(width / 2, height / 2 + 20),
          anchor: Anchor.center,
          textRenderer: TextPaint(
            style: const TextStyle(color: Colors.blue, fontSize: 32, fontWeight: FontWeight.bold),
          ),
        ),
      );
    }

    camera.viewport.add(
      ScoreScreenButton(
        text: 'Review score',
        position: Vector2(width / 2, height / 2 + (level < 5 ? 80 : 50)),
        anchor: Anchor.center,
        textRenderer: TextPaint(
          style: const TextStyle(color: Colors.blue, fontSize: 32, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  void goToNextLevel() {
    level += 1;
    levelScore = 0;
    _spawnTimer = 0.0;

    world.removeAll(world.children.query<Meteorite>());
    world.removeAll(world.children.query<ShipParts>());

    final ships = world.children.query<Ship>();
    if (ships.isNotEmpty) {
      ships.first.position = Vector2(width * 0.1, height * (2 / 3));
    }

    camera.viewport.removeAll(
      camera.viewport.children.where((c) => c != _livesText && c != _scoreText && c != _levelText && c != _levelScoreText)
    );
    _showIntroText();
  }

  @override  
  KeyEventResult onKeyEvent(
    KeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    super.onKeyEvent(event, keysPressed);
    if (gameState != GameState.playing) return KeyEventResult.ignored;

    switch (event.logicalKey) {
      case LogicalKeyboardKey.arrowLeft:
        world.children.query<Ship>().first.moveBy(Vector2(-shipHorizontalStep, 0));
      case LogicalKeyboardKey.arrowRight:
        world.children.query<Ship>().first.moveBy(Vector2(shipHorizontalStep, 0));
      case LogicalKeyboardKey.arrowDown:
        world.children.query<Ship>().first.moveBy(Vector2(0, shipVerticalStep));
      case LogicalKeyboardKey.arrowUp:
        world.children.query<Ship>().first.moveBy(Vector2(0, -shipVerticalStep));
    }
    return KeyEventResult.handled;
  } 

  @override
  void onDragUpdate(DragUpdateEvent event) {
    if (gameState != GameState.playing) return;
    final ships = world.children.query<Ship>();
    if (ships.isNotEmpty) {
      // Update position directly to avoid the MoveToEffect lag,
      // and apply a sensitivity multiplier to increase speed.
      const dragSensitivity = 2.0; 
      ships.first.position += event.canvasDelta * dragSensitivity;
    }
  }

  Future<void> _loadGameData() async {
    final prefs = await SharedPreferences.getInstance();
    highestScore = prefs.getInt('highestScore') ?? 0;
    score = prefs.getInt('score') ?? 0;
    _lastScore = score;
  }

  Future<void> _saveGameData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('highestScore', highestScore);
    await prefs.setInt('score', score);
  }
}

class ScoreScreenButton extends TextComponent with TapCallbacks {
  ScoreScreenButton({
    super.text,
    super.position,
    super.anchor,
    super.textRenderer,
  });

  @override
  void onTapDown(TapDownEvent event) {
    Get.offAll(() => const ResultsScreen());
  }
}

class NextLevelButton extends TextComponent with TapCallbacks {
  final SpaceRun gameRef;

  NextLevelButton({
    required this.gameRef,
    super.text,
    super.position,
    super.anchor,
    super.textRenderer,
  });

  @override
  void onTapDown(TapDownEvent event) {
    gameRef.goToNextLevel();
  }
}