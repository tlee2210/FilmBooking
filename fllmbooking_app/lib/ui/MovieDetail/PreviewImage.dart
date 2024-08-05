import 'package:flutter/material.dart';

class Previewimage extends StatelessWidget {
  final String imageUrl;
  const Previewimage({required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Stack(
        children: [
          Positioned(
            child: Image.network(
              imageUrl,
              fit: BoxFit.cover,
            ),
          ),
          Positioned(
            top: 0,
            right: 0,
            child: IconButton(
              icon: const Icon(Icons.close, color: Colors.white, size: 30),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ),
        ],
      ),
    );
  }
}
