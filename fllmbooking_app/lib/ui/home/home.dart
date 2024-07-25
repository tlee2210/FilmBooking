import 'dart:collection';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

import '../../data/models/home.dart';
import 'homeViewModel.dart';
import 'home_slider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late HomeViewModel _homeViewModel;
  late Homegenerated _homegenerated;
  List<String> carouselItems = [];
  int tabIndex = 0;
  final List<String> tabs = ['Now showing', 'Coming soon'];

  // late Future<List<Movie>> _movieList;
  late Future<void> _carouselList;

  @override
  void initState() {
    _homeViewModel = HomeViewModel();
    _homeViewModel.loadHome();
    observeData();
    super.initState();

    _carouselList = _carouselImages();
  }

  void observeData() {
    _homeViewModel.homeStream.listen(
      (Homegenerated homeData) {
        setState(() {
          _homegenerated = homeData;
        });
      },
      onError: (error) {
        print('Error: $error');
      },
    );
  }

  Future<void> _carouselImages() async {
    // carouselItems = await HomeService().getCarousel();
    setState(() {});
  }

  void _onTabSelect(int index) {
    setState(() {
      tabIndex = index;

      if (tabIndex == 0) {
        // _movieList = HomeService().getMovieShowing();
      } else {
        // _movieList = HomeService().getMovieSoon();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    CarouselController controller = CarouselController();
    return Scaffold(
      backgroundColor: const Color(0xff1f1d2b),
      body: Column(
        children: [
          const SizedBox(
            height: 30,
          ),
          FutureBuilder(
            future: _carouselList,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(
                    child: Text(
                  'Error: ${snapshot.error}',
                  style: TextStyle(color: Colors.white),
                ));
              } else {
                return const Column(
                  children: [
                    SizedBox(
                      height: 16,
                    ),
                    HomeSlider()
                    // buildCarouseIndicator(),
                  ],
                );
              }
            },
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: List.generate(tabs.length, (index) {
                return GestureDetector(
                  onTap: () {
                    _onTabSelect(index);
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                        vertical: 8.0, horizontal: 16.0),
                    decoration: BoxDecoration(
                      color: tabIndex == index
                          ? Colors.cyanAccent.withOpacity(0.1)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(16.0),
                    ),
                    child: Text(
                      tabs[index],
                      style: TextStyle(
                        color: tabIndex == index
                            ? Colors.cyanAccent
                            : Colors.white,
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              // child: GridView.builder,
              //
            ),
          )
        ],
      ),
    );
  }
}

class MovieCard extends StatelessWidget {
  final String title;
  final String genre;
  final double rating;
  final String imageUrl;

  MovieCard({
    required this.title,
    required this.genre,
    required this.rating,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.grey[900],
      shape: ContinuousRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(8.0),
              topRight: Radius.circular(8.0),
            ),
            child: Image.network(
              imageUrl,
              fit: BoxFit.cover,
              height: 265,
              width: double.infinity,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 4.0),
                Text(
                  title,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16.0,
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 4.0),
                Text(
                  genre,
                  style: TextStyle(color: Colors.grey, fontSize: 12.0),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
