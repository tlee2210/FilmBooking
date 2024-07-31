import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../data/models/home.dart';
import '../Blog/blogPage.dart';
import '../Blog/blogSlider.dart';
import '../Movie/Movie.dart';
import '../Movie/MovieGrid.dart';
import '../Movie/MovieTabs.dart';
import '../ProgressBar/getProgressBar.dart';
import '../Review/reviewPage.dart';
import 'homeViewModel.dart';
import 'home_slider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late HomeViewModel _homeViewModel;
  HomeDataModel? _homeDataModel;
  int _movieTabIndex = 0;
  int _blogTabIndex = 0;
  final List<String> _movieTabs = ['Now showing', 'Coming soon'];
  final List<String> _blogTabs = ['Blog', 'Review'];

  @override
  void initState() {
    super.initState();
    _homeViewModel = HomeViewModel();
    _homeViewModel.loadHome();
    observeData();
  }

  void observeData() {
    _homeViewModel.homeStream.listen(
      (HomeDataModel homeData) {
        setState(() {
          _homeDataModel = homeData;
        });
      },
    );
  }

  @override
  void dispose() {
    super.dispose();
    _homeViewModel.dispose();
  }

  void _onTabSelect(int index) {
    setState(() {
      _movieTabIndex = index;
    });
  }

  void _onTabBlogSelect(int index) {
    setState(() {
      _blogTabIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff1f1d2b),
      body: getBody(),
    );
  }

  Widget getBody() {
    if (_homeDataModel == null ||
        _homeDataModel!.movieBlogList == null ||
        _homeDataModel!.reviewList == null) {
      return getProgressBar();
    } else {
      return CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Column(
              children: [
                const SizedBox(height: 30),
                HomeSlider(sliderModel: _homeDataModel!.slider),
                Padding(
                  padding: const EdgeInsets.only(
                      top: 16, bottom: 6, left: 16, right: 16),
                  child: MovieTabs(
                    tabIndex: _movieTabIndex,
                    onTabSelect: _onTabSelect,
                    tabs: _movieTabs,
                  ),
                ),
              ],
            ),
          ),
          MovieGrid(
            tabIndex: _movieTabIndex,
            movieShowingList: _homeDataModel!.movieShowingList,
            movieSoonList: _homeDataModel!.movieSoonList,
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Movie(),
                    ),
                  );
                },
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.transparent),
                  side: MaterialStateProperty.all<BorderSide>(
                      const BorderSide(color: Colors.white)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                ),
                child: const Text('See More',
                    style: TextStyle(color: Colors.white)),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: MovieTabs(
                tabIndex: _blogTabIndex,
                onTabSelect: _onTabBlogSelect,
                tabs: _blogTabs,
              ),
            ),
          ),
          if (_homeDataModel!.movieBlogList != null &&
              _homeDataModel!.movieBlogList.isNotEmpty &&
              _homeDataModel!.reviewList != null &&
              _homeDataModel!.reviewList.isNotEmpty)
            SliverToBoxAdapter(
              child: _blogTabIndex == 0
                  ? BlogSlider(
                      data: _homeDataModel!.movieBlogList,
                      isBlog: true,
                    )
                  : BlogSlider(
                      data: _homeDataModel!.reviewList,
                      isBlog: false,
                    ),
            ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          _blogTabIndex == 0 ? BlogPage() : ReviewPage(),
                    ),
                  );
                },
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.transparent),
                  side: MaterialStateProperty.all<BorderSide>(
                      const BorderSide(color: Colors.white)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                ),
                child: const Text('See More',
                    style: TextStyle(color: Colors.white)),
              ),
            ),
          ),
          const SliverToBoxAdapter(
            child: SizedBox(height: 15),
          ),
        ],
      );
    }
  }
}
