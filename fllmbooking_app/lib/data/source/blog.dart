import 'dart:convert';

import 'package:fllmbooking_app/data/models/MovieBlog.dart';
import 'package:http/http.dart' as http;

abstract class BlogDataSource {
  Future<List<MovieBlog>?> getAllBlog();
  Future<MovieBlog?> getBlogDetail(String slug);
}

class BlogData implements BlogDataSource {
  @override
  Future<List<MovieBlog>?> getAllBlog() async {
    String url = 'http://10.0.2.2:8081/api/home/blog/v2';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        return MovieBlog.fromJsonList(jsonData['result'] as List);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }

  @override
  Future<MovieBlog?> getBlogDetail(String slug) async {
    String url = 'http://10.0.2.2:8081/api/home/blog/v1/detail/$slug';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result']['movieBlog'] != null) {
        return MovieBlog.fromJson(jsonData['result']['movieBlog']);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }
}
