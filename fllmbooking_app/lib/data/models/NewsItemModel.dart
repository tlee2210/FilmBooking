import 'package:fllmbooking_app/data/models/movie_model.dart';

abstract class NewsItemModel {
  int? get id;
  String? get name;
  String? get slug;
  String? get description;
  String? get thumbnail;
  int? get view;
  Movie? get movie;
}
