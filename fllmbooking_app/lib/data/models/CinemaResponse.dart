import 'package:fllmbooking_app/data/models/CinemaImages.dart';

class CinemaResponse {
  int? id;
  String? name;
  String? slug;
  String? address;
  String? lat;
  String? lng;
  String? phone;
  CinemaImages? images;

  CinemaResponse({
    required this.id,
    required this.name,
    required this.slug,
    required this.address,
    required this.lat,
    required this.lng,
    required this.phone,
    required this.images,
  });

  factory CinemaResponse.fromJson(Map<String, dynamic> json) {
    return CinemaResponse(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      address: json['address'],
      lat: json['lat'],
      lng: json['lng'],
      phone: json['phone'],
      images: CinemaImages.fromJson(json['images']),
    );
  }
}
