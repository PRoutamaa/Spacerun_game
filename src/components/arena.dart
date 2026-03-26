import 'dart:async';

import 'package:flame/components.dart';
import 'package:flutter/material.dart';

import '../space_run.dart';

class Arena extends RectangleComponent with HasGameReference<SpaceRun> {
  Arena() : super(paint: Paint()..color = Colors.black);

  @override
  FutureOr<void> onLoad() async {
    super.onLoad();
    size = Vector2(game.width, game.height);
  }
}