import 'package:flutter/material.dart';

import '../../data/models/item_introduce.dart';
import '../MovieDetail/movie_detail.dart';

class MovieCard extends StatelessWidget {
  final ItemIntroduce item;

  const MovieCard({
    required this.item,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => MovieDetailPage(),
          ),
        );
      },
      child: Card(
        color: const Color(0xff252836),
        shape: ContinuousRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(8.0),
                topRight: Radius.circular(8.0),
              ),
              child: Image.network(
                item.imagePortrait,
                fit: BoxFit.cover,
                height: 240,
                width: double.infinity,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 4.0),
                  Text(
                    item.name,
                    style: const TextStyle(
                      color: Colors.white,
                      backgroundColor: Color(0xff252836),
                      fontSize: 14.0,
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}