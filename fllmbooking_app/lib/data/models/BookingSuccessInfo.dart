import 'package:intl/intl.dart';
import 'BookingWaterCorn.dart';

class BookingSuccessInfo {
  int? id;
  String? orderId;
  String? paymentId;
  String? cinemaName;
  String? movieName;
  String? roomName;
  DateTime? date;
  DateTime? time;
  String? quantitySeat;
  String? quantityDoubleSeat;
  String? movieFormat;
  List<BookingWaterCorn>? bookingWaterCorn;
  double? totalPrice;

  BookingSuccessInfo({
    this.id,
    this.orderId,
    this.paymentId,
    this.cinemaName,
    this.movieName,
    this.roomName,
    this.date,
    this.time,
    this.quantitySeat,
    this.quantityDoubleSeat,
    this.movieFormat,
    this.bookingWaterCorn,
    this.totalPrice,
  });

  factory BookingSuccessInfo.fromJson(Map<String, dynamic> json) {
    return BookingSuccessInfo(
      id: json['id'],
      orderId: json['orderId'],
      paymentId: json['paymentId'],
      cinemaName: json['cinemaName'],
      movieName: json['movieName'],
      roomName: json['roomName'],
      date: json['date'] != null ? DateFormat('yyyy-MM-dd').parse(json['date']) : null,
      time: json['time'] != null ? DateFormat('HH:mm').parse(json['time']) : null,
      quantitySeat: json['quantitySeat'],
      quantityDoubleSeat: json['quantityDoubleSeat'],
      movieFormat: json['movieFormat'],
      bookingWaterCorn: (json['bookingWaterCorn'] as List?)
          ?.map((e) => BookingWaterCorn.fromJson(e))
          .toList(),
      totalPrice: json['totalPrice'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'orderId': orderId,
      'paymentId': paymentId,
      'cinemaName': cinemaName,
      'movieName': movieName,
      'roomName': roomName,
      'date': date != null ? _formatDate(date!) : null,
      'time': time != null ? _formatTime(time!) : null,
      'quantitySeat': quantitySeat,
      'quantityDoubleSeat': quantityDoubleSeat,
      'movieFormat': movieFormat,
      'bookingWaterCorn': bookingWaterCorn?.map((e) => e.toJson()).toList(),
      'totalPrice': totalPrice,
    };
  }

  @override
  String toString() {
    return 'BookingSuccessInfo{id: $id, orderId: $orderId, paymentId: $paymentId, cinemaName: $cinemaName, movieName: $movieName, roomName: $roomName, date: $date, time: $time, quantitySeat: $quantitySeat, quantityDoubleSeat: $quantityDoubleSeat, movieFormat: $movieFormat, bookingWaterCorn: $bookingWaterCorn, totalPrice: $totalPrice}';
  }

  static String _formatDate(DateTime date) {
    return DateFormat('yyyy-MM-dd').format(date);
  }

  static String _formatTime(DateTime time) {
    return DateFormat('HH:mm').format(time);
  }
}
