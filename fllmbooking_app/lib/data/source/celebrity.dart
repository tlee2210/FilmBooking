import 'dart:convert';

import 'package:fllmbooking_app/data/models/CelebResponse.dart';
import 'package:http/http.dart' as http;

abstract class CelebrityDataSource {
  Future<CelebResponse?> getCelebDetail(String slug);
}

class CelebrityData implements CelebrityDataSource {
  @override
  Future<CelebResponse?> getCelebDetail(String slug) async {
    String url = 'http://10.0.2.2:8081/api/home/celebrity/v1/detail/$slug';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      if (jsonData['result'] != null) {
        final data = jsonData['result'];
        return CelebResponse.fromJson(data);
      } else {
        throw Exception('Unexpected JSON structure');
      }
    } else {
      throw Exception('Failed to load API');
    }
  }
}
