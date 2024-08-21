import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';

import '../../data/models/BookingWaterRequest.dart';
import '../../data/models/PaymentRequest.dart';
import '../../data/models/WaterCorn.dart';
import '../../data/models/bookingData.dart';
import 'Transaction.dart';

class ComboSelectionScreen extends StatefulWidget {
  final List<WaterCorn> waterCorndata;
  final PaymentRequest paymentRequest;
  final ShowTimeTableResponse showTime;

  ComboSelectionScreen(
      {required this.waterCorndata,
      required this.paymentRequest,
      required this.showTime});

  @override
  _ComboSelectionScreenState createState() => _ComboSelectionScreenState();
}

class _ComboSelectionScreenState extends State<ComboSelectionScreen> {
  List<BookingWaterRequest> selectedCombos = [];
  late List<WaterCorn> waterCorndata;
  late PaymentRequest paymentRequestData;

  @override
  void initState() {
    super.initState();
    waterCorndata = widget.waterCorndata; // Lấy dữ liệu từ widget
    paymentRequestData = widget.paymentRequest; // Lấy payment request từ widget
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Select Combo',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Color(0xff1f1d2b),
        centerTitle: true,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      backgroundColor: const Color(0xff1f1d2b),
      body: Column(
        children: [
          // Danh sách combo
          Expanded(
            child: ListView.builder(
              itemCount: waterCorndata.length,
              itemBuilder: (context, index) {
                final combo = waterCorndata[index];
                return comboCard(combo);
              },
            ),
          ),
          const Divider(color: Colors.white),
          if (selectedCombos.isNotEmpty)
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: selectedCombos.map((combo) {
                  final waterCorn =
                      waterCorndata.firstWhere((item) => item.id == combo.id);
                  return Container(
                    margin: const EdgeInsets.only(right: 10),
                    child: Row(
                      children: [
                        Image.network(
                          waterCorn.image,
                          width: 50,
                          height: 50,
                          fit: BoxFit.cover,
                        ),
                        const SizedBox(width: 8),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${combo.quantity}x ${waterCorn.name}',
                              style: const TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, color: Colors.red),
                          onPressed: () {
                            setState(() {
                              paymentRequestData.totalPrice =
                                  (paymentRequestData.totalPrice ?? 0) -
                                      waterCorn.price * combo.quantity!;
                              selectedCombos.remove(combo);
                            });
                          },
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ),
            ),
          // Giỏ hàng
          Container(
            padding: EdgeInsets.all(16),
            color: Color(0xff1f1d2b),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (paymentRequestData.quantitySeat != null &&
                          paymentRequestData.quantitySeat!.isNotEmpty)
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Text(
                            '${paymentRequestData.quantitySeat!.length}x Seat: ${paymentRequestData.quantitySeat!.join(', ')}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      const SizedBox(height: 4),
                      if (paymentRequestData.quantityDoubleSeat != null &&
                          paymentRequestData.quantityDoubleSeat!.isNotEmpty)
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Text(
                            '${paymentRequestData.quantityDoubleSeat!.length}x DoubleSeat: ${paymentRequestData.quantityDoubleSeat!.join(', ')}',
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
                        'Total: ${paymentRequestData.totalPrice?.toStringAsFixed(2) ?? '0.00'} VND',
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

                    // selectedCombos
                    paymentRequestData.quantityWater = selectedCombos;
                    // Transaction
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Transaction(
                        waterCorndata: widget.waterCorndata,
                        showTime: widget.showTime,
                        paymentRequest: paymentRequestData,
                      )),
                    );
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
          ),
        ],
      ),
    );
  }

  // Card cho mỗi combo
  Widget comboCard(WaterCorn waterCorn) {
    // Tìm xem combo này đã được chọn chưa
    BookingWaterRequest? selectedCombo = selectedCombos.firstWhere(
        (combo) => combo.id == waterCorn.id,
        orElse: () => BookingWaterRequest(id: waterCorn.id, quantity: 0));

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.network(
              waterCorn.image,
              width: double.infinity,
              height: 150,
              fit: BoxFit.cover,
            ),
            const SizedBox(height: 10),
            Text(
              waterCorn.name,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            // Text(
            //   waterCorn.description,
            //   style: const TextStyle(color: Colors.grey),
            // ),
            Html(
              data: waterCorn.description,
              style: {
                "body": Style(
                  color: Colors.grey,
                ),
              },
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Price: ${waterCorn.price.toStringAsFixed(0)}đ',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.remove, color: Colors.grey),
                      onPressed: () {
                        if (selectedCombo.quantity! > 0) {
                          setState(() {
                            selectedCombo.quantity =
                                selectedCombo.quantity! - 1;
                            paymentRequestData.totalPrice =
                                (paymentRequestData.totalPrice ?? 0) -
                                    waterCorn.price;
                            if (selectedCombo.quantity == 0) {
                              selectedCombos.remove(selectedCombo);
                            }
                          });
                        }
                      },
                    ),
                    Text('${selectedCombo.quantity}'),
                    IconButton(
                      icon: Icon(Icons.add, color: Colors.orange),
                      onPressed: () {
                        setState(() {
                          if (selectedCombos.contains(selectedCombo)) {
                            selectedCombo.quantity =
                                selectedCombo.quantity! + 1;
                          } else {
                            selectedCombo.quantity = 1;
                            selectedCombos.add(selectedCombo);
                          }
                          // paymentRequestData.totalPrice += waterCorn.price;
                          paymentRequestData.totalPrice =
                              (paymentRequestData.totalPrice ?? 0) +
                                  waterCorn.price;
                        });
                      },
                    ),
                  ],
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
