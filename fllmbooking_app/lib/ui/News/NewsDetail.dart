import 'dart:convert';

import 'package:fllmbooking_app/data/responsitories/BlogRepositories.dart';
import 'package:fllmbooking_app/data/responsitories/PromotionRepositories.dart';
import 'package:fllmbooking_app/data/responsitories/ReviewRepositories.dart';
import 'package:fllmbooking_app/ui/MovieDetail/MovieDetail.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:html/parser.dart';

class NewsDetailPage extends StatefulWidget {
  final String slug;
  final String type;

  const NewsDetailPage({required this.slug, required this.type});

  @override
  State<NewsDetailPage> createState() => _NewsDetailPageState();
}

class _NewsDetailPageState extends State<NewsDetailPage> {
  Future<dynamic>? item;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    item = fecthItem();
  }

  Future<dynamic> fecthItem() {
    if (widget.type == 'Review') {
      return ReviewRepository().getReviewDetail(widget.slug);
    } else if (widget.type == 'Blog') {
      return BlogRepository().getBlogDetail(widget.slug);
    } else {
      return PromotionRepository().getPromotionDetail(widget.slug);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<dynamic>(
      future: item,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else {
          final model = snapshot.data!;
          final nameText = parse(utf8.decode(model.name!.codeUnits)).body!.text;
          final descriptionText = utf8.decode(model.description!.codeUnits);
          var isShowing = false;
          if(model.movie != null){
            isShowing = model.movie?.status == "Now Showing";
          }
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
                        model.thumbnail!,
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
                      data: descriptionText,
                      style: {
                        'p': Style(color: Colors.white, fontSize: FontSize(16)),
                        'li': Style(color: Colors.white, fontSize: FontSize(15)),
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
                              borderRadius:
                                  BorderRadius.all(Radius.circular(8)))),
                      label: const Text(
                        "Purchase Ticket!",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.w600),
                      ),
                      onPressed: () {
                        if (model.movie != null) {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  MovieDetailPage(slug: model.movie!.slug!),
                            ),
                          );
                        }
                      },
                    ),
                  )
                : null,
          );
        }
      },
    );
  }
}
