import 'dart:convert';

import '../models/movie.dart';
import 'package:http/http.dart' as http;

abstract interface class movieDataSource{
  Future<MovieDataModel> getMovieData();
}

class MovieData implements movieDataSource{
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

}