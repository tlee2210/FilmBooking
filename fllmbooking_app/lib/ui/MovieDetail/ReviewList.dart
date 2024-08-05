import 'package:fllmbooking_app/data/models/review.dart';
import 'package:fllmbooking_app/ui/MovieDetail/ReviewItem.dart';
import 'package:flutter/material.dart';

class Reviewlist extends StatelessWidget {
  final List<Review> reviews;
  const Reviewlist({required this.reviews});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: reviews.map((review) {
        return Reviewitem(review: review);
      }).toList(),
    );
  }
}
