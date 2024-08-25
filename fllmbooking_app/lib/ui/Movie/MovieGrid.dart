import 'package:flutter/material.dart';
import '../../data/models/item_introduce.dart';
import '../home/home_card.dart';

class MovieGrid extends StatefulWidget {
  final List<ItemIntroduce> movieShowingList;
  final List<ItemIntroduce>? movieSoonList; // Nullable list
  final int tabIndex;

  MovieGrid({
    required this.tabIndex,
    required this.movieSoonList,
    required this.movieShowingList,
  });

  @override
  _MovieGridState createState() => _MovieGridState();
}

class _MovieGridState extends State<MovieGrid> {
  @override
  Widget build(BuildContext context) {
    // Choose the appropriate list based on tabIndex
    final movieList = widget.tabIndex == 0
        ? widget.movieShowingList
        : widget.movieSoonList ?? []; // Fallback to an empty list if null

    return SliverGrid(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16.0,
        mainAxisSpacing: 16.0,
        childAspectRatio: 0.6,
      ),
      delegate: SliverChildBuilderDelegate(
            (context, index) {
          final movie = movieList[index];
          return MovieCard(item: movie);
        },
        childCount: movieList.length,
      ),
    );
  }
}
