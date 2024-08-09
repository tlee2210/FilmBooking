class ChangePasswordRequest {
  String password;
  String repeatPassword;
  String newPassword;

  ChangePasswordRequest({
    required this.password,
    required this.repeatPassword,
    required this.newPassword,
  });

  factory ChangePasswordRequest.fromJson(Map<String, dynamic> json) {
    return ChangePasswordRequest(
      password: json['password'],
      repeatPassword: json['repeatPassword'],
      newPassword: json['newPassword'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'password': password,
      'repeatPassword': repeatPassword,
      'newPassword': newPassword,
    };
  }

  @override
  String toString() {
    return 'ChangePasswordRequest{password: $password, repeatPassword: $repeatPassword, newPassword: $newPassword}';
  }
}
