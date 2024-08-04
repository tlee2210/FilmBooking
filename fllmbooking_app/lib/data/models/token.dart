import 'package:fllmbooking_app/data/models/user.dart';

class LoginToken {
  String token;
  User user;

  LoginToken({required this.token, required this.user});

  factory LoginToken.fromJson(Map<String, dynamic> json) {
    return LoginToken(
      token: json["token"],
      user: User.fromJson(json["user"]),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "token": this.token,
      "user": this.user,
    };
  }

  @override
  String toString() {
    return 'Token{token: $token, user: $user}';
  }
}
