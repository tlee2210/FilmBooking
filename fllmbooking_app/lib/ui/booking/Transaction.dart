import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../../data/models/PaymentRequest.dart';
import '../../data/models/WaterCorn.dart';
import '../../data/models/bookingData.dart';

class Transaction extends StatefulWidget {
  final ShowTimeTableResponse showTime;
  final PaymentRequest paymentRequest;
  final List<WaterCorn> waterCorndata;

  Transaction(
      {required this.waterCorndata,
      required this.paymentRequest,
      required this.showTime});

  @override
  State<Transaction> createState() => _TransactionState();
}

class _TransactionState extends State<Transaction> {
  late ShowTimeTableResponse _showTimeTableResponse;
  late PaymentRequest paymentRequestData;
  late List<WaterCorn> waterCorndata;

  String? _selectedPaymentMethod;

  @override
  void initState() {
    _showTimeTableResponse = widget.showTime;
    paymentRequestData = widget.paymentRequest;
    waterCorndata = widget.waterCorndata;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Transaction",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: const Color(0xff1f1d2b),
      ),
      backgroundColor: Color(0xff1f1d2b),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Image.network(
                  _showTimeTableResponse.image,
                  height: 100,
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _showTimeTableResponse.movieName,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        _showTimeTableResponse.movieFormat,
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        _showTimeTableResponse.cinemaName +
                            ' - ' +
                            _showTimeTableResponse.roomName,
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        _showTimeTableResponse.time +
                            ' - ' +
                            _showTimeTableResponse.date,
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Text(
              "Transaction Information",
              style:
                  TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 10),
            if (paymentRequestData.quantitySeat != null &&
                paymentRequestData.quantitySeat!.isNotEmpty) ...[
              Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${paymentRequestData.quantitySeat?.length ?? 0} X quantitySeat: ${paymentRequestData.quantitySeat?.join(', ')}',
                          style: const TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '${(paymentRequestData.quantitySeat?.length ?? 0) * _showTimeTableResponse.price} VND',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.orange,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const Divider(
                color: Colors.grey,
                thickness: 1,
                indent: 8,
                endIndent: 8,
              ),
            ],
            if (paymentRequestData.quantityDoubleSeat != null &&
                paymentRequestData.quantityDoubleSeat!.isNotEmpty) ...[
              Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${paymentRequestData.quantityDoubleSeat?.length ?? 0} X quantitySeat: ${paymentRequestData.quantityDoubleSeat?.join(', ')}',
                          style: const TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '${((paymentRequestData.quantityDoubleSeat?.length ?? 0) * (_showTimeTableResponse.price * 2 * 1.1)).toStringAsFixed(1)} VND',
                          style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.orange),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const Divider(
                color: Colors.grey,
                thickness: 1,
                indent: 8,
                endIndent: 8,
              ),
            ],
            if (paymentRequestData.quantityWater != null &&
                paymentRequestData.quantityWater!.isNotEmpty) ...[
              SizedBox(
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: paymentRequestData.quantityWater?.length,
                  itemBuilder: (context, index) {
                    WaterCorn item = waterCorndata.firstWhere(
                      (item) =>
                          item.id ==
                          paymentRequestData.quantityWater![index].id,
                    );

                    return Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              vertical: 8.0, horizontal: 8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    '${paymentRequestData.quantityWater![index].quantity ?? 0} X ${item.name ?? 'Unknown'}',
                                    style: const TextStyle(
                                        fontSize: 16, color: Colors.white),
                                  ),
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    '${((paymentRequestData.quantityWater![index].quantity ?? 0) * item.price).toStringAsFixed(1)} VND',
                                    style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.orange),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const Divider(
                          color: Colors.grey,
                          thickness: 1,
                          indent: 8,
                          endIndent: 8,
                        ),
                      ],
                    );
                  },
                ),
              ),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  onPressed: () {
                    print('========');
                    print('ok');
                    print('========');
                  },
                  icon: Icon(Icons.local_offer, color: Colors.orange),
                  label: Text(
                    "Promotion",
                    style: TextStyle(color: Colors.orange),
                  ),
                  style: ElevatedButton.styleFrom(
                    side: BorderSide(color: Colors.orange),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text("Total Price",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, color: Colors.white)),
                    Text(
                      '${paymentRequestData.totalPrice} VND',
                      style: const TextStyle(
                          fontSize: 16,
                          color: Colors.orange,
                          fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 10),
            const Divider(),
            const Text(
              "Payment Information",
              style:
                  TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
            ),
            RadioListTile(
              title: Row(
                children: [
                  Image.asset(
                    'assets/image/Icon-VNPAY-QR.jpg',
                    width: 30,
                    height: 30,
                  ),
                  const SizedBox(width: 10),
                  // Khoảng cách giữa hình ảnh và văn bản
                  const Text(
                    "VNPAY",
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
              value: "VNPAY",
              groupValue: _selectedPaymentMethod,
              onChanged: (value) {
                setState(() {
                  _selectedPaymentMethod = value as String?;
                });
              },
            ),
            RadioListTile(
              title: Row(
                children: [
                  Image.asset(
                    'assets/image/Icon-Paypal.jpg',
                    width: 30,
                    height: 30,
                  ),
                  const SizedBox(width: 10),
                  const Text(
                    "PayPal",
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
              value: "PayPal",
              groupValue: _selectedPaymentMethod,
              onChanged: (value) {
                setState(() {
                  _selectedPaymentMethod = value as String?;
                });
              },
            ),
            Spacer(),
            ElevatedButton(
              onPressed: () {
                // print('===========');
                // print('_selectedPaymentMethod: ' +
                //     _selectedPaymentMethod.toString());
                // print('===========');
                if(_selectedPaymentMethod != null && _selectedPaymentMethod!.isNotEmpty){
                  if (_selectedPaymentMethod!.contains('PayPal')) {
                    print("Người dùng đã chọn PayPal");
                  }
                  if (_selectedPaymentMethod!.contains('VNPAY')) {
                    print("Người dùng đã chọn VNPAY");
                  }
                } else {
                  Fluttertoast.showToast(
                    msg: 'Please select payment method!',
                    toastLength: Toast.LENGTH_LONG,
                    gravity: ToastGravity.TOP,
                    backgroundColor: Colors.red,
                    textColor: Colors.white,
                    fontSize: 16.0,
                  );
                }
              },
              child: Text("Pay"),
              style: ElevatedButton.styleFrom(
                minimumSize: Size(double.infinity, 50),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
