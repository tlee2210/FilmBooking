import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/home.dart';

abstract interface class HomeDataSource {
  Future<HomeDataModel>? getHomeData();
}

class HomeData implements HomeDataSource {
  @override
  Future<HomeDataModel>? getHomeData() async {
    // const url = 'http://localhost:8081/api/home/home/v1';
    const url = 'http://10.0.2.2:8081/api/home/home/v1';
    final uri = Uri.parse(url);
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final bodyContent = utf8.decode(response.bodyBytes);

      var dataWrapper = jsonDecode(bodyContent) as Map<String, dynamic>;
      var data = dataWrapper['result'] as Map<String, dynamic>;
      return HomeDataModel.fromJson(data);
    } else {
      throw Exception('Failed to load home data');
    }
  }
}
