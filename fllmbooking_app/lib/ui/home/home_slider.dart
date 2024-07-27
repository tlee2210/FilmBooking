import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../../data/models/slider.dart';

class HomeSlider extends StatefulWidget {
  final HomeSliderModel sliderModel;

  const HomeSlider({super.key, required this.sliderModel});

  @override
  State<HomeSlider> createState() => _HomeSliderState();
}

class _HomeSliderState extends State<HomeSlider> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // Convert the imageMovies and imagePromotions into lists of widgets
    final imageMoviesWidgets = widget.sliderModel.imageMovies.map((imageMovie) {
      return Container(
        margin: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(imageMovie.label), // Use dynamic image URL
            fit: BoxFit.cover,
          ),
          borderRadius: BorderRadius.circular(25),
        ),
      );
    }).toList();

    final imagePromotionsWidgets = widget.sliderModel.imagePromotions.map((imagePromotion) {
      return Container(
        margin: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(imagePromotion.label), // Use dynamic image URL
            fit: BoxFit.cover,
          ),
          borderRadius: BorderRadius.circular(25),
        ),
      );
    }).toList();

    // Combine the lists with a spacer between them
    final items = [
      ...imageMoviesWidgets,
      ...imagePromotionsWidgets,
    ];

    return CarouselSlider(
      items: items,
      options: CarouselOptions(
        autoPlay: true,
        autoPlayInterval: Duration(seconds: 3),
        autoPlayAnimationDuration: Duration(milliseconds: 800),
        enlargeCenterPage: true,
        enlargeFactor: 0.5,
      ),
    );
  }
}
