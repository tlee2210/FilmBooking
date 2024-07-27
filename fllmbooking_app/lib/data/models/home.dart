
import 'package:fllmbooking_app/data/models/slider.dart';

import 'item_introduce.dart';

class HomeDataModel {
  List<ItemIntroduce> movieShowingList;
  List<ItemIntroduce> movieSoonList;
  List<ItemIntroduce> movieBlogList;
  List<ItemIntroduce> reviewList;
  HomeSliderModel slider;

  HomeDataModel(
      {required this.movieShowingList,
      required this.movieSoonList,
      required this.movieBlogList,
      required this.reviewList,
      required this.slider});

  factory HomeDataModel.fromJson(Map<String, dynamic> json) {
    return HomeDataModel(
      movieShowingList: List<ItemIntroduce>.from(
          json['movieShowingList'].map((i) => ItemIntroduce.fromJson(i))),
      movieSoonList: List<ItemIntroduce>.from(
          json['movieSoonList'].map((i) => ItemIntroduce.fromJson(i))),
      movieBlogList: List<ItemIntroduce>.from(
          json['movieBlogList'].map((i) => ItemIntroduce.fromJson(i))),
      reviewList: List<ItemIntroduce>.from(
          json['reviewList'].map((i) => ItemIntroduce.fromJson(i))),
      slider: HomeSliderModel.fromJson(json["slider"]),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'movieShowingList': movieShowingList.map((i) => i.toJson()).toList(),
      'movieSoonList': movieSoonList.map((i) => i.toJson()).toList(),
      'movieBlogList': movieBlogList.map((i) => i.toJson()).toList(),
      'reviewList': reviewList.map((i) => i.toJson()).toList(),
      'slider': slider.toJson(),
    };
  }

  @override
  String toString() {
    return 'HomeDataModel{\n'
        '  movieShowingList: ${movieShowingList.map((item) => item.toString()).toList()},\n'
        '  movieSoonList: ${movieSoonList.map((item) => item.toString()).toList()},\n'
        '  movieBlogList: ${movieBlogList.map((item) => item.toString()).toList()},\n'
        '  reviewList: ${reviewList.map((item) => item.toString()).toList()},\n'
        '  slider: ${slider.toString()},\n'
        '}';
  }
}
