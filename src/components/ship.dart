import 'dart:async';
import 'dart:math' as math;
import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flame/effects.dart';
import 'package:flame/events.dart';

import '../space_run.dart';

class Ship extends SpriteComponent
    with DragCallbacks, HasGameReference<SpaceRun> {
  Ship({
    required super.position,
    required super.size,
  }) : super(anchor: Anchor.center, children: [RectangleHitbox()]);

  @override
  FutureOr<void> onLoad() async {
    await super.onLoad();
    
    sprite = await game.loadSprite('ship.png');
    // Rotate 90 degrees (pi/2 radians) to point to the right
    angle = math.pi / 2;
  }

  @override
  void onDragUpdate(DragUpdateEvent event) {
    super.onDragUpdate(event);
    position.x = (position.x + event.localDelta.x).clamp(0, game.width);
    position.y = (position.y + event.localDelta.y).clamp(0, game.height);
  }

  void moveBy(Vector2 delta) {
    add(
      MoveToEffect(
        Vector2(
          (position.x + delta.x).clamp(0, game.width),
          (position.y + delta.y).clamp(0, game.height),
        ),
        EffectController(duration: 0.1),
      ),
    );
  }
}