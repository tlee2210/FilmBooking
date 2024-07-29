import 'package:flutter/material.dart';
import '../../data/models/home.dart';
import '../home/home_card.dart';

class MovieGrid extends StatefulWidget {
  final HomeDataModel homeDataModel;
  final int tabIndex;

  MovieGrid({required this.homeDataModel, required this.tabIndex});

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
              ? widget.homeDataModel.movieShowingList[index]
              : widget.homeDataModel.movieSoonList[index];
          return MovieCard(item: movie);
        },
        childCount: widget.tabIndex == 0
            ? widget.homeDataModel.movieShowingList.length
            : widget.homeDataModel.movieSoonList.length,
      ),
    );
  }


}
