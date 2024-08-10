import 'package:fllmbooking_app/data/models/celebrity.dart';
import 'package:fllmbooking_app/data/models/movie_genre.dart';

class Movie {
  int? id;
  String? name;
  String? description;
  int? duration_movie;
  DateTime? endDate;
  DateTime? releaseDate;
  double? price;
  String? language;
  String? imagePortrait;
  String? imageLandscape;
  String? producer;
  String? status;
  String? slug;
  String? rules;
  String? trailer;
  int? countryId;
  List<MovieGenre>? categories;
  List<Celebrity>? moviesActor;
  List<Celebrity>? moviesDirector;

  Movie({
    this.id,
    this.name,
    this.description,
    this.duration_movie,
    this.endDate,
    this.releaseDate,
    this.price,
    this.language,
    this.imagePortrait,
    this.imageLandscape,
    this.producer,
    this.status,
    this.slug,
    this.rules,
    this.trailer,
    this.countryId,
    this.categories,
    this.moviesActor,
    this.moviesDirector,
  });

  factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      duration_movie: json['duration_movie'],
      endDate: json['endDate'] != null ? DateTime.parse(json['endDate']) : null,
      releaseDate: json['releaseDate'] != null
          ? DateTime.parse(json['releaseDate'])
          : null,
      price: json['price'] != null ? json['price'].toDouble() : null,
      language: json['language'],
      imagePortrait: json['imagePortrait'],
      imageLandscape: json['imageLandscape'],
      producer: json['producer'],
      status: json['status'],
      slug: json['slug'],
      rules: json['rules'],
      trailer: json['trailer'],
      countryId: json['countryId'],
      categories: json['categories'] != null
          ? (json['categories'] as List)
              .map((category) => MovieGenre.fromJson(category))
              .toList()
          : null,
      moviesActor: json['moviesActor'] != null
          ? (json['moviesActor'] as List)
              .map((celeb) => Celebrity.fromJson(celeb))
              .toList()
          : null,
      moviesDirector: json['moviesDirector'] != null
          ? (json['moviesDirector'] as List)
              .map((celeb) => Celebrity.fromJson(celeb))
              .toList()
          : null,
    );
  }

  static List<Movie> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => Movie.fromJson(json)).toList();
  }
}
