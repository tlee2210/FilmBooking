import 'dart:convert';

import 'Booking.dart';

class UserProfile {
  int id;
  String name;
  String email;
  String phone;
  String gender;
  String role;
  String? avatar;
  List<Booking> bookingList;
  String dob;

  UserProfile({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.gender,
    required this.role,
    required this.avatar,
    required this.bookingList,
    required this.dob,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
      gender: json['gender'],
      role: json['role'],
      avatar: json['avatar'],
      bookingList: List<Booking>.from(
          json['bookingList'].map((x) => Booking.fromJson(x))),
      dob: json['dob'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'gender': gender,
      'role': role,
      'avatar': avatar,
      'bookingList': List<dynamic>.from(bookingList.map((x) => x.toJson())),
      'dob': dob,
    };
  }

  @override
  String toString() {
    return 'UserProfile{id: $id, name: $name, email: $email, phone: $phone, gender: $gender, role: $role, avatar: $avatar, bookingList: $bookingList, dob: $dob}';
  }
}
