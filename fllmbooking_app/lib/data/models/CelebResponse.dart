import 'package:fllmbooking_app/data/models/movie_model.dart';

class CelebResponse {
  int? id;
  String? name;
  String? description;
  DateTime? dateOfBirth;
  String? biography;
  String? role;
  String? image;
  int? countryId;
  String? slug;
  List<Movie>? movieList;

  CelebResponse({
    required this.id,
    required this.name,
    required this.description,
    required this.dateOfBirth,
    required this.biography,
    required this.role,
    required this.image,
    required this.countryId,
    required this.slug,
    required this.movieList,
  });

  factory CelebResponse.fromJson(Map<String, dynamic> json) {
    return CelebResponse(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      dateOfBirth: json['dateOfBirth'] != null
          ? DateTime.parse(json['dateOfBirth'])
          : null,
      biography: json['biography'],
      role: json['role'],
      image: json['image'],
      countryId: json['countryId'],
      slug: json['slug'],
      movieList: json['movieList'] != null
          ? (json['movieList'] as List)
              .map((movie) => Movie.fromJson(movie))
              .toList()
          : null,
    );
  }
}
