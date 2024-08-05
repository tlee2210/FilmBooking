import 'package:fllmbooking_app/data/models/cinema_time_movie.dart';

class bookingShowTimeResponse {
  DateTime? day;
  List<CinemaTimeMovie>? cinemaTimeMovies;

  bookingShowTimeResponse({required this.day, required this.cinemaTimeMovies});

  factory bookingShowTimeResponse.fromJson(Map<String, dynamic> json) {
    return bookingShowTimeResponse(
      day: json['day'] != null ? DateTime.parse(json['day']) : null,
      cinemaTimeMovies: json['cinemaTimeMovies'] != null
          ? (json['cinemaTimeMovies'] as List)
              .map((format) => CinemaTimeMovie.fromJson(format))
              .toList()
          : null,
    );
  }
}
