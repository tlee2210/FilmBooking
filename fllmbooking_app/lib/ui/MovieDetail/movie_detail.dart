import 'package:flutter/material.dart';

class MovieDetailPage extends StatefulWidget {
  const MovieDetailPage({super.key});

  @override
  State<MovieDetailPage> createState() => _MovieDetailPageState();
}

class _MovieDetailPageState extends State<MovieDetailPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Movie Detail'),
      ),
      body: Center(
        child: Text('Movie Detail'),
      ),
    );
  }
}
