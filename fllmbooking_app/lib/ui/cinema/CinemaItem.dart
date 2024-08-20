import 'package:fllmbooking_app/data/models/CinemaResponse.dart';
import 'package:flutter/material.dart';
import 'dart:convert' show utf8;

class CinemaItem extends StatelessWidget {
  final CinemaResponse item;
  final double distance;
  const CinemaItem({required this.item, required this.distance});

  @override
  Widget build(BuildContext context) {
    String parseName = utf8.decode(item.name!.codeUnits);
    String parseAddress = utf8.decode(item.address!.codeUnits);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8.0),
            child: Image.network(
              item.images!.url!,
              fit: BoxFit.cover,
              height: 100,
              width: 150,
              errorBuilder: (context, error, stackTrace) {
                return Image.network(
                  'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=',
                  fit: BoxFit.cover,
                  height: 100,
                  width: 150,
                );
              },
            ),
          ),
          const SizedBox(
            width: 8.0,
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      flex: 2,
                      child: Text(
                        parseName,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Flexible(
                      flex: 1,
                      child: Row(
                        children: [
                          const Icon(Icons.location_on,
                              color: Colors.cyanAccent),
                          Expanded(
                              child: Text(
                            '${double.parse(distance.toStringAsFixed(1))} km',
                            style: const TextStyle(
                              color: Colors.cyanAccent,
                              fontSize: 14,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          )),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 8,
                ),
                Text(
                  parseAddress,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 13,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(
                  height: 8,
                ),
                Text(
                  item.phone!,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 13,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
