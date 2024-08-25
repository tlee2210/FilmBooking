import 'package:fllmbooking_app/data/models/VoucherRequest.dart';
import 'package:fllmbooking_app/data/models/VoucherResponse.dart';
import 'package:flutter/material.dart';
import 'package:flutter_paypal_payment/flutter_paypal_payment.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:developer';

import '../../data/models/BookingSuccessInfo.dart';
import '../../data/models/PaymentRequest.dart';
import '../../data/models/WaterCorn.dart';
import '../../data/models/bookingData.dart';
import '../ProgressBar/getProgressBar.dart';
import 'TransactionSuccessPage.dart';
import 'bookingViewModel.dart';

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
  late BookingViewModel _bookingViewModel;

  late ShowTimeTableResponse _showTimeTableResponse;
  late PaymentRequest paymentRequestData;
  late List<WaterCorn> waterCorndata;
  double calculateDiscount = 0;
  final TextEditingController promotionController = TextEditingController();
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  bool isloading = false;
  String? _selectedPaymentMethod;
  String? _errorMessage;
  late VoucherResponse voucherAdd = VoucherResponse();

  @override
  void initState() {
    _bookingViewModel = BookingViewModel();
    _showTimeTableResponse = widget.showTime;
    paymentRequestData = widget.paymentRequest;
    waterCorndata = widget.waterCorndata;
    super.initState();
  }

  Future<void> handleVoucher(VoucherRequest code) async {
    try {
      VoucherResponse? result = await _bookingViewModel.applyVoucher(code);
      // VoucherResponse? result = await _bookingViewModel.applyVoucher(code);
      if (result != null) {
        if (result.discountType == "PERCENTAGE" &&
            result.discountValue != null) {
          var discount =
              (paymentRequestData.totalPrice! * result.discountValue!) / 100;
          if (discount > result.maxDiscount!) {
            discount = result.maxDiscount!;
          }
          setState(() {
            // paymentRequestData.totalPrice =
            //     paymentRequestData.totalPrice! + calculateDiscount - discount;
            calculateDiscount = discount;
            voucherAdd = result;
          });
        } else if (result.discountType == "FIXED") {
          var discount = result.discountValue!;
          setState(() {
            // paymentRequestData.totalPrice =
            //     paymentRequestData.totalPrice! + calculateDiscount - discount;
            calculateDiscount = discount;

            voucherAdd = result;
          });
        }

        Navigator.of(context).pop();
      } else {
        Fluttertoast.showToast(
          msg: 'Voucher application failed!',
          toastLength: Toast.LENGTH_LONG,
          gravity: ToastGravity.TOP,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      }
    } catch (e) {
      _errorMessage = e.toString().replaceFirst('Exception: ', '');

      Fluttertoast.showToast(
        msg: _errorMessage.toString(),
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.TOP,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 18.0,
      );
    }
    // finally {
    //   Navigator.of(context).pop();
    // }
  }

  Future<void> bookingPaypal(PaymentRequest paymentRequest) async {
    try {

      setState(() {
        isloading = true;
      });

      BookingSuccessInfo? result =
          await _bookingViewModel.bookingPaypal(paymentRequestData);

      // TransactionSuccessPage
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => TransactionSuccessPage(
            bookingSuccessInfo: result!,
          ),
        ),
      );
    } catch (e) {
      _errorMessage = e.toString().replaceFirst('Exception: ', '');

      Fluttertoast.showToast(
        msg: _errorMessage.toString(),
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.TOP,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 18.0,
      );
    }
  }

  void _showInputPromotion() {
    showDialog(
        context: context,
        builder: (context) {
          return Scaffold(
            backgroundColor: const Color(0xff1f1d2b),
            appBar: AppBar(
              title: const Text(
                "Apply Voucher",
                style: TextStyle(color: Colors.white),
              ),
              backgroundColor: const Color(0xff1f1d2b),
              iconTheme: const IconThemeData(color: Colors.white),
              centerTitle: true,
            ),
            body: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
              child: Form(
                key: formKey,
                child: Column(
                  children: [
                    const SizedBox(
                      height: 10,
                    ),
                    TextFormField(
                      controller: promotionController,
                      decoration: const InputDecoration(
                        labelText: 'Code input',
                        labelStyle:
                            TextStyle(color: Colors.white, fontSize: 18),
                        hintStyle: TextStyle(color: Colors.grey),
                        filled: true,
                        fillColor: Color(0xff1f1d2b),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(8)),
                          borderSide: BorderSide(
                            color: Color(0xFF00D0F1),
                            width: 1.0,
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(8)),
                          borderSide: BorderSide(
                            color: Color(0xFF00D0F1),
                            width: 2.0,
                          ),
                        ),
                      ),
                      style: const TextStyle(color: Colors.white),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter code';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () => handleVoucher(
                          VoucherRequest(code: promotionController.text)),
                      style: TextButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 50.0, vertical: 20.0),
                        shape: RoundedRectangleBorder(
                          borderRadius:
                              BorderRadius.circular(10.0), // Rounded corners
                        ),

                        backgroundColor:
                            Colors.transparent, // Transparent background
                      ),
                      child: const Text(
                        'Apply',
                        style: TextStyle(
                          color: Colors.orange, // Text color
                          fontSize: 18.0, // Text size
                          fontWeight: FontWeight.bold, // Font weight
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    if (isloading) {
      return getProgressBar();
    }
    return getBody();
  }

  Widget getBody() {
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
                        style: const TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        '${_showTimeTableResponse.cinemaName} - ${_showTimeTableResponse.roomName}',
                        style: const TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        '${_showTimeTableResponse.time} - ${_showTimeTableResponse.date}',
                        style: const TextStyle(
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
            //here
            if (voucherAdd != null &&
                voucherAdd.discountType != null &&
                voucherAdd.discountValue != null) ...[
              Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Voucher Discount:',
                          style: TextStyle(fontSize: 16, color: Colors.white),
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        if (voucherAdd.discountType == 'PERCENTAGE')
                          Text(
                            '(${voucherAdd.discountValue} %) ${calculateDiscount} VND',
                            style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.orange),
                          ),
                        if (voucherAdd.discountType == 'FIXED')
                          Text(
                            '${calculateDiscount} VND',
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  onPressed: () {
                    setState(() {
                      promotionController.text = "";
                    });
                    _showInputPromotion();
                  },
                  icon: Icon(Icons.local_offer, color: Colors.orange),
                  label: const Text(
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
                      '${paymentRequestData.totalPrice! - calculateDiscount} VND',
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
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // print('===========');
                  // print('_selectedPaymentMethod: ' +
                  //     _selectedPaymentMethod.toString());
                  // print('===========');
                  if (_selectedPaymentMethod != null &&
                      _selectedPaymentMethod!.isNotEmpty) {
                    if (_selectedPaymentMethod!.contains('PayPal')) {
                      double exchangeRateVNDToUSD = 0.000042;
                      double totalPriceVND = paymentRequestData.totalPrice!;
                      final double totalPriceUSD =
                          totalPriceVND * exchangeRateVNDToUSD;

                      final String totalPriceUSDString =
                          totalPriceUSD.toStringAsFixed(2);

                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (BuildContext context) => PaypalCheckoutView(
                          sandboxMode: true,
                          // clientId: "YOUR CLIENT ID",
                          // secretKey: "YOUR SECRET KEY",
                          clientId:
                              "AdjeY1YkcgIWMTbos5WNR6jUkJvsq-u-noGd5XkxcfOihm7HtY9CeV4usR3jTXFPaaCFr180mKmn79G_",
                          secretKey:
                              "EMyVX9iJI3pv7i0jEpsloiUVkLwPL4BxMPf6Kmp_6MijSzjJMnhs4qr1kau7Qa9Bf5RYuDRUhrtIwadD",
                          transactions: [
                            {
                              "amount": {
                                "total": totalPriceUSDString,
                                "currency": "USD",
                                "details": {
                                  "subtotal": totalPriceUSDString,
                                  "shipping": '0',
                                  "shipping_discount": 0
                                }
                              },
                              "description":
                                  "The payment transaction description.",
                              "payment_options": const {
                                "allowed_payment_method":
                                    "INSTANT_FUNDING_SOURCE"
                              },
                              // "item_list": {
                              //   "items": [
                              //     {
                              //       "name": "Apple",
                              //       "quantity": 4,
                              //       "price": '10',
                              //       "currency": "USD"
                              //     },
                              //     {
                              //       "name": "Pineapple",
                              //       "quantity": 5,
                              //       "price": '12',
                              //       "currency": "USD"
                              //     }
                              //   ],
                              //
                              // }
                            }
                          ],
                          note: "Contact us for any questions on your order.",
                          onSuccess: (Map params) async {
                            log("onSuccess: $params");
                            String fullPaymentId = params['data']['id'];
                            String orderId = params['data']['cart'];
                            String paymentId = fullPaymentId.split('-').last;
                            paymentRequestData.totalPrice =
                                paymentRequestData.totalPrice! -
                                    calculateDiscount;
                            paymentRequestData.orderId = orderId;
                            paymentRequestData.paymentId = paymentId;
                            paymentRequestData.showtimeId =
                                _showTimeTableResponse.id;
                            if (voucherAdd != null) {
                              paymentRequestData.voucherId = voucherAdd.id;
                            }

                            bookingPaypal(paymentRequestData);
                            Navigator.pop(context);
                            // Navigator.push(
                            //   context,
                            //   MaterialPageRoute(
                            //     builder: (context) => MyApp(),
                            //   ),
                            // );
                          },
                          onError: (error) {
                            log("onError: $error");
                            Navigator.pop(context);
                          },
                          onCancel: () {
                            print('cancelled:');
                            Navigator.pop(context);
                          },
                        ),
                      ));
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
                child: Text(
                  'Payment',
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
          ],
        ),
      ),
    );
  }
}
