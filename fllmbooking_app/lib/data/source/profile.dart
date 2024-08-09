import 'dart:convert';

import '../models/UserProfile.dart';
import 'package:http/http.dart' as http;

import '../responsitories/TokenRepositories.dart';

abstract class profileDataSource {
  Future<UserProfile?> getProfile();
}

class ProfileData implements profileDataSource {
  @override
  Future<UserProfile?> getProfile() async {
    TokenRepositories tokenRepository = TokenRepositories();
    var token = await tokenRepository.getToken();
    if (token != null) {
      const url = 'http://10.0.2.2:8081/api/home/user/v1/profile';
      final uri = Uri.parse(url);
      final response = await http
          .get(uri, headers: {'Authorization': 'Bearer ' + token.toString()});

      if (response.statusCode == 200) {
        final bodyContent = utf8.decode(response.bodyBytes);
        var dataWrapper = jsonDecode(bodyContent) as Map<String, dynamic>;
        var data = dataWrapper['result'] as Map<String, dynamic>;
        return UserProfile.fromJson(data);
      } else if (response.statusCode == 401) {
        await tokenRepository.deleteToken();
      }
    } else {
      await tokenRepository.deleteToken();
      return null;
    }
  }
}
