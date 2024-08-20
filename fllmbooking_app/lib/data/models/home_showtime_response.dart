import 'package:fllmbooking_app/data/models/movie_showtime_response.dart';

class HomeShowtimeResponse {
  DateTime? date;
  List<MovieAndShowtimeResponse>? movieList;

  HomeShowtimeResponse({required this.date, required this.movieList});

  factory HomeShowtimeResponse.fromJson(Map<String, dynamic> json) {
    return HomeShowtimeResponse(
      date: json['date'] != null ? DateTime.parse(json['date']) : null,
      movieList: json['movieList'] != null
          ? (json['movieList'] as List)
              .map((movie) => MovieAndShowtimeResponse.fromJson(movie))
              .toList()
          : null,
    );
  }
}
