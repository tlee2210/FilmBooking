import 'package:flutter/material.dart';

class MovieTabs extends StatefulWidget {
  final int tabIndex;
  final Function(int) onTabSelect;
  final List<String> tabs;

  MovieTabs(
      {required this.tabIndex, required this.onTabSelect, required this.tabs});

  @override
  _TabsWidgetState createState() => _TabsWidgetState();
}

class _TabsWidgetState extends State<MovieTabs> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: List.generate(widget.tabs.length, (index) {
        return GestureDetector(
          onTap: () => widget.onTabSelect(index),
          child: Container(
            padding:
                const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
            decoration: BoxDecoration(
              color: widget.tabIndex == index
                  ? Colors.cyanAccent.withOpacity(0.1)
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(16.0),
            ),
            child: Text(
              widget.tabs[index],
              style: TextStyle(
                color:
                    widget.tabIndex == index ? Colors.cyanAccent : Colors.white,
              ),
            ),
          ),
        );
      }),
    );
  }
}
