import '../models/home.dart'; // Ensure this path is correct
import 'package:http/http.dart' as http;
import 'dart:convert'; // For jsonDecode

abstract interface class HomeDataSource {
  Future<Homegenerated>? getHomeData();
}

class HomeData implements HomeDataSource {
  @override
  Future<Homegenerated>? getHomeData() async {
    // const url = 'http://localhost:8081/api/home/home/v1';
    const url = 'http://10.0.2.2:8081/api/home/home/v1';
    final uri = Uri.parse(url);
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final Map<String, dynamic> json = jsonDecode(response.body);
      // print('data: ' + Homegenerated.fromJson(json));
      return Homegenerated.fromJson(json);
    } else {
      throw Exception('Failed to load home data');
    }
  }
}
