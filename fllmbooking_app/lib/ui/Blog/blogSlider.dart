import 'package:fllmbooking_app/data/models/MovieBlog.dart';
import 'package:fllmbooking_app/data/models/review.dart';
import 'package:fllmbooking_app/data/responsitories/BlogRepositories.dart';
import 'package:fllmbooking_app/data/responsitories/ReviewRepositories.dart';
import 'package:fllmbooking_app/ui/News/NewsDetail.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import '../../data/models/item_introduce.dart';
import '../ProgressBar/getProgressBar.dart';
import '../Review/reviewDetail.dart';
import 'blogDetail.dart';

class BlogSlider extends StatefulWidget {
  final List<ItemIntroduce> data;
  final bool isBlog;

  const BlogSlider({super.key, required this.data, required this.isBlog});

  @override
  State<BlogSlider> createState() => _BlogSliderState();
}

class _BlogSliderState extends State<BlogSlider> {
  final CarouselController _controller = CarouselController();
  int _current = 0;

  List<Widget> createImageWidgets(List<ItemIntroduce> data, bool isBlog) {
    return data.map((item) {
      return FutureBuilder(
        future: isBlog
            ? BlogRepository().getBlogDetail(item.slug)
            : ReviewRepository().getReviewDetail(item.slug),
        builder: (context, snapshot) {
          // if (snapshot.connectionState == ConnectionState.waiting) {
          //   return CircularProgressIndicator();
          // } else {

          // }
          return InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => NewsDetailPage(item: snapshot.data!),
                ),
              );
            },
            child: Stack(
              children: [
                Container(
                  margin: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: NetworkImage(item.imagePortrait),
                      fit: BoxFit.cover,
                      onError: (error, stackTrace) {
                        // Handle image load error
                      },
                    ),
                    borderRadius: BorderRadius.circular(25),
                  ),
                  height: 200,
                ),
                Positioned(
                  bottom: 20,
                  left: 4,
                  right: 4,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.5),
                      borderRadius: const BorderRadius.only(
                        bottomLeft: Radius.circular(25),
                        bottomRight: Radius.circular(25),
                      ),
                    ),
                    child: Center(
                      child: Text(
                        item.name,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          // Text color
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    Widget getBody() {
      if (widget.data.isEmpty) {
        return getProgressBar();
      } else {
        return CarouselSlider(
          items: createImageWidgets(widget.data, widget.isBlog),
          carouselController: _controller,
          options: CarouselOptions(
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 3),
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            enlargeCenterPage: true,
            aspectRatio: 2.0,
            onPageChanged: (index, reason) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                if (mounted) {
                  setState(() {
                    _current = index;
                  });
                }
              });
            },
          ),
        );
      }
    }

    return getBody();
  }
}
