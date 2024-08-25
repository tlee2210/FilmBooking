import 'package:fllmbooking_app/data/models/book_tickets_response.dart';
import 'package:fllmbooking_app/data/models/select_option_reponse.dart';
import 'package:fllmbooking_app/data/responsitories/movieResponsitories.dart';
import 'package:fllmbooking_app/ui/MovieDetail/DateSelection.dart';
import 'package:fllmbooking_app/ui/MovieDetail/DropdownContainer.dart';
import 'package:fllmbooking_app/ui/MovieDetail/ShowtimesList.dart';
import 'package:flutter/material.dart';
import 'package:html/parser.dart';
import 'package:intl/intl.dart';
import 'dart:convert' show utf8;

class ShowtimeWidget extends StatefulWidget {
  final String slug;
  const ShowtimeWidget({required this.slug});

  @override
  State<ShowtimeWidget> createState() => _ShowtimeWidgetState();
}

class _ShowtimeWidgetState extends State<ShowtimeWidget> {
  late Future<bookTicketsResponse?> item = Future.value(
      bookTicketsResponse(bookingShowTimeResponses: [], city: [], cinema: []));
  List<SelectOptionReponse> cities = [
    SelectOptionReponse(label: 'All', value: 'All')
  ];

  late String cityValue;
  late String cinemaValue;

  List<String> dateNumbers = [];
  List<String> weekdays = [];
  late int selectedDateIndex;
  late int? selectedHourIndex;

  late Map<String, int> selectedHour;
  int? expandedIndex;

  @override
  void initState() {
    super.initState();
    selectedDateIndex = 0;
    selectedHourIndex = -1;
    cinemaValue = '';
    cityValue = '';
    expandedIndex = 0;
    selectedHour = {};
    _fetchInitialData();
  }

  Future<void> _fetchInitialData() async {
    try {
      final response =
          await MovieResponsetories().getTimeForMovie(widget.slug, '', '');
      setState(() {
        cities.addAll(response!.city!.map((city) {
          return SelectOptionReponse(
              value: parse(utf8.decode(city.value!.codeUnits)).body!.text,
              label: parse(utf8.decode(city.label!.codeUnits)).body!.text);
        }).toList());

        cityValue = cities.first.value;
        if (cityValue == 'All') {
          item = MovieResponsetories()
              .getTimeForMovie(widget.slug, '', cinemaValue);
        } else {
          item = MovieResponsetories()
              .getTimeForMovie(widget.slug, cityValue, cinemaValue);
        }
      });
    } catch (e) {
      print('Error fetching data: $e');
      setState(() {
        item = Future.value(bookTicketsResponse(
            bookingShowTimeResponses: [], city: [], cinema: []));
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bookTicketsResponse?>(
      future: item,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data == null) {
          return const Center(child: Text('No data available'));
        } else {
          final days = snapshot.data!.bookingShowTimeResponses;
          dateNumbers.clear();
          days?.forEach((day) {
            dateNumbers.add(DateFormat('dd / MM').format(day.day!));
            weekdays.add(DateFormat('EEEE').format(day.day!));
          });

          List<SelectOptionReponse> cinemas =
              snapshot.data!.cinema!.map((cine) {
            return SelectOptionReponse(
                value: cine.value,
                label: parse(utf8.decode(cine.label!.codeUnits)).body!.text);
          }).toList();

          // if (cityValue.isEmpty && cities.isNotEmpty) {
          //   cityValue = cities.first.value;
          // }

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Dropdowncontainer(
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                          isExpanded: true,
                          value: cityValue.isNotEmpty ? cityValue : null,
                          iconEnabledColor: Colors.white,
                          alignment: Alignment.topLeft,
                          elevation: 3,
                          dropdownColor: const Color(0xff29263e),
                          onChanged: (String? newValue) {
                            setState(() {
                              cinemaValue = '';
                              cityValue = (newValue! == 'All') ? '' : newValue;
                              item = MovieResponsetories().getTimeForMovie(
                                  widget.slug, cityValue, cinemaValue);
                            });
                          },
                          items: cities.map<DropdownMenuItem<String>>((city) {
                            return DropdownMenuItem<String>(
                              value: city.value,
                              child: Text(
                                city.label!,
                                style: const TextStyle(color: Colors.white),
                              ),
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: Dropdowncontainer(
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                          hint: const Text(
                            'Cinema',
                            style: TextStyle(color: Colors.white),
                          ),
                          value: cinemaValue.isNotEmpty ? cinemaValue : null,
                          isExpanded: true,
                          iconEnabledColor: Colors.white,
                          dropdownColor: const Color(0xff29263e),
                          onChanged: (String? newValue) {
                            setState(() {
                              cinemaValue = newValue ??
                                  snapshot.data!.cinema!.first.value;
                              item = MovieResponsetories().getTimeForMovie(
                                  widget.slug, cityValue, cinemaValue);
                            });
                          },
                          items:
                              cinemas.map<DropdownMenuItem<String>>((cinema) {
                            return DropdownMenuItem<String>(
                              value: parse(utf8.decode(cinema.value.codeUnits))
                                  .body!
                                  .text,
                              child: Text(
                                cinema.label!,
                                style: const TextStyle(color: Colors.white),
                              ),
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              if (dateNumbers.isEmpty)
                Container(
                  padding: const EdgeInsets.only(top: 100),
                  child: const Center(
                    child: Text(
                      "Showtime aren't available",
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                )
              else ...[
                DateSelection(
                    dateNumbers: dateNumbers,
                    weekdays: weekdays,
                    selectedDateIndex: selectedDateIndex,
                    onDateSelected: (index) {
                      setState(() {
                        selectedDateIndex = index;
                        selectedHour.clear();
                      });
                    }),
                ShowtimesList(
                  days: days!,
                  selectedDateIndex: selectedDateIndex,
                  expandedIndex: expandedIndex,
                  selectedHour: selectedHour,
                  onExpand: (index) {
                    setState(() {
                      selectedHour.clear();
                      if (expandedIndex == index) {
                        expandedIndex = null;
                      } else {
                        expandedIndex = index;
                      }
                    });
                  },
                  onHourSelected: (key, index) {
                    setState(() {
                      selectedHour.clear();
                      selectedHour[key] = index;
                    });
                  },
                ),
              ],
            ],
          );
        }
      },
    );
  }
}
