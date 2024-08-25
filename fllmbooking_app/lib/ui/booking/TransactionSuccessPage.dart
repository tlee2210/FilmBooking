import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../data/models/BookingSuccessInfo.dart';
import '../../main.dart';

class TransactionSuccessPage extends StatefulWidget {
  final BookingSuccessInfo bookingSuccessInfo;

  TransactionSuccessPage({required this.bookingSuccessInfo});

  @override
  State<TransactionSuccessPage> createState() => _TransactionSuccessPageState();
}

class _TransactionSuccessPageState extends State<TransactionSuccessPage> {
  late BookingSuccessInfo _bookingSuccessInfo;

  @override
  void initState() {
    _bookingSuccessInfo = widget.bookingSuccessInfo;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue[50],
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 30),
              Text(
                'Confirm transaction',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
              SizedBox(height: 30),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black12,
                      blurRadius: 10,
                      spreadRadius: 5,
                    )
                  ],
                ),
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Icon(
                      Icons.check_circle,
                      color: Colors.blue,
                      size: 60,
                    ),
                    SizedBox(height: 20),
                    Text(
                      'Ticket booking successful',
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),
                    SizedBox(height: 20),
                    CustomPaint(
                      size: Size(double.infinity, 1),
                      painter: DottedLinePainter(),
                    ),
                    SizedBox(height: 20),
                    _buildInfoRow('Payment Id', '${_bookingSuccessInfo.paymentId}'),
                    _buildInfoRow('Order Id', '${_bookingSuccessInfo.orderId}'),
                    SizedBox(height: 20),
                    CustomPaint(
                      size: Size(double.infinity, 1),
                      painter: DottedLinePainter(),
                    ),
                    SizedBox(height: 10),
                    _buildInfoRow(
                        'Movie name', _bookingSuccessInfo.movieName.toString()),
                    _buildInfoRow(
                        'Cinema', _bookingSuccessInfo.cinemaName.toString()),
                    if (_bookingSuccessInfo.quantitySeat != null &&
                        _bookingSuccessInfo.quantitySeat!.isNotEmpty)
                      _buildInfoRow(
                          'Seat', _bookingSuccessInfo.quantitySeat.toString()),
                    if (_bookingSuccessInfo.quantityDoubleSeat != null &&
                        _bookingSuccessInfo.quantityDoubleSeat!.isNotEmpty)
                      _buildInfoRow('Double Seat',
                          _bookingSuccessInfo.quantityDoubleSeat.toString()),
                    _buildInfoRow(
                        'Time', '${DateFormat('HH:mm').format(_bookingSuccessInfo.time!)}, Day ${DateFormat('dd-MM-yyy').format(_bookingSuccessInfo.date!)}'),
                    SizedBox(height: 10),
                    CustomPaint(
                      size: Size(double.infinity, 1),
                      painter: DottedLinePainter(),
                    ),
                    SizedBox(height: 10),
                    if (_bookingSuccessInfo.bookingWaterCorn!.isNotEmpty)
                      ..._bookingSuccessInfo.bookingWaterCorn!.map((item) =>
                          _buildInfoRow('${item.name}', 'Quantity ${item.quantity}')
                      ).toList(),
                    SizedBox(height: 10),
                    _buildInfoRow(
                        'Total Price', '${_bookingSuccessInfo.totalPrice} VND'),
                  ],
                ),
              ),
              Spacer(),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => MyApp(),
                      ),
                    );
                  },
                  child: const Text(
                    'Back to home page',
                    style: TextStyle(color: Colors.white),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xff12CDD9),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 16, color: Colors.grey[700]),
          ),
          Text(
            value,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}

class DottedLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 2;

    double dashWidth = 8, dashSpace = 4, startX = 0;
    while (startX < size.width) {
      canvas.drawLine(Offset(startX, 0), Offset(startX + dashWidth, 0), paint);
      startX += dashWidth + dashSpace;
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
