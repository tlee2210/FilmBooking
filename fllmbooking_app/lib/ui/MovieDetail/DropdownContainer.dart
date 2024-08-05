import 'package:flutter/material.dart';

class Dropdowncontainer extends StatelessWidget {
  final Widget child;
  const Dropdowncontainer({required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 45,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          border: Border.all(color: Colors.white, width: 1)),
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: child,
    );
  }
}
