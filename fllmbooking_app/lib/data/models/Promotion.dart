import 'package:fllmbooking_app/data/models/NewsItemModel.dart';
import 'package:fllmbooking_app/data/models/movie_model.dart';

class Promotion implements NewsItemModel {
  int? id;
  String? name;
  String? slug;
  String? description;
  String? thumbnail;
  int? view;
  Movie? movie;

  Promotion({
    this.id,
    this.name,
    this.slug,
    this.description,
    this.thumbnail,
    this.view,
    this.movie,
  });

  factory Promotion.fromJson(Map<String, dynamic> json) {
    return Promotion(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      description: json['description'],
      thumbnail: json['image'],
      view: json['view'],
      movie: json['movie'] != null ? Movie.fromJson(json['movie']) : null,
    );
  }

  static List<Promotion> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => Promotion.fromJson(json)).toList();
  }
}
