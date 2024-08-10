import 'package:fllmbooking_app/data/models/review.dart';
import 'package:fllmbooking_app/data/source/review.dart';

abstract interface class Repositories {
  Future<List<Review>?> getAllReview();
  Future<Review?> getReviewDetail(String slug);
}

class ReviewRepository implements Repositories {
  final ReviewData _reviewDataSource = ReviewData();
  @override
  Future<List<Review>?> getAllReview() async {
    try {
      final value = await _reviewDataSource.getAllReview();
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
  Future<Review?> getReviewDetail(String slug) async {
    try {
      final value = await _reviewDataSource.getReviewDetail(slug);
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
