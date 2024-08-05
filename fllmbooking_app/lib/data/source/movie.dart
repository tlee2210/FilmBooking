import 'dart:convert';

import 'package:fllmbooking_app/data/models/book_tickets_response.dart';
import 'package:fllmbooking_app/data/models/home_film_response.dart';

import '../models/movie.dart';
import 'package:http/http.dart' as http;

abstract interface class movieDataSource {
  Future<MovieDataModel> getMovieData();
  Future<HomeFilmResponse> getMovieDetail(String slug);
  Future<bookTicketsResponse> getTimeForMovie(
      String slug, String city, String cinema);
}

class MovieData implements movieDataSource {
  @override
  Future<MovieDataModel> getMovieData() async {
    const url = 'http://10.0.2.2:8081/api/home/movie/v1';
    final uri = Uri.parse(url);
    final response = await http.get(uri);
    if (response.statusCode == 200) {
      final bodyContent = utf8.decode(response.bodyBytes);

      var dataWrapper = jsonDecode(bodyContent) as Map<String, dynamic>;
      var data = dataWrapper['result'] as Map<String, dynamic>;
      return MovieDataModel.fromJson(data);
    } else {
      throw Exception('Failed to load home data');
    }
  }

  @override
  Future<HomeFilmResponse> getMovieDetail(String slug) async {
    String url = 'http://10.0.2.2:8081/api/home/movie-genre/v1/detail/$slug';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        final data = jsonData['result'];
        return HomeFilmResponse.fromJson(data);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }

  @override
  Future<bookTicketsResponse> getTimeForMovie(
      String slug, String city, String cinema) async {
    String url =
        'http://10.0.2.2:8081/api/home/booking/v1?slug=$slug${city.isNotEmpty ? '&city=${city}' : ''}${cinema.isNotEmpty ? '&cinema=$cinema' : ''}';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        final data = jsonData['result'];
        final result = bookTicketsResponse.fromJson(data);
        return result;
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }
}
