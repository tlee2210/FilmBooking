import 'dart:async';

import '../../data/models/movie.dart';
import '../../data/responsitories/movieResponsitories.dart';

class MovieViewModel {
  final StreamController<MovieDataModel> _movieStreamController =
      StreamController<MovieDataModel>();

  Stream<MovieDataModel> get movieStream => _movieStreamController.stream;

  void loadMovieData() {
    final response = MovieResponsetories();
    print('==================');
    print('response: ' + response.toString());
    print('==================');
    response.getMovieData()?.then((value) async {
      if (value != null) {
        _movieStreamController.add(value);
      }
    });
  }

  void dispose() {
    _movieStreamController.close();
  }
}
