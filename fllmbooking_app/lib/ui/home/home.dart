import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../../data/models/home.dart';
import '../../data/models/item_introduce.dart';
import '../MovieDetail/movie_detail.dart';
import 'homeViewModel.dart';
import 'home_card.dart';
import 'home_slider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late HomeViewModel _homeViewModel;
  late HomeDataModel _homeDataModel;
  int tabIndex = 0;
  final List<String> tabs = ['Now showing', 'Coming soon'];

  late Future<void> _carouselList;

  @override
  void initState() {
    super.initState();
    _homeViewModel = HomeViewModel();
    _homeViewModel.loadHome();
    observeData();
    _carouselList = _carouselImages();
  }

  void observeData() {
    _homeViewModel.homeStream.listen(
      (HomeDataModel homeData) {
        setState(() {
          _homeDataModel = homeData;
        });
      },
      onError: (error) {
        print('Error: $error');
      },
    );
  }

  Future<void> _carouselImages() async {
    // Load carousel images
    setState(() {});
  }

  void _onTabSelect(int index) {
    setState(() {
      tabIndex = index;
      // Update movie list based on selected tab
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff1f1d2b),
      body: Column(
        children: [
          const SizedBox(height: 30),
          FutureBuilder(
            future: _carouselList,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(
                  child: Text(
                    'Error: ${snapshot.error}',
                    style: const TextStyle(color: Colors.white),
                  ),
                );
              } else if (_homeDataModel != null) {
                return Column(
                  children: [
                    const SizedBox(height: 16),
                    HomeSlider(sliderModel: _homeDataModel.slider),
                  ],
                );
              } else {
                return const Center(
                  child: Text(
                    'No data available',
                    style: TextStyle(color: Colors.white),
                  ),
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
                  onTap: () => _onTabSelect(index),
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
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 6.0,
                  mainAxisSpacing: 6.0,
                  childAspectRatio: 0.7,
                ),
                itemCount: tabIndex == 0
                    ? _homeDataModel.movieShowingList.length
                    : _homeDataModel.movieSoonList.length,
                itemBuilder: (context, index) {
                  final movie = tabIndex == 0
                      ? _homeDataModel.movieShowingList[index]
                      : _homeDataModel.movieSoonList[index];
                  return MovieCard(item: movie);
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
