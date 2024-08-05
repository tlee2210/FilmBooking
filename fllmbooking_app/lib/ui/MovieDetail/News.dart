import 'package:fllmbooking_app/data/models/home_film_response.dart';
import 'package:fllmbooking_app/ui/MovieDetail/ReviewList.dart';
import 'package:flutter/material.dart';

class MovieNews extends StatefulWidget {
  final Future<HomeFilmResponse?> item;
  const MovieNews({required this.item});

  @override
  State<MovieNews> createState() => _MovieNewsState();
}

class _MovieNewsState extends State<MovieNews> {
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
          if ((movie.movieReview!.isEmpty) && (movie.subplot!.isEmpty)) {
            return const Center(
              child: Text(
                'There is no news for this movie',
                style: TextStyle(color: Colors.white, fontSize: 13),
              ),
            );
          }
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                height: 5,
              ),
              Reviewlist(reviews: movie.movieReview!),
              Reviewlist(reviews: movie.subplot!),
            ],
          );
        }
      },
    );
  }
}
