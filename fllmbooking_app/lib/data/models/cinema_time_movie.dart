import 'package:fllmbooking_app/data/models/home_movie_format_response.dart';

class CinemaTimeMovie {
  String? name;
  List<HomeMovieFormatResponse>? movieFormat;

  CinemaTimeMovie({required this.name, required this.movieFormat});

  factory CinemaTimeMovie.fromJson(Map<String, dynamic> json) {
    return CinemaTimeMovie(
      name: json['name'],
      movieFormat: json['movieFormat'] != null
          ? (json['movieFormat'] as List)
              .map((format) => HomeMovieFormatResponse.fromJson(format))
              .toList()
          : null,
    );
  }
}
