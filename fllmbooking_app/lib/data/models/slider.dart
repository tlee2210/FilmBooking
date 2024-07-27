import 'select_option.dart';

class HomeSliderModel {
  List<SelectOption> imagePromotions;
  List<SelectOption> imageMovies;

  HomeSliderModel({required this.imagePromotions, required this.imageMovies});

  // fromJson factory constructor
  factory HomeSliderModel.fromJson(Map<String, dynamic> json) {
    return HomeSliderModel(
      imagePromotions: List<SelectOption>.from(
          json['imagePromotions'].map((i) => SelectOption.fromJson(i))),
      imageMovies: List<SelectOption>.from(
          json['imageMovies'].map((i) => SelectOption.fromJson(i))),
    );
  }

  // toJson method
  Map<String, dynamic> toJson() {
    return {
      'imagePromotions': imagePromotions.map((i) => i.toJson()).toList(),
      'imageMovies': imageMovies.map((i) => i.toJson()).toList(),
    };
  }
}
