import 'package:fllmbooking_app/data/models/celebrity.dart';
import 'package:flutter/material.dart';
import 'dart:convert' show utf8;

class Celebritypreview extends StatelessWidget {
  final Celebrity celebrity;
  const Celebritypreview({required this.celebrity});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        children: [
          CircleAvatar(
            radius: 30,
            backgroundImage: NetworkImage(celebrity.image ?? ''),
          ),
          const SizedBox(height: 8),
          Container(
            width: 80,
            child: Text(
              utf8.decode(celebrity.name?.codeUnits ?? []),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 13,
                fontWeight: FontWeight.bold,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
