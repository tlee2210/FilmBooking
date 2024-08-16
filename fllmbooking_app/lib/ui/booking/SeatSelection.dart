import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart' show SvgPicture;
import 'package:book_my_seat/book_my_seat.dart';

import 'Seat.dart';

class SeatSelectionScreen extends StatefulWidget {
  @override
  _SeatSelectionScreenState createState() => _SeatSelectionScreenState();
}

class _SeatSelectionScreenState extends State<SeatSelectionScreen> {
  Set<SeatNumber> selectedSeats = Set();

  int seatColumns = 14; // Tổng số cột trong bố cục ghế
  int seatRows = 7; // Tổng số hàng trong bố cục ghế
  int totalColumns = 2; // Số cột dành cho khoảng cách không có ghế
  int doubleSeatColumns = 7; // Số cặp ghế đôi
  int doubleSeatRows = 2; // Số hàng của ghế đôi

  late List<int> splitIndices;
  late List<List<SeatState>> currentSeatsState;
  late List<List<SeatState>> currentDoubleSeatsState;

  @override
  void initState() {
    super.initState();

    int splitInterval = (seatColumns / (totalColumns)).floor();
    int remainingSeats = seatColumns % (totalColumns);

    splitIndices = [];
    int currentPosition = splitInterval;

    for (int i = 0; i < totalColumns; i++) {
      splitIndices.add(currentPosition + i);
      currentPosition += splitInterval + (remainingSeats > 0 ? 1 : 0);
      remainingSeats = remainingSeats > 0 ? remainingSeats - 1 : remainingSeats;
    }

    currentSeatsState = List.generate(
      seatRows,
      (row) => List.generate(
        seatColumns + totalColumns, // Tổng số cột bao gồm cả khoảng cách
        (col) {
          if (splitIndices.contains(col)) {
            return SeatState.empty; // Khoảng cách giữa các ghế
          } else {
            return SeatState.unselected; // Ghế chưa được chọn
          }
          if (splitIndices.contains(col) || splitIndices.contains(col - 1)) {
            return SeatState.empty;
          } else {
            return SeatState.unselected; // Ghế chưa được chọn
          }
        },
      ),
    );

    currentDoubleSeatsState = List.generate(
      doubleSeatRows, // Số hàng
      (row) => List.generate(
        doubleSeatColumns, // Số cột
        (col) {
          return SeatState.unselected; // Ghế chưa được chọn
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chọn Ghế'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SeatLayoutWidget(
                    onSeatStateChanged: (rowI, colI, seatState) {
                      ScaffoldMessenger.of(context).hideCurrentSnackBar();
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: seatState == SeatState.selected
                              ? Text("Selected Seat[$rowI][$colI]")
                              : Text("De-selected Seat[$rowI][$colI]"),
                        ),
                      );
                      if (seatState == SeatState.selected) {
                        selectedSeats.add(SeatNumber(rowI: rowI, colI: colI));
                      } else {
                        selectedSeats
                            .remove(SeatNumber(rowI: rowI, colI: colI));
                      }
                    },
                    stateModel: SeatLayoutStateModel(
                      pathDisabledSeat:
                          'assets/seats/svg_disabled_bus_seat.svg',
                      pathSelectedSeat:
                          'assets/seats/svg_selected_bus_seats.svg',
                      pathSoldSeat: 'assets/seats/svg_sold_bus_seat.svg',
                      pathUnSelectedSeat:
                          'assets/seats/svg_unselected_bus_seat.svg',
                      rows: seatRows,
                      cols: seatColumns + totalColumns,
                      seatSvgSize: 20,
                      currentSeatsState: currentSeatsState,
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SeatLayoutWidget(
                    onSeatStateChanged: (rowI, colI, seatState) {
                      ScaffoldMessenger.of(context).hideCurrentSnackBar();
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: seatState == SeatState.selected
                              ? Text("Selected Seat[$rowI][$colI]")
                              : Text("De-selected Seat[$rowI][$colI]"),
                        ),
                      );
                      if (seatState == SeatState.selected) {
                        selectedSeats.add(SeatNumber(rowI: rowI, colI: colI));
                      } else {
                        selectedSeats
                            .remove(SeatNumber(rowI: rowI, colI: colI));
                      }
                    },
                    stateModel: SeatLayoutStateModel(
                      pathDisabledSeat:
                          'assets/seats/svg_couple_disabled_bus_seat.svg',
                      pathSelectedSeat:
                          'assets/seats/svg_couple_selected_bus_seats.svg',
                      pathSoldSeat: 'assets/seats/svg_couple_sold_bus_seat.svg',
                      pathUnSelectedSeat:
                          'assets/seats/svg_couple_unselected_bus_seat.svg',
                      rows: doubleSeatRows,
                      cols: doubleSeatColumns,
                      seatSvgSize: 20,
                      currentSeatsState: currentDoubleSeatsState,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class SeatNumber {
  final int rowI;
  final int colI;

  const SeatNumber({required this.rowI, required this.colI});

  @override
  bool operator ==(Object other) {
    return rowI == (other as SeatNumber).rowI &&
        colI == (other as SeatNumber).colI;
  }

  @override
  int get hashCode => rowI.hashCode;

  @override
  String toString() {
    return '[$rowI][$colI]';
  }
}
