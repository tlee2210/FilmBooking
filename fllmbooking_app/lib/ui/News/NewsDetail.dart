import 'dart:convert';

import 'package:fllmbooking_app/data/models/NewsItemModel.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:html/parser.dart';

class NewsDetailPage<T extends NewsItemModel> extends StatelessWidget {
  final T item;
  const NewsDetailPage({required this.item});

  @override
  Widget build(BuildContext context) {
    final isShowing =
        item.movie == null ? false : item.movie!.status == "Now Showing";
    final nameText = parse(utf8.decode(item.name!.codeUnits)).body!.text;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff1f1d2b),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Container(
        color: const Color(0xff1f1d2b),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Center(
                child: Image.network(
                  item.thumbnail!,
                  fit: BoxFit.cover,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  child: Text(
                    nameText,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              Html(
                data: utf8.decode(item.description!.codeUnits),
                style: {
                  'p': Style(color: Colors.white, fontSize: FontSize(16)),
                  'img': Style(width: Width(310), height: Height(182)),
                },
              )
            ],
          ),
        ),
      ),
      bottomNavigationBar: (isShowing)
          ? Container(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
              color: const Color(0xff1f1d2b),
              child: TextButton.icon(
                icon: Icon(CupertinoIcons.tickets),
                style: TextButton.styleFrom(
                    iconColor: Colors.white,
                    backgroundColor: Colors.orange,
                    shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)))),
                label: const Text(
                  "Purchase Ticket!",
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.w600),
                ),
                onPressed: () {},
              ),
            )
          : null,
    );
  }
}
