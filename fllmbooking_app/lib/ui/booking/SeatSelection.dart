import 'package:flutter/material.dart';
import 'package:book_my_seat/book_my_seat.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';

import '../../data/models/PaymentRequest.dart';
import '../../data/models/SeatNumber.dart';
import '../../data/models/WaterCorn.dart';
import '../../data/models/bookingData.dart';
import '../../data/models/home_movie_format_response.dart';
import '../../data/models/home_time_and_room_response.dart';
import '../../data/responsitories/TokenRepositories.dart';
import '../../main.dart';
import '../ProgressBar/getProgressBar.dart';
import 'ComboSelectionScreen.dart';
import 'bookingViewModel.dart';

class SeatSelectionScreen extends StatefulWidget {
  final int id;

  SeatSelectionScreen({required this.id});

  @override
  _SeatSelectionScreen createState() => _SeatSelectionScreen();
}

class _SeatSelectionScreen extends State<SeatSelectionScreen> {
  late BookingViewModel _bookingViewModel;

  late String _selectedTime;
  String soldSeats = '';
  late Set<String> soldSeatsSet;
  Set<String> quantitySeat = Set();
  Set<String> quantityDoubleSeat = Set();

  late List<int> splitIndices;
  late List<List<SeatState>> currentSeatsState;
  late List<List<SeatState>> currentDoubleSeatsState;
  ShowTimeTableResponse? _showTimeTableResponse;
  List<WaterCorn> waterCorndata = [];

  late var token;
  late TokenRepositories tokenRepository;

  bool isLoading = true;

  late PaymentRequest paymentRequest = PaymentRequest();

  @override
  void initState() {
    super.initState();
    soldSeatsSet = {};
    currentSeatsState = [[]];
    currentDoubleSeatsState = [[]];
    _checkToken(widget.id);
  }

