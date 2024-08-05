import 'package:fllmbooking_app/data/models/booking_show_time_response.dart';
import 'package:fllmbooking_app/data/models/select_option_reponse.dart';

class bookTicketsResponse {
  List<SelectOptionReponse>? city;
  List<SelectOptionReponse>? cinema;
  List<bookingShowTimeResponse>? bookingShowTimeResponses;

  bookTicketsResponse(
      {required this.city,
      required this.cinema,
      required this.bookingShowTimeResponses});

  factory bookTicketsResponse.fromJson(Map<String, dynamic> json) {
    return bookTicketsResponse(
      city: json['city'] != null
          ? (json['city'] as List)
              .map((ci) => SelectOptionReponse.fromJson(ci))
              .toList()
          : null,
      cinema: json['cinema'] != null
          ? (json['cinema'] as List)
              .map((cine) => SelectOptionReponse.fromJson(cine))
              .toList()
          : null,
      bookingShowTimeResponses: json['bookingShowTimeResponses'] != null
          ? (json['bookingShowTimeResponses'] as List)
              .map((showtime) => bookingShowTimeResponse.fromJson(showtime))
              .toList()
          : null,
    );
  }
}
