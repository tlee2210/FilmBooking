import 'Room.dart';
import 'home_movie_format_response.dart';

class ShowTimeTableResponse {
  final int id;
  final String date;
  final String time;
  final String rules;
  final String cinemaName;
  final String movieName;
  final String roomName;
  final String image;
  final double price;
  final Room room;
  final String movieFormat;
  final List<HomeMovieFormatResponse> movieformats;

  ShowTimeTableResponse({
    required this.id,
    required this.date,
    required this.time,
    required this.rules,
    required this.cinemaName,
    required this.movieName,
    required this.roomName,
    required this.image,
    required this.price,
    required this.room,
    required this.movieFormat,
    required this.movieformats,
  });

  factory ShowTimeTableResponse.fromJson(Map<String, dynamic> json) {
    var movieFormatsList = json['movieformats'] as List;
    List<HomeMovieFormatResponse> movieformats = movieFormatsList.map((i) => HomeMovieFormatResponse.fromJson(i)).toList();

    return ShowTimeTableResponse(
      id: json['id'],
      date: json['date'],
      time: json['time'],
      rules: json['rules'],
      cinemaName: json['cinemaName'],
      movieName: json['movieName'],
      roomName: json['roomName'],
      image: json['image'],
      price: json['price'],
      room: Room.fromJson(json['room']),
      movieFormat: json['movieFormat'],
      movieformats: movieformats,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'date': date,
      'time': time,
      'rules': rules,
      'cinemaName': cinemaName,
      'movieName': movieName,
      'roomName': roomName,
      'image': image,
      'price': price,
      'room': room.toJson(),
      'movieFormat': movieFormat,
      'movieformats': movieformats.map((format) => format.toJson()).toList(),
    };
  }

  @override
  String toString() {
    return 'ShowTimeTableResponse{id: $id, date: $date, time: $time, rules: $rules, cinemaName: $cinemaName, movieName: $movieName, roomName: $roomName, image: $image, price: $price, room: $room, movieFormat: $movieFormat, movieformats: $movieformats}';
  }
}
