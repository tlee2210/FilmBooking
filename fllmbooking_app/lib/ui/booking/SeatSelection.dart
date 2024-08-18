import 'package:flutter/material.dart';
import 'package:book_my_seat/book_my_seat.dart';
import 'package:flutter_svg/flutter_svg.dart' show SvgPicture;

import '../../data/models/SeatNumber.dart';
import '../../data/models/bookingData.dart';
import '../../data/responsitories/TokenRepositories.dart';
import '../../main.dart';
import '../ProgressBar/getProgressBar.dart';
import 'bookingViewModel.dart';

class SeatSelectionScreen extends StatefulWidget {
  final int id;

  SeatSelectionScreen({required this.id});

  @override
  _SeatSelectionScreen createState() => _SeatSelectionScreen();
}

class _SeatSelectionScreen extends State<SeatSelectionScreen> {
  Set<SeatNumber> selectedSeats = Set();

  int doubleSeatColumns = 8; // Số cặp ghế đôi
  int doubleSeatRows = 2; // Số hàng của ghế đôi

  late BookingViewModel _bookingViewModel;

  String _selectedTime = "10:30";
  String soldSeats = 'A1, A2, A3, H1-H2, H3-H4';
  late Set<String> soldSeatsSet;
  Set<String> quantitySeat = Set();
  Set<String> quantityDoubleSeat = Set();

  late List<int> splitIndices;
  late List<List<SeatState>> currentSeatsState;
  late List<List<SeatState>> currentDoubleSeatsState;
  ShowTimeTableResponse? _showTimeTableResponse;

  var token;
  late TokenRepositories tokenRepository;

  bool isLoading = true; // Thêm trạng thái loading

  @override
  void initState() {
    super.initState();

    _checkToken();
  }

