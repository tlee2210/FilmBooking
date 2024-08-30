class verifyMailrequest {
  String email;

  verifyMailrequest({required this.email});

  factory verifyMailrequest.fromJson(Map<String, dynamic> json) {
    return verifyMailrequest(
      email: json["email"],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "email": this.email,
    };
  }

  @override
  String toString() {
    return 'verifyMailrequest{email: $email}';
  }
}
