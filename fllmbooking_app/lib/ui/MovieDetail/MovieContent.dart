import 'package:fllmbooking_app/data/models/home_film_response.dart';
import 'package:fllmbooking_app/ui/MovieDetail/CelebrityPreview.dart';
import 'package:fllmbooking_app/ui/MovieDetail/GalleryImage.dart';
import 'package:flutter/material.dart';
import 'package:html/parser.dart';
import 'dart:convert' show utf8;

class MovieContent extends StatefulWidget {
  final Future<HomeFilmResponse?> item;
  const MovieContent({required this.item});

  @override
  State<MovieContent> createState() => _MovieContentState();
}

class _MovieContentState extends State<MovieContent> {
  bool showFullContent = false;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<HomeFilmResponse?>(
      future: widget.item,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data == null) {
          return const Center(child: Text('No data available'));
        } else {
          final movie = snapshot.data!;
          final descriptionText = movie.description != null
              ? parse(utf8.decode(movie.description!.codeUnits)).body!.text
              : '';

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Description",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Container(
                width: MediaQuery.of(context).size.width,
                child: Text(
                  descriptionText,
                  style: const TextStyle(color: Colors.white, fontSize: 13),
                  maxLines: showFullContent ? null : 6,
                  overflow: showFullContent
                      ? TextOverflow.visible
                      : TextOverflow.ellipsis,
                ),
              ),
              if (movie.description!.length > 255)
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
              const SizedBox(height: 10),
              const Text(
                "Actors",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Container(
                height: 120,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: movie.actor?.length ?? 0,
                  itemBuilder: (context, index) {
                    var actor = movie.actor![index];
                    return Celebritypreview(celebrity: actor);
                  },
                ),
              ),
              const SizedBox(height: 10),
              const Text(
                "Directors",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Container(
                height: 120,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: movie.director?.length ?? 0,
                  itemBuilder: (context, index) {
                    var director = movie.director![index];
                    return Celebritypreview(celebrity: director);
                  },
                ),
              ),
              const SizedBox(height: 14),
              if (movie.images?.isNotEmpty ?? false)
                const Text(
                  "Gallery",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              if (movie.images?.isNotEmpty ?? false)
                Container(
                  height: 150,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: movie.images!.length,
                    itemBuilder: (context, index) {
                      return Galleryimage(
                        imageUrl: movie.images![index].url!,
                      );
                    },
                  ),
                ),
            ],
          );
        }
      },
    );
  }
}
