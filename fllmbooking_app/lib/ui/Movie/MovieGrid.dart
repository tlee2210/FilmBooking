import 'package:flutter/material.dart';
import '../../data/models/item_introduce.dart';
import '../home/home_card.dart';

class MovieGrid extends StatefulWidget {
  List<ItemIntroduce> movieShowingList;
  List<ItemIntroduce> movieSoonList;
  final int tabIndex;

  MovieGrid(
      {required this.tabIndex,
      required this.movieSoonList,
      required this.movieShowingList});

  @override
  _MovieGridState createState() => _MovieGridState();
}

class _MovieGridState extends State<MovieGrid> {
  @override
  Widget build(BuildContext context) {
    return SliverGrid(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16.0,
        mainAxisSpacing: 16.0,
        childAspectRatio: 0.6,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final movie = widget.tabIndex == 0
              ? widget.movieShowingList[index]
              : widget.movieSoonList[index];
          return MovieCard(item: movie);
        },
        childCount: widget.tabIndex == 0
            ? widget.movieShowingList.length
            : widget.movieSoonList.length,
      ),
    );
  }
}
