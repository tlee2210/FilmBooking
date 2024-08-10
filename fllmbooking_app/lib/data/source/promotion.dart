import 'dart:convert';

import 'package:fllmbooking_app/data/models/Promotion.dart';
import 'package:http/http.dart' as http;

abstract class PromotionDataSource {
  Future<List<Promotion>?> getAllPromotion();
  Future<Promotion?> getPromotionDetail(String slug);
}

class PromotionData implements PromotionDataSource {
  @override
  Future<List<Promotion>?> getAllPromotion() async {
    String url = 'http://10.0.2.2:8081/api/home/promotion/v2';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        return Promotion.fromJsonList(jsonData['result'] as List);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }

  @override
  Future<Promotion?> getPromotionDetail(String slug) async {
    String url = 'http://localhost:8081/api/home/promotion/v1/detail/$slug';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result']['promotion'] != null) {
        var result = Promotion.fromJson(jsonData['result']['promotion']);
        return result;
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }
}
