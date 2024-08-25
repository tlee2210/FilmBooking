import 'item_introduce.dart';

class MovieDataModel {
  List<ItemIntroduce> movieShowingList;
  List<ItemIntroduce>? movieSoonList; // Nullable list

  MovieDataModel({
    required this.movieShowingList,
    this.movieSoonList, // Nullable
  });

  factory MovieDataModel.fromJson(Map<String, dynamic> json) {
    return MovieDataModel(
      movieShowingList: List<ItemIntroduce>.from(
          json['movieShowingList'].map((i) => ItemIntroduce.fromJson(i))),
      movieSoonList: json['movieSoonList'] != null
          ? List<ItemIntroduce>.from(
          json['movieSoonList'].map((i) => ItemIntroduce.fromJson(i)))
          : null, // Handle null value
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'movieShowingList': movieShowingList.map((i) => i.toJson()).toList(),
      'movieSoonList': movieSoonList != null
          ? movieSoonList!.map((i) => i.toJson()).toList()
          : null, // Handle null value
    };
  }

  @override
  String toString() {
    return 'MovieDataModel{movieShowingList: $movieShowingList, movieSoonList: $movieSoonList}';
  }
}
