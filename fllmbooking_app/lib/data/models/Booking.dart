import 'BookingWaterCorn.dart';

class Booking {
  int id;
  String rules;
  String movieName;
  String movieFormat;
  String cinemaName;
  String roomName;
  String paymentType;
  String? quantitySeat;
  String? quantityDoubleSeat;
  double totalPrice;
  List<BookingWaterCorn>? bookingWaterCorn;
  String bookingDate;
  String image;
  String showTime;
  String showTimeDate;

  Booking({
    required this.id,
    required this.rules,
    required this.movieName,
    required this.movieFormat,
    required this.cinemaName,
    required this.roomName,
    required this.paymentType,
    this.quantitySeat,
    this.quantityDoubleSeat,
    required this.totalPrice,
    this.bookingWaterCorn,
    required this.bookingDate,
    required this.image,
    required this.showTime,
    required this.showTimeDate,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'],
      rules: json['rules'],
      movieName: json['movieName'],
      movieFormat: json['movieFormat'],
      cinemaName: json['cinemaName'],
      roomName: json['roomName'],
      paymentType: json['paymentType'],
      quantitySeat: json['quantitySeat'],
      quantityDoubleSeat: json['quantityDoubleSeat'],
      totalPrice: json['totalPrice'],
      bookingWaterCorn: (json['bookingWaterCorn'] as List?)
          ?.map((x) => BookingWaterCorn.fromJson(x))
          .toList(),
      bookingDate: json['bookingDate'],
      image: json['image'],
      showTime: json['showTime'],
      showTimeDate: json['showTimeDate'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'rules': rules,
      'movieName': movieName,
      'movieFormat': movieFormat,
      'cinemaName': cinemaName,
      'roomName': roomName,
      'paymentType': paymentType,
      'quantitySeat': quantitySeat,
      'quantityDoubleSeat': quantityDoubleSeat,
      'totalPrice': totalPrice,
      'bookingWaterCorn': bookingWaterCorn
          ?.map((x) => x.toJson())
          .toList(),
      'bookingDate': bookingDate,
      'image': image,
      'showTime': showTime,
      'showTimeDate': showTimeDate,
    };
  }

  @override
  String toString() {
    return 'Booking{id: $id, rules: $rules, movieName: $movieName, movieFormat: $movieFormat, cinemaName: $cinemaName, roomName: $roomName, paymentType: $paymentType, quantitySeat: $quantitySeat, quantityDoubleSeat: $quantityDoubleSeat, totalPrice: $totalPrice, bookingWaterCorn: $bookingWaterCorn, bookingDate: $bookingDate, image: $image, showTime: $showTime, showTimeDate: $showTimeDate}';
  }
}
