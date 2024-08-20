import 'dart:convert';

import 'package:fllmbooking_app/data/models/home_cinema_response.dart';
import 'package:fllmbooking_app/data/models/movie_showtime_response.dart';
import 'package:fllmbooking_app/data/responsitories/CinemaRepositories.dart';
import 'package:fllmbooking_app/ui/MovieDetail/DateSelection.dart';
import 'package:fllmbooking_app/ui/cinema/FilmItem.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher_string.dart';

class CinemaDetail extends StatefulWidget {
  final String slug;
  final double distance;
  const CinemaDetail({required this.slug, required this.distance});

  @override
  State<CinemaDetail> createState() => _CinemaDetailState();
}

class _CinemaDetailState extends State<CinemaDetail> {
  late Future<HomeCinemaResponse?> _cinema;
  late List<MovieAndShowtimeResponse>? movieList;
  List<String> dateNumbers = [];
  List<String> weekdays = [];
  late int selectedDateIndex;
  late int? selectedHourIndex;

  late Map<String, int> selectedHour;

  @override
  void initState() {
    super.initState();
    selectedDateIndex = 0;
    selectedHourIndex = -1;
    selectedHour = {};
    _cinema = CinemaRepositories().getCinemaDetail(widget.slug);
  }

  Future<void> _openMap(String address) async {
    String googleUrl =
        'https://www.google.com/maps/search/?api=1&query=$address';
    await canLaunchUrlString(googleUrl)
        ? await launchUrlString(googleUrl)
        : throw 'Could not launch $googleUrl';
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<HomeCinemaResponse?>(
      future: _cinema,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data == null) {
          return const Center(child: Text('No data available'));
        } else {
          final cinema = snapshot.data!;
          dateNumbers.clear();
          weekdays.clear();
          cinema.days!.forEach((day) {
            dateNumbers.add(DateFormat('dd / MM').format(day.date!));
            weekdays.add(DateFormat('EEEE').format(day.date!));
          });
          movieList = cinema.days!.isEmpty
              ? []
              : cinema.days![selectedDateIndex].movieList;
          return Scaffold(
            appBar: AppBar(
              backgroundColor: const Color(0xff1f1d2b),
              title: Text(
                utf8.decode(cinema.name!.codeUnits),
                style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
              leading: IconButton(
                icon: const Icon(Icons.arrow_back, color: Colors.white),
                onPressed: () => Navigator.of(context).pop(),
              ),
              centerTitle: true,
              actions: [
                IconButton(
                    onPressed: () {
                      _openMap(utf8.decode(cinema.address!.codeUnits));
                    },
                    icon: const Icon(
                      Icons.near_me_outlined,
                      color: Colors.white,
                    ))
              ],
            ),
            backgroundColor: const Color(0xff1f1d2b),
            body: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.location_on_outlined,
                        color: Colors.lightBlue,
                      ),
                      Expanded(
                        child: Text(
                          '${double.parse(widget.distance.toStringAsFixed(1))} km-${utf8.decode(cinema.address!.codeUnits)}',
                          style: const TextStyle(color: Colors.white),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      )
                    ],
                  ),
                ),
                const Divider(),
                DateSelection(
                  dateNumbers: dateNumbers,
                  weekdays: weekdays,
                  selectedDateIndex: selectedDateIndex,
                  onDateSelected: (index) {
                    setState(() {
                      selectedDateIndex = index;
                    });
                  },
                ),
                if (movieList!.isEmpty)
                  Container(
                    padding: const EdgeInsets.only(top: 100),
                    child: const Center(
                      child: Text(
                        "Movies aren't available",
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ListView.builder(
                      itemCount: movieList?.length ?? 0,
                      itemBuilder: (context, index) {
                        final movie = movieList![index];
                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            FilmItem(
                              name: movie.name!,
                              imagePortrait: movie.imagePortrait!,
                              rules: movie.rules!,
                              durationMovie: movie.durationMovie!,
                              releaseDate: movie.releaseDate!,
                            ),
                            for (var format in movie.movieFormats!)
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(height: 15),
                                  Text(
                                    format.name!,
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                  const SizedBox(height: 15),
                                  Container(
                                    height: 50,
                                    child: ListView.builder(
                                      scrollDirection: Axis.horizontal,
                                      itemCount: format.times!.length,
                                      itemBuilder: (context, timeIndex) {
                                        final time = format.times![timeIndex];
                                        final key =
                                            '${movie.name}_${format.name}';
                                        return GestureDetector(
                                          onTap: () => {
                                            setState(() {
                                              selectedHour.clear();
                                              selectedHour[key] = timeIndex;
                                            })
                                          },
                                          child: Container(
                                            alignment: Alignment.center,
                                            padding: const EdgeInsets.symmetric(
                                                horizontal: 16),
                                            margin: const EdgeInsets.all(5),
                                            decoration: BoxDecoration(
                                              color:
                                                  selectedHour[key] == timeIndex
                                                      ? const Color(0xff252836)
                                                      : Colors.transparent,
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                              border: Border.all(
                                                  color: Colors.blue),
                                            ),
                                            child: Text(
                                              DateFormat('kk:mm')
                                                  .format(time.time!),
                                              style: TextStyle(
                                                color: selectedHour[key] ==
                                                        timeIndex
                                                    ? Colors.cyanAccent
                                                    : Colors.white,
                                              ),
                                            ),
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                  const Divider(),
                                ],
                              ),
                          ],
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          );
        }
      },
    );
  }
}
