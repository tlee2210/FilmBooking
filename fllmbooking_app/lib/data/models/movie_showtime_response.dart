import 'package:fllmbooking_app/data/models/home_movie_format_response.dart';

class MovieAndShowtimeResponse {
  String? name;
  String? imagePortrait;
  String? rules;
  int? durationMovie;
  DateTime? releaseDate;
  List<HomeMovieFormatResponse>? movieFormats;

  MovieAndShowtimeResponse({
    required this.name,
    required this.imagePortrait,
    required this.rules,
    required this.durationMovie,
    required this.releaseDate,
    required this.movieFormats,
  });

  factory MovieAndShowtimeResponse.fromJson(Map<String, dynamic> json) {
    return MovieAndShowtimeResponse(
      name: json['name'],
      imagePortrait: json['imagePortrait'],
      rules: json['rules'],
      durationMovie: json['duration_movie'],
      releaseDate: json['releaseDate'] != null
          ? DateTime.parse(json['releaseDate'])
          : null,
      movieFormats: json['movieFormats'] != null
          ? (json['movieFormats'] as List)
              .map((movie) => HomeMovieFormatResponse.fromJson(movie))
              .toList()
          : null,
    );
  }
}
