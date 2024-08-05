import 'package:flutter/material.dart';

class DateSelection extends StatelessWidget {
  final List<String> dateNumbers;
  final List<String> weekdays;
  final int selectedDateIndex;
  final Function(int) onDateSelected;

  const DateSelection({
    required this.dateNumbers,
    required this.weekdays,
    required this.selectedDateIndex,
    required this.onDateSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 70,
      margin: const EdgeInsets.only(top: 5, left: 5),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: dateNumbers.length,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () => onDateSelected(index),
            child: Container(
              width: 120,
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              margin: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                color: selectedDateIndex == index
                    ? const Color(0xff252836)
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.blue),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    weekdays[index],
                    style: TextStyle(
                      color: selectedDateIndex == index
                          ? Colors.cyanAccent
                          : Colors.white,
                    ),
                  ),
                  Text(
                    dateNumbers[index],
                    style: TextStyle(
                      color: selectedDateIndex == index
                          ? Colors.cyanAccent
                          : Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
