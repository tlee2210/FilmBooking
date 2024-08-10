import 'package:fllmbooking_app/data/models/NewsItemModel.dart';
import 'package:flutter/material.dart';
import 'package:html/parser.dart';
import 'dart:convert' show utf8;

class NewsItem<T extends NewsItemModel> extends StatelessWidget {
  final T item;

  NewsItem({required this.item});

  @override
  Widget build(BuildContext context) {
    String parseDescription =
        parse(utf8.decode(item.description!.codeUnits)).body!.text;
    String parseName = parse(utf8.decode(item.name!.codeUnits)).body!.text;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8.0),
            child: Image.network(
              item.thumbnail!,
              fit: BoxFit.cover,
              height: 100,
              width: 150,
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
                Text(
                  parseName,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(
                  height: 8,
                ),
                Text(
                  parseDescription,
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
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(4),
                        border: Border.all(
                          color: Colors.cyanAccent,
                        ),
                      ),
                      child: Wrap(
                        children: [
                          const Icon(
                            Icons.remove_red_eye_sharp,
                            color: Colors.white,
                            size: 18,
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text(
                            '${item.view}',
                            style: const TextStyle(
                                color: Colors.white, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
