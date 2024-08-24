import 'package:fllmbooking_app/data/models/Promotion.dart';
import 'package:fllmbooking_app/data/source/promotion.dart';

abstract interface class Repositories {
  Future<List<Promotion>?> getAllPromotion();
  Future<Promotion?> getPromotionDetail(String slug);
}

class PromotionRepository implements Repositories {
  final PromotionData _promotionData = PromotionData();
  @override
  Future<List<Promotion>?> getAllPromotion() async {
    try {
      final value = await _promotionData.getAllPromotion();
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }

  @override
  Future<Promotion?> getPromotionDetail(String slug) async {
    try {
      final value = await _promotionData.getPromotionDetail(slug);
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