  Future<void> _checkToken(int id) async {
    tokenRepository = TokenRepositories();
    try {
      token = await tokenRepository.getToken();
      if (token != null) {
        _bookingViewModel = BookingViewModel();

        _bookingViewModel.getBookingTime(id);
        _bookingViewModel.dataStream
            .listen((ShowTimeTableResponse BookingViewModel) {
          setState(() {
            _showTimeTableResponse = BookingViewModel;
            _selectedTime = BookingViewModel.time;
          });

          _bookingViewModel.getSeatBooked(id);

          _bookingViewModel.waterCornStream.listen((waterCorns) {
            setState(() {
              waterCorndata = waterCorns;
            });
          });

          _bookingViewModel.SeatBooked.listen((seatBooked) {
            setState(() {
              soldSeats = seatBooked;
              soldSeatsSet = seatBooked.split(', ').toSet();
            });

            _initializeSeats();
          });
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
      await e.toString().replaceFirst('Exception: ', '');
    } finally {
      setState(() {
        isLoading = false;
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
        splitIndices.add(currentPosition + i + 1);
        currentPosition += splitInterval + (remainingSeats > 0 ? 1 : 0);
        remainingSeats =
            remainingSeats > 0 ? remainingSeats - 1 : remainingSeats;
      }

      currentSeatsState = List.generate(
        _showTimeTableResponse!.room.seatRows,
        (row) => List.generate(
          _showTimeTableResponse!.room.seatColumns +
              _showTimeTableResponse!.room.totalColumn,
          (col) {
            if (splitIndices.contains(col)) {
              return SeatState.empty;
            }

            int adjustedCol =
                col - splitIndices.where((index) => index <= col).length;
            String seatLabel =
                '${String.fromCharCode(65 + row)}${adjustedCol + 1}';

            if (soldSeatsSet.contains(seatLabel)) {
              return SeatState.sold;
            } else {
              return SeatState.unselected;
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
              return SeatState.sold;
            } else {
              return SeatState.unselected;
            }
          },
        ),
      );
    }
  }

  void _showSelectModal(List<HomeMovieFormatResponse> movieFormats) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          color: const Color(0xff1f1d2b),
          child: ListView.builder(
            itemCount: movieFormats.length,
            itemBuilder: (BuildContext context, int index) {
              final format = movieFormats[index];
              return ExpansionTile(
                title: Text(
                  format.name ?? '',
                  style: const TextStyle(color: Colors.white),
                ),
                children: format.times
                        ?.map<Widget>((HomeTimeAndRoomResponse timeAndRoom) {
                      return ListTile(
                        title: Text(
                          DateFormat.Hm().format(timeAndRoom.time!),
                          style: const TextStyle(color: Colors.white),
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => SeatSelectionScreen(
                                id: timeAndRoom.idRoom!,
                              ),
                            ),
                          );
                        },
                      );
                    }).toList() ??
                    [],
              );
            },
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
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
    if (isLoading) {
      return const Scaffold(
        backgroundColor: Color(0xff1f1d2b),
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_showTimeTableResponse == null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text(
            'No Show Time Data',
            style: TextStyle(color: Colors.white),
          ),
          centerTitle: true,
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: const Color(0xff1f1d2b),
        ),
        backgroundColor: const Color(0xff1f1d2b),
        body: const Center(
          child: Text(
            'No data available for the selected show time.',
            style: TextStyle(color: Colors.white),
          ),
        ),
      );
    }

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
                    Text(
                      _showTimeTableResponse!.movieFormat,
                      style: const TextStyle(fontSize: 16, color: Colors.white),
                    ),
                    const SizedBox(width: 8),
                    if (_showTimeTableResponse!.rules != null &&
                        _showTimeTableResponse!.rules.isNotEmpty)
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
                OutlinedButton(
                  onPressed: () {
                    _showSelectModal(_showTimeTableResponse!.movieformats);
                  },
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Colors.grey),
                    backgroundColor: const Color(0xff1f1d2b),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        _selectedTime,
                        style: const TextStyle(color: Colors.white),
                      ),
                      const Icon(
                        Icons.arrow_drop_down,
                        color: Colors.grey,
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const Divider(),
            const Row(
              children: <Widget>[
                Expanded(
                  child: Divider(
                    color: Colors.orange,
                    thickness: 2,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 40),
                  child: Text(
                    'Screen',
                    style: TextStyle(
                      color: Colors.orange,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Expanded(
                  child: Divider(
                    color: Colors.orange,
                    thickness: 2,
                  ),
                ),
              ],
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 10),
                  Padding(
                    padding: EdgeInsets.only(left: 5),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        if (currentSeatsState.isNotEmpty &&
                            currentSeatsState[0].isNotEmpty)
                          SeatLayoutWidget(
                            onSeatStateChanged: (rowI, colI, seatState) {
                              if (seatState == SeatState.selected &&
                                  quantitySeat.length +
                                          quantityDoubleSeat.length >=
                                      8) {
                                Fluttertoast.showToast(
                                  msg:
                                      'You can only select a maximum of 8 seats!',
                                  toastLength: Toast.LENGTH_LONG,
                                  gravity: ToastGravity.TOP,
                                  backgroundColor: Colors.red,
                                  textColor: Colors.white,
                                  fontSize: 16.0,
                                );
                                return;
                              } else {
                                double price = _showTimeTableResponse!.price;
                                String seatLabel =
                                    '${String.fromCharCode(65 + rowI)}${colI + 1}';

                                setState(() {
                                  if (seatState == SeatState.selected &&
                                      quantitySeat.length +
                                              quantityDoubleSeat.length <
                                          8) {
                                    paymentRequest.totalPrice =
                                        (paymentRequest.totalPrice ?? 0) +
                                            price;
                                    quantitySeat.add(seatLabel);
                                  } else {
                                    if ((paymentRequest.totalPrice ?? 0) >=
                                        price) {
                                      paymentRequest.totalPrice =
                                          (paymentRequest.totalPrice ?? 0) -
                                              price;
                                    } else {
                                      paymentRequest.totalPrice = 0.0;
                                    }
                                    quantitySeat.remove(seatLabel);
                                  }
                                });
                              }
                            },
                            stateModel: SeatLayoutStateModel(
                              pathDisabledSeat:
                                  'assets/seats/svg_disabled_bus_seat.svg',
                              pathSelectedSeat:
                                  'assets/seats/svg_selected_bus_seats.svg',
                              pathSoldSeat:
                                  'assets/seats/svg_sold_bus_seat.svg',
                              pathUnSelectedSeat:
                                  'assets/seats/svg_unselected_bus_seat.svg',
                              rows: _showTimeTableResponse!.room.seatRows,
                              cols: _showTimeTableResponse!.room.seatColumns,
                              seatSvgSize: 20,
                              currentSeatsState: currentSeatsState,
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (currentDoubleSeatsState.isNotEmpty &&
                          currentDoubleSeatsState[0].isNotEmpty)
                        Align(
                          alignment: Alignment.center,
                          child: SeatLayoutWidget(
                            onSeatStateChanged: (rowI, colI, seatState) {
                              if (seatState == SeatState.selected &&
                                  quantitySeat.length +
                                          quantityDoubleSeat.length >=
                                      8) {
                                Fluttertoast.showToast(
                                  msg:
                                      'You can only select a maximum of 8 seats!',
                                  toastLength: Toast.LENGTH_LONG,
                                  gravity: ToastGravity.TOP,
                                  backgroundColor: Colors.red,
                                  textColor: Colors.white,
                                  fontSize: 16.0,
                                );
                                return;
                              } else {
                                double price = _showTimeTableResponse!.price;
                                double finalPrice = (price * 2) * 1.1;

                                int baseCol = colI * 2 + 1;
                                String seatLabel =
                                    '${String.fromCharCode(65 + rowI + _showTimeTableResponse!.room.seatRows)}$baseCol-${String.fromCharCode(65 + rowI + _showTimeTableResponse!.room.seatRows)}${baseCol + 1}';

                                setState(() {
                                  var row = rowI +
                                      _showTimeTableResponse!.room.seatRows;
                                  if (seatState == SeatState.selected &&
                                      quantitySeat.length +
                                              quantityDoubleSeat.length <
                                          8) {
                                    quantityDoubleSeat.add(seatLabel);
                                    paymentRequest.totalPrice =
                                        (paymentRequest.totalPrice ?? 0) +
                                            finalPrice;
                                  } else {
                                    if ((paymentRequest.totalPrice ?? 0) >=
                                        finalPrice) {
                                      paymentRequest.totalPrice =
                                          (paymentRequest.totalPrice ?? 0) -
                                              finalPrice;
                                    } else {
                                      paymentRequest.totalPrice = 0;
                                    }
                                    quantityDoubleSeat.remove(seatLabel);
                                  }
                                });
                              }
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
                              rows: _showTimeTableResponse!
                                  .room.doubleSeatColumns,
                              cols: _showTimeTableResponse!.room.doubleSeatRows,
                              seatSvgSize: 20,
                              currentSeatsState: currentDoubleSeatsState,
                            ),
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
                Flexible(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (quantitySeat.isNotEmpty)
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Text(
                            '${quantitySeat.length}x Seat: ${quantitySeat.map((seat) => seat.toString()).join(', ')}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      const SizedBox(height: 4),
                      if (quantityDoubleSeat.isNotEmpty)
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Text(
                            '${quantityDoubleSeat.length}x DoubleSeat: ${quantityDoubleSeat.map((seat) => seat.toString()).join(', ')}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                            softWrap: false,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      Text(
                        'Total: ${paymentRequest.totalPrice?.toStringAsFixed(2) ?? '0.00'} VND',
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.orange,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    if (quantitySeat.length + quantityDoubleSeat.length > 0) {
                      paymentRequest.quantityDoubleSeat =
                          quantityDoubleSeat.toList();
                      paymentRequest.quantitySeat = quantitySeat.toList();
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ComboSelectionScreen(
                            waterCorndata: waterCorndata,
                            paymentRequest: paymentRequest,
                            showTime: _showTimeTableResponse!,
                          ),
                        ),
                      );
                    } else {
                      Fluttertoast.showToast(
                        msg: 'Please select at least one seat!',
                        toastLength: Toast.LENGTH_LONG,
                        gravity: ToastGravity.TOP,
                        backgroundColor: Colors.red,
                        textColor: Colors.white,
                        fontSize: 16.0,
                      );
                    }
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
                    'Continue',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
