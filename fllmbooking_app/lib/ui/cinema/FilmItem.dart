import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class FilmItem extends StatelessWidget {
  final String name;
  final String imagePortrait;
  final String rules;
  final int durationMovie;
  final DateTime releaseDate;

  const FilmItem(
      {required this.name,
      required this.imagePortrait,
      required this.rules,
      required this.durationMovie,
      required this.releaseDate});

  @override
  Widget build(BuildContext context) {
    String parseName = utf8.decode(name.codeUnits);
    String parseDate = DateFormat('dd / MM / yyyy').format(releaseDate);
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8.0),
            child: Image.network(
              imagePortrait,
              fit: BoxFit.cover,
              height: 150,
              width: 100,
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
                    if (rules.isNotEmpty)
                      Flexible(
                          flex: 1,
                          child: Container(
                            margin: const EdgeInsets.only(left: 8.0),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(
                                color: Colors.cyanAccent,
                              ),
                            ),
                            child: Text(
                              "T$rules",
                              style: const TextStyle(
                                color: Colors.cyanAccent,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          )),
                  ],
                ),
                const SizedBox(
                  height: 8,
                ),
                Row(
                  children: [
                    const Icon(
                      Icons.access_time_filled_outlined,
                      color: Colors.grey,
                    ),
                    const SizedBox(
                      width: 4,
                    ),
                    Text(
                      "${durationMovie.toString()} min",
                      style: const TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    // const SizedBox(
                    //   width: 8,
                    // ),
                  ],
                ),
                const SizedBox(
                  height: 8,
                ),
                Row(
                  children: [
                    const Icon(
                      Icons.calendar_month_outlined,
                      color: Colors.grey,
                    ),
                    const SizedBox(
                      width: 4,
                    ),
                    Text(
                      parseDate,
                      style: const TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    // const SizedBox(
                    //   width: 8,
                    // ),
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
