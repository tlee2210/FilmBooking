import 'package:fllmbooking_app/ui/MovieDetail/MovieDetail.dart';
import 'package:fllmbooking_app/ui/News/NewsDetail.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../../data/models/select_option.dart';
import '../../data/models/slider.dart';
import '../promotionsDetail/promotionsDetail.dart';

class HomeSlider extends StatefulWidget {
  final HomeSliderModel sliderModel;

  const HomeSlider({super.key, required this.sliderModel});

  @override
  State<HomeSlider> createState() => _HomeSliderState();
}

class _HomeSliderState extends State<HomeSlider> {
  @override
  Widget build(BuildContext context) {
    List<Widget> createImageWidgets(List<SelectOption> images, bool isMovie) {
      return images.map((image) {
        return InkWell(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => isMovie
                    ? MovieDetailPage(slug: image.value)
                    : NewsDetailPage(slug: image.value, type: 'Promotion'),
              ),
            );
          },
          child: Container(
            margin: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(image.label),
                fit: BoxFit.cover,
                onError: (error, stackTrace) {
                  // Xử lý lỗi tải hình ảnh
                },
              ),
              borderRadius: BorderRadius.circular(25),
            ),
          ),
        );
      }).toList();
    }

    final imageMoviesWidgets =
        createImageWidgets(widget.sliderModel.imageMovies, true);
    final imagePromotionsWidgets =
        createImageWidgets(widget.sliderModel.imagePromotions, false);

    final items = [
      ...imageMoviesWidgets,
      ...imagePromotionsWidgets,
    ];

    return CarouselSlider(
      items: items,
      options: CarouselOptions(
        autoPlay: true,
        autoPlayInterval: const Duration(seconds: 3),
        autoPlayAnimationDuration: const Duration(milliseconds: 800),
        enlargeCenterPage: true,
        enlargeFactor: 0.5,
      ),
    );
  }
}
