import 'dart:convert';

import 'package:fllmbooking_app/data/models/review.dart';
import 'package:http/http.dart' as http;

abstract class ReviewDataSource {
  Future<List<Review>?> getAllReview();
  Future<Review?> getReviewDetail(String slug);
}

class ReviewData implements ReviewDataSource {
  @override
  Future<List<Review>?> getAllReview() async {
    String url = 'http://10.0.2.2:8081/api/home/review/v2';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        return Review.fromJsonList(jsonData['result'] as List);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }

  @override
  Future<Review?> getReviewDetail(String slug) async {
    String url = 'http://10.0.2.2:8081/api/home/review/v2/$slug/detail';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        var result = Review.fromJson(jsonData['result']);
        return result;
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }
}
