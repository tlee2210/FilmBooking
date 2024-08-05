import 'package:fllmbooking_app/data/models/celebrity.dart';
import 'package:fllmbooking_app/data/models/country.dart';
import 'package:fllmbooking_app/data/models/image_description.dart';
import 'package:fllmbooking_app/data/models/movie_genre.dart';
import 'package:fllmbooking_app/data/models/review.dart';

class HomeFilmResponse {
  int? id;
  String? name;
  String? slug;
  String? description;
  int? duration_movie;
  DateTime? releaseDate;
  double? price;
  String? language;
  String? imagePortrait;
  String? imageLandscape;
  String? producer;
  String? status;
  String? rules;
  String? trailer;
  Country? country;
  List<MovieGenre>? categories;
  List<Celebrity>? actor;
  List<Celebrity>? director;
  List<imageDescription>? images;
  List<Review>? movieReview;
  List<Review>? subplot;

  HomeFilmResponse({
    this.id,
    this.name,
    this.description,
    this.duration_movie,
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
    this.country,
    this.categories,
    this.actor,
    this.director,
    this.images,
    this.movieReview,
    this.subplot,
  });

  factory HomeFilmResponse.fromJson(Map<String, dynamic> json) {
    return HomeFilmResponse(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      duration_movie: json['duration_movie'],
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
      country:
          json['country'] != null ? Country.fromJson(json['country']) : null,
      categories: json['categories'] != null
          ? (json['categories'] as List)
              .map((category) => MovieGenre.fromJson(category))
              .toList()
          : null,
      actor: json['actor'] != null
          ? (json['actor'] as List)
              .map((celeb) => Celebrity.fromJson(celeb))
              .toList()
          : null,
      director: json['director'] != null
          ? (json['director'] as List)
              .map((celeb) => Celebrity.fromJson(celeb))
              .toList()
          : null,
      images: json['images'] != null
          ? (json['images'] as List)
              .map((img) => imageDescription.fromJson(img))
              .toList()
          : null,
      movieReview: json['movieReview'] != null
          ? (json['movieReview'] as List)
              .map((review) => Review.fromJson(review))
              .toList()
          : null,
      subplot: json['subplot'] != null
          ? (json['subplot'] as List)
              .map((review) => Review.fromJson(review))
              .toList()
          : null,
    );
  }
}
