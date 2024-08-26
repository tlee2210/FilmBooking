import 'package:flutter/material.dart';

// Widget getProgressBar() {
//   return Container(
//     width: 100.0,
//     height: 100.0,
//     decoration: BoxDecoration(
//       color: Colors.blue,
//       borderRadius: BorderRadius.circular(10.0),
//     ),
//     child: const Center(
//       child: CircularProgressIndicator(),
//     ),
//   );
// }

Widget getProgressBar() {
  return Center(
    child: Container(
      width: 100.0,
      height: 100.0,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0), // Bo góc nếu cần
      ),
     child: const Center(
       child: CircularProgressIndicator(),
     ),
    ),
  );
}
