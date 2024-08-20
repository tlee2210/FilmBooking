import 'dart:convert';

import 'package:fllmbooking_app/data/models/CinemaListResponse.dart';
import 'package:fllmbooking_app/data/models/home_cinema_response.dart';
import 'package:http/http.dart' as http;

abstract interface class CinemaDataSource {
  Future<CinemaListResponse?> getAllCinema(String slugCity);

  Future<HomeCinemaResponse?> getCinemaDetail(String slug);
}

class CinemaData implements CinemaDataSource {
  @override
  Future<CinemaListResponse> getAllCinema(String slugCity) async {
    String url =
        'http://10.0.2.2:8081/api/home/cinema/v1${slugCity.isEmpty ? '' : '?city=$slugCity'}';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        return CinemaListResponse.fromJson(jsonData['result']);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }

  @override
  Future<HomeCinemaResponse> getCinemaDetail(String slug) async {
    String url = 'http://10.0.2.2:8081/api/home/cinema/v1/$slug';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        var result = HomeCinemaResponse.fromJson(jsonData['result']);
        return result;
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }
}
