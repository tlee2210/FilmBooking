import 'package:fllmbooking_app/data/models/NewsItemModel.dart';
import 'package:fllmbooking_app/data/models/movie_model.dart';

class MovieBlog implements NewsItemModel {
  int? id;
  String? name;
  String? slug;
  String? description;
  String? thumbnail;
  int? view;
  Movie? movie;

  MovieBlog({
    this.id,
    this.name,
    this.slug,
    this.description,
    this.thumbnail,
    this.view,
    this.movie,
  });

  factory MovieBlog.fromJson(Map<String, dynamic> json) {
    return MovieBlog(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      description: json['description'],
      thumbnail: json['thumbnail'],
      view: json['view'],
      movie: json['movie'] != null ? Movie.fromJson(json['movie']) : null,
    );
  }

  static List<MovieBlog> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => MovieBlog.fromJson(json)).toList();
  }
}
