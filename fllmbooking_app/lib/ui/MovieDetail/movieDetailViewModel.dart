import 'dart:async';

import 'package:fllmbooking_app/data/models/home_film_response.dart';
import 'package:fllmbooking_app/data/responsitories/movieResponsitories.dart';

class MovieDetailViewModel {
  final StreamController<HomeFilmResponse> _movieStreamController =
      StreamController<HomeFilmResponse>();

  Stream<HomeFilmResponse> get movieStream => _movieStreamController.stream;

  void loadMovieData(String slug) {
    final response = MovieResponsetories();
    response.getMovieDetail(slug)?.then((value) async {
      if (value != null) {
        _movieStreamController.add(value);
      }
    });
  }

  void dispose() {
    _movieStreamController.close();
  }
}
