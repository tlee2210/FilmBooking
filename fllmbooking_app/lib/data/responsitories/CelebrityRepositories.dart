import 'package:fllmbooking_app/data/models/CelebResponse.dart';
import 'package:fllmbooking_app/data/source/celebrity.dart';

abstract interface class Repositories {
  Future<CelebResponse?> getCelebDetail(String slug);
}

class CelebrityRepository implements Repositories {
  final CelebrityData _celebrityData = CelebrityData();
  @override
  Future<CelebResponse?> getCelebDetail(String slug) async {
    try {
      final value = await _celebrityData.getCelebDetail(slug);
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }
}
