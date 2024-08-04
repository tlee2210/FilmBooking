class User {
  String name;
  String email;
  String role;
  String avatar;

  User(
      {required this.name,
      required this.email,
      required this.role,
      required this.avatar});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json["name"],
      email: json["email"],
      role: json["role"],
      avatar: json["avatar"],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "name": this.name,
      "email": this.email,
      "role": this.role,
      "avatar": this.avatar,
    };
  }

  @override
  String toString() {
    return 'User{name: $name, email: $email, role: $role, avatar: $avatar}';
  }
}
