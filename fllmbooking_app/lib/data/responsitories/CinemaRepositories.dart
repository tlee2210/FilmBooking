import 'package:fllmbooking_app/data/models/CinemaListResponse.dart';
import 'package:fllmbooking_app/data/models/home_cinema_response.dart';
import 'package:fllmbooking_app/data/source/cinema.dart';

abstract interface class Repositories {
  Future<CinemaListResponse?> getAllCinema(String slugCity);

  Future<HomeCinemaResponse?> getCinemaDetail(String slug);
}

class CinemaRepositories implements Repositories {
  final CinemaData _cinemaData = CinemaData();

  @override
  Future<CinemaListResponse?> getAllCinema(String slugCity) async {
    try {
      final value = await _cinemaData.getAllCinema(slugCity);
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get cinema data: $e');
    }
  }

  @override
  Future<HomeCinemaResponse?> getCinemaDetail(String slug) async {
    try {
      final value = await _cinemaData.getCinemaDetail(slug);
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get cinema data: $e');
    }
  }
}
