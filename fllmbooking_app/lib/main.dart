import 'package:fllmbooking_app/ui/News/NewsList.dart';
import 'package:fllmbooking_app/ui/booking/SeatSelection.dart';
import 'package:fllmbooking_app/ui/home/home.dart';
import 'package:fllmbooking_app/ui/user/profile.dart';
import 'package:flutter/material.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  final int selectedIndex;

  const MyApp({super.key, this.selectedIndex = 0});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late int _selectedIndex;

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.selectedIndex;
  }

  final List<Widget> _tabs = [
    const HomeScreen(),
    // const CinemaTab(),
    SeatSelectionScreen(id: 118,),
    const Newslist(),
    // const FilmTab(),
    // const AccountTab(),
    ProfileTab(),
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: const Color(0xff1f1d2b),
        body: _tabs[_selectedIndex], // Display the current tab
        bottomNavigationBar: SalomonBottomBar(
          margin: const EdgeInsets.only(left: 30, right: 30),
          currentIndex: _selectedIndex,
          onTap: (i) => setState(() => _selectedIndex = i),
          items: [
            SalomonBottomBarItem(
              icon: const Icon(Icons.home),
              title: const Text("Home"),
              selectedColor: Colors.cyanAccent,
              unselectedColor: Colors.grey,
            ),
            SalomonBottomBarItem(
              icon: Image.asset(
                "assets/image/TabBar/3d-glasses.png",
                width: 33,
              ),
              title: const Text("Cinema"),
              selectedColor: Colors.cyanAccent,
              unselectedColor: Colors.grey,
            ),
            SalomonBottomBarItem(
              icon: const Icon(Icons.movie),
              title: const Text("News"),
              selectedColor: Colors.cyanAccent,
              unselectedColor: Colors.grey,
            ),
            SalomonBottomBarItem(
              icon: const Icon(Icons.person),
              title: const Text("Profile"),
              selectedColor: Colors.cyanAccent,
              unselectedColor: Colors.grey,
            ),
          ],
        ),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
