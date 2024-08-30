import 'package:fllmbooking_app/data/models/review.dart';
import 'package:fllmbooking_app/ui/News/NewsDetail.dart';
import 'package:flutter/material.dart';
import 'package:html/parser.dart';
import 'dart:convert' show utf8;

class Reviewitem extends StatelessWidget {
  final Review review;
  const Reviewitem({required this.review});

  @override
  Widget build(BuildContext context) {
    final reviewText = parse(utf8.decode(review.name!.codeUnits)).body!.text;
    return Column(
      children: [
        GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return NewsDetailPage(
                      slug: utf8.decode(review.slug!.codeUnits), type: 'Review',);
                },
              ),
            );
          },
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(8.0),
                child: Image.network(
                  review.thumbnail!,
                  fit: BoxFit.cover,
                  width: 120,
                ),
              ),
              Container(
                padding: EdgeInsets.only(left: 10),
                width: MediaQuery.of(context).size.width - 140,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      reviewText!,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 13,
                          fontWeight: FontWeight.bold),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(
                      height: 4,
                    ),
                    Container(
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
                            '${review.view!}',
                            style: const TextStyle(
                                color: Colors.white, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(
          height: 14,
        )
      ],
    );
  }
}
