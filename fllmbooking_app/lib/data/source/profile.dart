import 'dart:convert';

import '../models/ChangePasswordRequest.dart';
import '../models/UserProfile.dart';
import 'package:http/http.dart' as http;

import '../models/UserProfileResquest.dart';
import '../responsitories/TokenRepositories.dart';

abstract class profileDataSource {
  Future<UserProfile?> getProfile();

  Future<String?> changePassword(ChangePasswordRequest changePasswordRequest);

  Future<String?> updateProfile(UserProfileRequest userProfileRequest);
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

  @override
  Future<String?> changePassword(
      ChangePasswordRequest changePasswordRequest) async {
    TokenRepositories tokenRepository = TokenRepositories();
    var token = await tokenRepository.getToken();
    if (token != null) {
      const url = 'http://10.0.2.2:8081/api/home/user/v1/change-password';
      final uri = Uri.parse(url);
      final response = await http.post(
        uri,
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': 'Bearer ' + token.toString()
        },
        body: jsonEncode(changePasswordRequest.toJson()),
      );

      if (response.statusCode == 200) {
        final bodyContent = utf8.decode(response.bodyBytes);
        var message = jsonDecode(bodyContent) as Map<String, dynamic>;

        return message['message'];
      } else {
        final errorBody = utf8.decode(response.bodyBytes);
        final errorData = jsonDecode(errorBody) as Map<String, dynamic>;

        throw Exception(errorData['message']);
      }
    }
  }

  @override
  Future<String?> updateProfile(UserProfileRequest userProfileRequest) async {
    TokenRepositories tokenRepository = TokenRepositories();
    var token = await tokenRepository.getToken();
    print("=============================================");
    print('userProfileRequest: ' + userProfileRequest.toString());
    print("=============================================");
    if (token != null) {
      const url = 'http://10.0.2.2:8081/api/home/user/v1/update';
      final uri = Uri.parse(url);
      final response = await http.put(
        uri,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'accept': '*/*',
          'Authorization': 'Bearer ' + token.toString()
        },
        body: jsonEncode(userProfileRequest.toJson()),
      );

      if (response.statusCode == 200) {
        final bodyContent = utf8.decode(response.bodyBytes);
        var message = jsonDecode(bodyContent) as Map<String, dynamic>;
        return message['message'];
      } else {
        final errorBody = utf8.decode(response.bodyBytes);
        final errorData = jsonDecode(errorBody) as Map<String, dynamic>;

        throw Exception(errorData['message']);
      }
    }
  }
}