  Future<void> _checkToken() async {
    tokenRepository = TokenRepositories();

    try {
    token = await tokenRepository.getToken();
    if (token != null) {
      _bookingViewModel = BookingViewModel();
      _bookingViewModel.getBookingTime(widget.id);
      _bookingViewModel.dataStream
          .listen((ShowTimeTableResponse BookingViewModel) {
        setState(() {
          _showTimeTableResponse = BookingViewModel;
        });
        _initializeSeats();
      });
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => const MyApp(
            selectedIndex: 3,
          ),
        ),
      );
    }
    } catch (e) {
      print('Error fetching token: $e');
    } finally {
      setState(() {
        isLoading = false; // Hoàn tất loading, cập nhật giao diện
      });
    }
  }

  void _initializeSeats() {
    if (_showTimeTableResponse == null ||
        _showTimeTableResponse!.movieformats.isEmpty) {
      print('Error: _showTimeTableResponse is null or empty');
      return;
    } else {
      int splitInterval = (_showTimeTableResponse!.room.seatColumns /
              (_showTimeTableResponse!.room.totalColumn))
          .floor();
      int remainingSeats = _showTimeTableResponse!.room.seatColumns %
          (_showTimeTableResponse!.room.totalColumn);

      splitIndices = [];
      int currentPosition = splitInterval;

      for (int i = 0; i < _showTimeTableResponse!.room.totalColumn; i++) {
        splitIndices.add(currentPosition + i);
        currentPosition += splitInterval + (remainingSeats > 0 ? 1 : 0);
        remainingSeats =
            remainingSeats > 0 ? remainingSeats - 1 : remainingSeats;
      }

      soldSeatsSet = soldSeats.split(', ').toSet();

      currentSeatsState = List.generate(
        _showTimeTableResponse!.room.seatRows,
        (row) => List.generate(
          _showTimeTableResponse!.room.seatColumns +
              _showTimeTableResponse!.room.totalColumn,
          (col) {
            String seatLabel =
                '${String.fromCharCode(65 + row)}${col + 1}'; // Tạo nhãn ghế như A1, B2,...
            if (splitIndices.contains(col)) {
              return SeatState.empty; // Khoảng cách giữa các ghế
            } else if (soldSeatsSet.contains(seatLabel)) {
              return SeatState.sold; // Ghế đã được bán
            } else {
              return SeatState.unselected; // Ghế chưa được chọn
            }
          },
        ),
      );

      currentDoubleSeatsState = List.generate(
        _showTimeTableResponse!.room.doubleSeatColumns,
        (row) => List.generate(
          _showTimeTableResponse!.room.doubleSeatRows,
          (col) {
            int baseCol = col * 2 + 1;
            String seatLabel =
                '${String.fromCharCode(65 + row + _showTimeTableResponse!.room.seatRows)}$baseCol-${String.fromCharCode(65 + row + _showTimeTableResponse!.room.seatRows)}${baseCol + 1}';

            if (soldSeatsSet.contains(seatLabel)) {
              return SeatState.sold; // Ghế đã được bán
            } else {
              return SeatState.unselected; // Ghế chưa được chọn
            }
          },
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      // Hiển thị màn hình chờ trong khi kiểm tra token
      return const Scaffold(
        backgroundColor: Color(0xff1f1d2b),
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    } else {
      return getBody();
    }
  }

  Widget getBody() {
    if (_showTimeTableResponse != null) {
      return Scaffold(
        appBar: AppBar(
          title: Text(
            _showTimeTableResponse!.cinemaName,
            style: const TextStyle(color: Colors.white),
          ),
          centerTitle: true,
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: const Color(0xff1f1d2b),
        ),
        backgroundColor: const Color(0xff1f1d2b),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                _showTimeTableResponse!.movieName,
                style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Text(_showTimeTableResponse!.movieFormat,
                          style: const TextStyle(
                              fontSize: 16, color: Colors.white)),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.orange,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          _showTimeTableResponse!.rules,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  DropdownButton<String>(
                    value: _selectedTime,
                    dropdownColor: const Color(0xff1f1d2b),
                    onChanged: (String? newValue) {
                      setState(() {
                        _selectedTime = newValue!;
                      });
                    },
                    items: <String>['10:30', '12:00', '14:30', '17:00', '19:30']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                          style: TextStyle(color: Colors.white),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              const Divider(),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SeatLayoutWidget(
                          onSeatStateChanged: (rowI, colI, seatState) {
                            String seatLabel =
                                '${String.fromCharCode(65 + rowI)}${colI + 1}';
                            setState(() {
                              if (seatState == SeatState.selected) {
                                selectedSeats
                                    .add(SeatNumber(rowI: rowI, colI: colI));
                                quantitySeat.add(seatLabel);
                              } else {
                                selectedSeats
                                    .remove(SeatNumber(rowI: rowI, colI: colI));
                                quantitySeat.remove(seatLabel);
                              }
                            });
                          },
                          stateModel: SeatLayoutStateModel(
                            pathDisabledSeat:
                                'assets/seats/svg_disabled_bus_seat.svg',
                            pathSelectedSeat:
                                'assets/seats/svg_selected_bus_seats.svg',
                            pathSoldSeat: 'assets/seats/svg_sold_bus_seat.svg',
                            pathUnSelectedSeat:
                                'assets/seats/svg_unselected_bus_seat.svg',
                            rows: _showTimeTableResponse!.room.seatRows,
                            cols: _showTimeTableResponse!.room.seatColumns +
                                _showTimeTableResponse!.room.totalColumn,
                            seatSvgSize: 20,
                            currentSeatsState: currentSeatsState,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SeatLayoutWidget(
                          onSeatStateChanged: (rowI, colI, seatState) {
                            int baseCol = colI * 2 + 1;
                            String seatLabel =
                                '${String.fromCharCode(65 + rowI + _showTimeTableResponse!.room.seatRows)}$baseCol-${String.fromCharCode(65 + rowI + _showTimeTableResponse!.room.seatRows)}${baseCol + 1}';

                            setState(() {
                              var row =
                                  rowI + _showTimeTableResponse!.room.seatRows;
                              if (seatState == SeatState.selected) {
                                selectedSeats
                                    .add(SeatNumber(rowI: row, colI: colI));
                                quantityDoubleSeat.add(seatLabel);
                              } else {
                                selectedSeats
                                    .remove(SeatNumber(rowI: row, colI: colI));
                                quantityDoubleSeat.remove(seatLabel);
                              }
                            });
                          },
                          stateModel: SeatLayoutStateModel(
                            pathDisabledSeat:
                                'assets/seats/svg_couple_disabled_bus_seat.svg',
                            pathSelectedSeat:
                                'assets/seats/svg_couple_selected_bus_seats.svg',
                            pathSoldSeat:
                                'assets/seats/svg_couple_sold_bus_seat.svg',
                            pathUnSelectedSeat:
                                'assets/seats/svg_couple_unselected_bus_seat.svg',
                            rows:
                                _showTimeTableResponse!.room.doubleSeatColumns,
                            cols: _showTimeTableResponse!.room.doubleSeatRows,
                            seatSvgSize: 20,
                            currentSeatsState: currentDoubleSeatsState,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const Divider(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (quantitySeat.isNotEmpty)
                        Text(
                          '${quantitySeat.length}x ghế: ${quantitySeat.map((seat) => seat.toString()).join(', ')}',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      const SizedBox(height: 4),
                      if (quantityDoubleSeat.isNotEmpty)
                        Text(
                          '${quantityDoubleSeat.length}x ghế đôi: ${quantityDoubleSeat.map((seat) => seat.toString()).join(', ')}',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      const Text(
                        'Tổng Cộng: 225,000đ',
                        style: TextStyle(
                            fontSize: 16,
                            color: Colors.orange,
                            fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    onPressed: () {
                      // Xử lý khi nhấn nút Tiếp tục
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.orange,
                      padding: const EdgeInsets.symmetric(
                          horizontal: 24, vertical: 12),
                      textStyle: const TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    child: const Text(
                      'Tiếp tục',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    } else {
      return getProgressBar();
    }
  }

  Widget _buildSeatType(String label, Color color) {
    return Column(
      children: [
        Container(
          width: 24,
          height: 24,
          color: color,
        ),
        const SizedBox(height: 4),
        Text(label),
      ],
    );
  }
}
