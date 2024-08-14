import 'dart:convert';

import 'package:fllmbooking_app/data/models/CelebResponse.dart';
import 'package:fllmbooking_app/data/responsitories/CelebrityRepositories.dart';
import 'package:flutter/material.dart';
import 'package:html/parser.dart';

class CelebDetailPage extends StatefulWidget {
  final String slug;
  const CelebDetailPage({required this.slug, super.key});

  @override
  State<CelebDetailPage> createState() => _CelebDetailPageState();
}

class _CelebDetailPageState extends State<CelebDetailPage> {
  late Future<CelebResponse?> celeb;
  bool showFullContent = false;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    celeb = CelebrityRepository().getCelebDetail(widget.slug);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<CelebResponse?>(
      future: celeb,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data == null) {
          return const Center(child: Text('No data available'));
        } else {
          var item = snapshot.data!;
          return Scaffold(
            appBar: AppBar(
              backgroundColor: const Color(0xff1f1d2b),
              leading: IconButton(
                icon: const Icon(Icons.arrow_back, color: Colors.white),
                onPressed: () => Navigator.of(context).pop(),
              ),
              title: Text(
                parse(utf8.decode(item.name!.codeUnits)).body!.text,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            body: Container(
              color: const Color(0xff1f1d2b),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Image.network(
                        item.image!,
                        fit: BoxFit.cover,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 8.0, left: 8.0),
                      child: Container(
                        child: const Text(
                          "Biography",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    Container(
                      // width: MediaQuery.of(context).size.width,
                      padding: EdgeInsets.only(top: 8.0, left: 8.0, right: 8.0),
                      child: Text(
                        parse(utf8.decode(item.biography!.codeUnits))
                            .body!
                            .text,
                        style:
                            const TextStyle(color: Colors.white, fontSize: 16),
                        maxLines: showFullContent ? null : 7,
                        overflow: showFullContent
                            ? TextOverflow.visible
                            : TextOverflow.ellipsis,
                      ),
                    ),
                    if (item.biography!.length > 255)
                      TextButton(
                        onPressed: () {
                          setState(() {
                            showFullContent = !showFullContent;
                          });
                        },
                        child: Text(
                          showFullContent ? 'Collapse' : 'Read more',
                          style: const TextStyle(color: Colors.orange),
                        ),
                      ),
                    Padding(
                      padding: const EdgeInsets.only(top: 8.0, left: 8.0),
                      child: Container(
                        child: const Text(
                          "Film has joined",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    if (item.movieList!.isNotEmpty)
                      for (int i = 0; i < item.movieList!.length; i++)
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              vertical: 8.0, horizontal: 8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(8.0),
                                child: Image.network(
                                  item.movieList![i].imageLandscape!,
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
                                      item.movieList![i].name!,
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        )
                  ],
                ),
              ),
            ),
          );
        }
      },
    );
  }
}
