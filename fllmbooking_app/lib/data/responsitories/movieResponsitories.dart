import 'package:fllmbooking_app/data/models/book_tickets_response.dart';
import 'package:fllmbooking_app/data/models/home_film_response.dart';

import '../models/movie.dart';
import '../source/movie.dart';

abstract interface class Responsetories {
  Future<MovieDataModel?> getMovieData();
  Future<HomeFilmResponse?> getMovieDetail(String slug);
  Future<bookTicketsResponse?> getTimeForMovie(
      String slug, String city, String cinema);
}

class MovieResponsetories implements Responsetories {
  final MovieData _movieDataSource = MovieData();

  @override
  Future<MovieDataModel?> getMovieData() async {
    try {
      final value = await _movieDataSource.getMovieData();
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get movie data: $e');
    }
  }

  @override
  Future<HomeFilmResponse?> getMovieDetail(String slug) async {
    try {
      final value = await _movieDataSource.getMovieDetail(slug);
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get movie data: $e');
    }
  }

  @override
  Future<bookTicketsResponse?> getTimeForMovie(
      String slug, String city, String cinema) async {
    try {
      final value = await _movieDataSource.getTimeForMovie(slug, city, cinema);
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get movie data: $e');
    }
  }
}
