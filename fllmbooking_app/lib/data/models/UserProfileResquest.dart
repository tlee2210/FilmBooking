class UserProfileRequest {
  String name;
  String email;
  String phone;
  String gender;
  String dob;

  UserProfileRequest({
    required this.name,
    required this.email,
    required this.phone,
    required this.gender,
    required this.dob,
  });

  factory UserProfileRequest.fromJson(Map<String, dynamic> json) {
    return UserProfileRequest(
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
      gender: json['gender'],
      dob: json['dob'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'phone': phone,
      'gender': gender,
      'dob': dob,
    };
  }

  @override
  String toString() {
    return 'UserProfileRequest{name: $name, email: $email, phone: $phone, gender: $gender, dob: $dob}';
  }
}
