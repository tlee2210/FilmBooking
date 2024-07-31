import 'item_introduce.dart';

class MovieDataModel {
  List<ItemIntroduce> movieShowingList;
  List<ItemIntroduce> movieSoonList;

  MovieDataModel({
    required this.movieShowingList,
    required this.movieSoonList,
  });

  factory MovieDataModel.fromJson(Map<String, dynamic> json) {
    return MovieDataModel(
      movieShowingList: List<ItemIntroduce>.from(
          json['movieShowingList'].map((i) => ItemIntroduce.fromJson(i))),
      movieSoonList: List<ItemIntroduce>.from(
          json['movieSoonList'].map((i) => ItemIntroduce.fromJson(i))),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'movieShowingList': movieShowingList.map((i) => i.toJson()).toList(),
      'movieSoonList': movieSoonList.map((i) => i.toJson()).toList(),
    };
  }

  @override
  String toString() {
    return 'MovieDataModel{movieShowingList: $movieShowingList, movieSoonList: $movieSoonList}';
  }
}
