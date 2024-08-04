import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/login.dart';
import '../models/token.dart';

abstract class LoginDataSource {
  Future<LoginToken?> signin(Login login);
}

class LoginData implements LoginDataSource {
  @override
  Future<LoginToken?> signin(Login login) async {
    const url = 'http://10.0.2.2:8081/api/auth/v1/signin';
    final uri = Uri.parse(url);
    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(login.toJson()),
    );
    if (response.statusCode == 200) {
      final bodyContent = utf8.decode(response.bodyBytes);

      var dataWrapper = jsonDecode(bodyContent) as Map<String, dynamic>;
      var data = dataWrapper['result'] as Map<String, dynamic>;
      return LoginToken.fromJson(data);
    }else {
      final errorBody = utf8.decode(response.bodyBytes);
      final errorData = jsonDecode(errorBody) as Map<String, dynamic>;
      // print('Failed to sign in: ${errorData['message']}');
      throw Exception(errorData['message']);
      return null;
    }
  }
}
