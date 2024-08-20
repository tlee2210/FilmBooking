import 'package:fllmbooking_app/data/models/CinemaResponse.dart';
import 'package:fllmbooking_app/data/models/select_option_reponse.dart';

class CinemaListResponse {
  List<SelectOptionReponse>? cityList;
  List<CinemaResponse>? cinemas;

  CinemaListResponse({required this.cityList, required this.cinemas});

  factory CinemaListResponse.fromJson(Map<String, dynamic> json) {
    return CinemaListResponse(
      cityList: json['cityList'] != null
          ? (json['cityList'] as List)
              .map((city) => SelectOptionReponse.fromJson(city))
              .toList()
          : null,
      cinemas: json['cinemas'] != null
          ? (json['cinemas'] as List)
              .map((cinema) => CinemaResponse.fromJson(cinema))
              .toList()
          : null,
    );
  }

  static List<CinemaListResponse> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => CinemaListResponse.fromJson(json)).toList();
  }
}
