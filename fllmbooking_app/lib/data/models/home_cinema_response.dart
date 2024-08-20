import 'package:fllmbooking_app/data/models/home_showtime_response.dart';

class HomeCinemaResponse {
  int? id;
  String? name;
  String? slug;
  String? address;
  String? lat;
  String? lng;
  List<HomeShowtimeResponse>? days;

  HomeCinemaResponse({
    required this.id,
    required this.name,
    required this.slug,
    required this.address,
    required this.lat,
    required this.lng,
    required this.days,
  });

  factory HomeCinemaResponse.fromJson(Map<String, dynamic> json) {
    return HomeCinemaResponse(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      address: json['address'],
      lat: json['lat'],
      lng: json['lng'],
      days: json['days'] != null
          ? (json['days'] as List)
              .map((day) => HomeShowtimeResponse.fromJson(day))
              .toList()
          : null,
    );
  }
}
