import '../models/movie.dart';
import '../source/movie.dart';

abstract interface class Responsetories {
  Future<MovieDataModel?> getMovieData();
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
}
