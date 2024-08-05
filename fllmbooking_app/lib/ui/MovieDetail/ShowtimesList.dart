import 'package:fllmbooking_app/data/models/booking_show_time_response.dart';
import 'package:fllmbooking_app/ui/MovieDetail/ShowtimeItem.dart';
import 'package:flutter/material.dart';

class ShowtimesList extends StatelessWidget {
  final List<bookingShowTimeResponse> days;
  final int selectedDateIndex;
  final int? expandedIndex;
  final Map<String, int> selectedHour;
  final Function(int) onExpand;
  final Function(String, int) onHourSelected;

  const ShowtimesList({
    required this.days,
    required this.selectedDateIndex,
    required this.expandedIndex,
    required this.selectedHour,
    required this.onExpand,
    required this.onHourSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 400,
      child: ListView.builder(
        itemCount: days[selectedDateIndex].cinemaTimeMovies!.length,
        itemBuilder: (context, index) {
          final cinema = days[selectedDateIndex].cinemaTimeMovies![index];
          return ShowtimeItem(
            cinema: cinema,
            isExpanded: expandedIndex == index,
            selectedHour: selectedHour,
            onExpand: () => onExpand(index),
            onHourSelected: onHourSelected,
          );
        },
      ),
    );
  }
}
