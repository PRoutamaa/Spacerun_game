import 'dart:async';
import 'dart:math';

import 'package:flame/collisions.dart';
import 'package:flame/components.dart';

import '../space_run.dart';
import 'ship.dart';

class ShipParts extends SpriteComponent with CollisionCallbacks, HasGameReference<SpaceRun> {
  ShipParts({
    required this.velocity,
    required super.position,
    required this.radius,
  }) : super(
         size: Vector2.all(radius * 1.2 * 2),
         anchor: Anchor.center,
         children: [CircleHitbox()],
       );

  final Vector2 velocity;
  final double radius;
  static final _random = Random();
  final double _rotationSpeed = (_random.nextDouble() - 0.5) * 5;

  static const _partImages = [
    'parts/cockpitRed_0.png',
    'parts/cockpitRed_1.png',
    'parts/cockpitRed_2.png',
    'parts/cockpitRed_3.png',
    'parts/cockpitRed_4.png',
    'parts/wingRed_1.png',
    'parts/wingRed_2.png',
    'parts/wingRed_3.png',
    'parts/wingRed_4.png',
  ];

  @override
  FutureOr<void> onLoad() async {
    await super.onLoad();
    
    // Pick a random image path from the list
    final randomImage = _partImages[_random.nextInt(_partImages.length)];
    sprite = await game.loadSprite(randomImage);
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
    if (other is Ship) {
      game.score += 1;
      removeFromParent();
    }
  }
}