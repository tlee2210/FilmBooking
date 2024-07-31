import 'package:flutter/material.dart';

import '../../data/models/movie.dart';
import '../ProgressBar/getProgressBar.dart';
import 'MovieGrid.dart';
import 'MovieTabs.dart';
import 'movieViewModel.dart';

class Movie extends StatefulWidget {
  const Movie({super.key});

  @override
  State<Movie> createState() => _MovieState();
}

class _MovieState extends State<Movie> {
  late MovieViewModel _movieViewModel;
  MovieDataModel? _dataModel;
  int _movieTabIndex = 0;
  final List<String> _movieTabs = ['Now showing', 'Coming soon'];

  @override
  void initState() {
    super.initState();
    _movieViewModel = MovieViewModel();
    _movieViewModel.loadMovieData();
    observeData();
  }

  @override
  void dispose() {
    _movieViewModel.dispose();
    super.dispose();
  }

  void observeData() {
    _movieViewModel.movieStream.listen((MovieDataModel dataModel) {
      setState(() {
        _dataModel = dataModel;
      });
    });
  }

  void _onTabSelect(int index) {
    setState(() {
      _movieTabIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Movie',
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: const Color(0xff1f1d2b),
      ),
      backgroundColor: const Color(0xff1f1d2b),
      body: getBody(),
    );
  }

  Widget getBody() {
    if (_dataModel == null ||
        _dataModel!.movieShowingList.isEmpty ||
        _dataModel!.movieSoonList.isEmpty) {
      return getProgressBar();
    } else {
      return CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: MovieTabs(
                    tabIndex: _movieTabIndex,
                    onTabSelect: _onTabSelect,
                    tabs: _movieTabs,
                  ),
                )
              ],
            ),
          ),
          MovieGrid(
            tabIndex: _movieTabIndex,
            movieShowingList: _dataModel!.movieShowingList,
            movieSoonList: _dataModel!.movieSoonList,
          ),
        ],
      );
    }
  }
}
