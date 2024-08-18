import 'package:fllmbooking_app/data/models/home_time_and_room_response.dart';

class HomeMovieFormatResponse {
  String? name;
  List<HomeTimeAndRoomResponse>? times;

  HomeMovieFormatResponse({required this.name, required this.times});

  factory HomeMovieFormatResponse.fromJson(Map<String, dynamic> json) {
    return HomeMovieFormatResponse(
      name: json['name'],
      times: json['times'] != null
          ? (json['times'] as List)
              .map((time) => HomeTimeAndRoomResponse.fromJson(time))
              .toList()
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'times': times?.map((time) => time.toJson()).toList(),
    };
  }

  @override
  String toString() {
    return 'HomeMovieFormatResponse{name: $name, times: $times}';
  }
}
