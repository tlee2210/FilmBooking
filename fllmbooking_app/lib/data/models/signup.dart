class SignUp {
  final String email;
  final String name;
  final String phone;
  final String gender;
  final String password;
  final DateTime dob;

  SignUp({
    required this.email,
    required this.name,
    required this.phone,
    required this.gender,
    required this.password,
    required this.dob,
  });

  factory SignUp.fromJson(Map<String, dynamic> json) {
    return SignUp(
      email: json['email'],
      name: json['name'],
      phone: json['phone'],
      gender: json['gender'],
      password: json['password'],
      dob: DateTime.parse(json['dob']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'name': name,
      'phone': phone,
      'gender': gender,
      'password': password,
      'dob': dob.toIso8601String(),
    };
  }

  @override
  String toString() {
    return 'SignUp(email: $email, name: $name, phone: $phone, gender: $gender, password: $password, dob: $dob)';
  }
}
