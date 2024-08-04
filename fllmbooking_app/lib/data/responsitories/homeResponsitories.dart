import '../models/home.dart';
import '../source/home.dart';

abstract interface class Responsetories {
  Future<HomeDataModel>? getHomeData();
}

class HomeResponsetories implements Responsetories {
  final _homeDataSource = HomeData();

  @override
  Future<HomeDataModel>? getHomeData() async {
    try {
      final value = await _homeDataSource.getHomeData();

      if (value != null) {
        return value;
      } else {
        throw Exception('No data received');
      }
    } catch (e) {
      throw Exception('Failed to get home data: $e');
    }
  }
}
