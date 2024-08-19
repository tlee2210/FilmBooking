import 'WaterCorn.dart';

class SeatBooked {
  String seatBooked;
  List<WaterCorn> waterCorns;

  SeatBooked({
    required this.seatBooked,
    required this.waterCorns,
  });

  factory SeatBooked.fromJson(Map<String, dynamic> json) {
    return SeatBooked(
      seatBooked: json['seatBooked'],
      waterCorns: (json['waterCorns'] as List)
          .map((item) => WaterCorn.fromJson(item))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'seatBooked': seatBooked,
      'waterCorns': waterCorns.map((item) => item.toJson()).toList(),
    };
  }

  @override
  String toString() {
    return 'SeatBooked{seatBooked: $seatBooked, waterCorns: $waterCorns}';
  }
}
