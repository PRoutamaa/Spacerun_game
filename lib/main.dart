import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'space_run.dart';                         

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Space Run',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const StartScreen(),
    );
  }
}

class ResultsScreen extends StatelessWidget {
  const ResultsScreen({super.key});

  Future<Map<String, int>> _getScores() async {
    final prefs = await SharedPreferences.getInstance();
    final currentScore = prefs.getInt('score') ?? 0;
    
    await prefs.setInt('score', 0); // Zero out the score for the next game

    return {
      'score': currentScore,
      'highestScore': prefs.getInt('highestScore') ?? 0,
    };
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: FutureBuilder<Map<String, int>>(
          future: _getScores(),
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return const CircularProgressIndicator();
            }
            final score = snapshot.data!['score']!;
            final highestScore = snapshot.data!['highestScore']!;

            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'Results',
                  style: TextStyle(fontSize: 64, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 50),
                Text('Score: $score', style: const TextStyle(fontSize: 32, color: Colors.white)),
                const SizedBox(height: 20),
                Text('Highest score: $highestScore', style: const TextStyle(fontSize: 32, color: Colors.white)),
                const SizedBox(height: 50),
                ElevatedButton(
                  onPressed: () {
                    Get.offAll(() => const LevelScreen());
                  },
                  child: const Text('Play again', style: TextStyle(fontSize: 24)),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}

class StartScreen extends StatelessWidget {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Space run',
              style: TextStyle(
                fontSize: 64,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 50),
            ElevatedButton(
              onPressed: () {
                Get.to(() => LevelScreen());
              },
              child: const Text('Start game', style: TextStyle(fontSize: 24)),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}

class LevelScreen extends StatelessWidget {
  const LevelScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Choose level',
              style: TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 50),
            ...List.generate(5, (index) {
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: ElevatedButton(
                  onPressed: () async {
                    final prefs = await SharedPreferences.getInstance();
                    await prefs.setInt('score', 0);
                    Get.to(() => GameScreen(level: index + 1));
                  },
                  child: Text('Level ${index + 1}', style: const TextStyle(fontSize: 24)),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class GameScreen extends StatelessWidget {
  final int level;
  
  const GameScreen({super.key, required this.level});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GameWidget(game: SpaceRun(level: level)),
    );
  }
}