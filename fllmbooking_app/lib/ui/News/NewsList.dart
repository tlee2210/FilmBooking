import 'dart:convert';

import 'package:fllmbooking_app/data/models/NewsItemModel.dart';
import 'package:fllmbooking_app/data/responsitories/BlogRepositories.dart';
import 'package:fllmbooking_app/data/responsitories/PromotionRepositories.dart';
import 'package:fllmbooking_app/data/responsitories/ReviewRepositories.dart';
import 'package:fllmbooking_app/ui/News/NewsItem.dart';
import 'package:fllmbooking_app/ui/News/NewsDetail.dart';
import 'package:flutter/material.dart';

class Newslist extends StatefulWidget {
  const Newslist({super.key});

  @override
  State<Newslist> createState() => _NewslistState();
}

class _NewslistState extends State<Newslist> {
  late Future<List<NewsItemModel>> _items;
  late var type;
  final List<String> tabs = ['Review', 'Blog', 'Promotion'];
  int tabIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadItems();
  }

  void _loadItems() {
    switch (tabIndex) {
      case 0:
        _items = ReviewRepository()
            .getAllReview()
            .then((data) => data as List<NewsItemModel>);
        type = 'Review';
        break;
      case 1:
        _items = BlogRepository()
            .getAllMovieBlog()
            .then((data) => data as List<NewsItemModel>);
        type = 'Blog';
        break;
      case 2:
        _items = PromotionRepository()
            .getAllPromotion()
            .then((data) => data as List<NewsItemModel>);
        type = 'Promotion';
        break;
      default:
        _items = Future.value([]);
    }
  }

  void _onTabSelect(int index) {
    setState(() {
      tabIndex = index;
      _loadItems();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff1f1d2b),
      ),
      backgroundColor: const Color(0xff1f1d2b),
      body: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: List.generate(tabs.length, (index) {
              return Expanded(
                child: GestureDetector(
                  onTap: () {
                    _onTabSelect(index);
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                        vertical: 8.0, horizontal: 16.0),
                    decoration: BoxDecoration(
                      color: tabIndex == index
                          ? Colors.cyanAccent.withOpacity(0.1)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(16.0),
                    ),
                    child: Center(
                      child: Text(
                        tabs[index],
                        style: TextStyle(
                          color: tabIndex == index
                              ? Colors.cyanAccent
                              : Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
          Expanded(
            child: FutureBuilder<List<NewsItemModel>>(
              future: _items,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text(
                      'Error: ${snapshot.error}',
                      style: const TextStyle(color: Colors.white),
                    ),
                  );
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  return const Center(
                    child: Text(
                      'No items available',
                      style: TextStyle(color: Colors.white),
                    ),
                  );
                } else {
                  final items = snapshot.data!;
                  return ListView.builder(
                    padding: const EdgeInsets.all(8),
                    itemCount: items.length,
                    itemBuilder: (BuildContext context, int index) {
                      final item = items[index];
                      return GestureDetector(
                        onTap: () async {
                          await Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return NewsDetailPage(
                                    slug: utf8.decode(item.slug!.codeUnits), type: type);
                              },
                            ),
                          );

                          setState(() {
                            _loadItems();
                          });
                        },
                        child: NewsItem(item: item),
                      );
                    },
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
