import 'dart:convert';

import 'package:fllmbooking_app/data/models/cinema_time_movie.dart';
import 'package:flutter/material.dart';
import 'package:html/parser.dart';
import 'package:intl/intl.dart';

import '../../main.dart';
import '../booking/SeatSelection.dart';

class ShowtimeItem extends StatelessWidget {
  final CinemaTimeMovie cinema;
  final bool isExpanded;
  final Map<String, int> selectedHour;
  final VoidCallback onExpand;
  final Function(String, int) onHourSelected;

  const ShowtimeItem({
    required this.cinema,
    required this.isExpanded,
    required this.selectedHour,
    required this.onExpand,
    required this.onHourSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      margin: const EdgeInsets.only(left: 5, right: 5, bottom: 5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                parse(utf8.decode(cinema.name!.codeUnits)).body!.text,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
              IconButton(
                icon: isExpanded
                    ? const Icon(Icons.keyboard_arrow_up)
                    : const Icon(Icons.keyboard_arrow_down),
                color: Colors.white,
                onPressed: onExpand,
              )
            ],
          ),
          if (isExpanded)
            ...cinema.movieFormat!.map((format) {
              final List<String> timeString = format.times!
                  .map((time) => DateFormat('kk:mm').format(time.time!))
                  .toList();
              final key = '${cinema.name}_${format.name}';
              return Column(
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
                      itemCount: timeString.length,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () {
                            onHourSelected(key, index);
                            final idRoom = format.times?[index].idRoom;
                            if (idRoom != null) {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => SeatSelectionScreen(
                                    id: idRoom,
                                  ),
                                ),
                              );
                            }

                            // print('======');
                            // print('Time: ${timeString[index]}');
                            // print(
                            //     'Room ID: ${format.times?[index].idRoom.toString()}');
                            // print('======');
                          },
                          // onTap: () => onHourSelected(key, index),
                          child: Container(
                            alignment: Alignment.center,
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            margin: const EdgeInsets.all(5),
                            decoration: BoxDecoration(
                              color: selectedHour[key] == index
                                  ? const Color(0xff252836)
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: Colors.blue),
                            ),
                            child: Text(
                              timeString[index],
                              style: TextStyle(
                                color: selectedHour[key] == index
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
              );
            }).toList(),
        ],
      ),
    );
  }
}
