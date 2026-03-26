import 'dart:async';
import 'dart:math';

import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flame/effects.dart';
import 'package:flutter/material.dart';

import '../space_run.dart';
import 'ship.dart';

class Meteorite extends SpriteComponent with CollisionCallbacks, HasGameReference<SpaceRun>{
  Meteorite({
    required this.velocity,
    required super.position,
    required this.radius,
  }) : super(
         size: Vector2.all(radius * 2),
         anchor: Anchor.center,
         children: [CircleHitbox()],
       );

  final Vector2 velocity;
  final double radius;
  static final _random = Random();
  final double _rotationSpeed = (_random.nextDouble() - 0.5) * 5;

  @override
  FutureOr<void> onLoad() async {
    await super.onLoad();
    sprite = await game.loadSprite('meteorBrown_big2.png');
  }

  @override
  void update(double dt) {
    super.update(dt);
    position += velocity * dt;
    angle += _rotationSpeed * dt;

    if (position.y - radius > game.height ||
        position.y + radius < 0 ||
        position.x - radius > game.width ||
        position.x + radius < 0) {
      removeFromParent();
    }
  }

  @override
  void onCollisionStart(
    Set<Vector2> intersectionPoints,
    PositionComponent other,
  ) {
    super.onCollisionStart(intersectionPoints, other);

    if (game.gameState != GameState.playing) {
      return;
    }

    if (other is Ship) {
      removeFromParent();
      game.lives -= 1;
      if (game.lives > 0 ) {
        game.world.add(
        TextComponent(
          text: 'Hit!',
          position: Vector2(game.width / 2, game.height / 2),
          anchor: Anchor.center,
          textRenderer: TextPaint(
            style: const TextStyle(color: Colors.red, fontSize: 48),
          ),
          children: [
            RemoveEffect(delay: 2.0),
          ],
        ),
      );
      }
      
    } else {                                               
      debugPrint('collision with $other');
    }
  }
}