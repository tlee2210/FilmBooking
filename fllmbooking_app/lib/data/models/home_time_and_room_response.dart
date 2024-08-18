import 'package:intl/intl.dart';

class HomeTimeAndRoomResponse {
  int? idRoom;
  DateTime? time;

  HomeTimeAndRoomResponse({required this.idRoom, required this.time});

  factory HomeTimeAndRoomResponse.fromJson(Map<String, dynamic> json) {
    return HomeTimeAndRoomResponse(
      idRoom: json['idRoom'],
      time: json['time'] != null ? _parseTime(json['time']) : null,
    );
  }

  static DateTime _parseTime(String timeString) {
    final format = DateFormat.Hms();
    return format.parse(timeString);
  }

  Map<String, dynamic> toJson() {
    return {
      'idRoom': idRoom,
      'time': time != null ? DateFormat.Hms().format(time!) : null,
    };
  }

  @override
  String toString() {
    return 'HomeTimeAndRoomResponse{idRoom: $idRoom, time: $time}';
  }
}
