import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import '../../data/models/BookingSuccessInfo.dart';
import '../../data/models/PaymentRequest.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../data/responsitories/TokenRepositories.dart';
import '../../main.dart';
import '../booking/TransactionSuccessPage.dart';

class VnPaymentService extends StatefulWidget {
  final Function onSuccess, onCancel, onError;
  final PaymentRequest paymentRequest;

  const VnPaymentService({
    Key? key,
    required this.paymentRequest,
    required this.onSuccess,
    required this.onError,
    required this.onCancel,
  }) : super(key: key);

  @override
  State<VnPaymentService> createState() => _VnPaymentServiceState();
}

class _VnPaymentServiceState extends State<VnPaymentService> {
  InAppWebViewController? webViewController;
  bool isHandled = false;
  TokenRepositories tokenRepository = TokenRepositories();

  Future<String?> _createPayment() async {
    try {
      var token = await tokenRepository.getToken();
      final response = await http.post(
        Uri.parse("http://10.0.2.2:8081/api/payment/v2/create_payment_vnpay"),
        headers: {
          'Authorization': 'Bearer ' + token.toString(),
          "Content-Type": "application/json"
        },
        body: jsonEncode(widget.paymentRequest.toJson()),
      );

      if (response.statusCode == 200) {
        var dataWrapper = jsonDecode(response.body) as Map<String, dynamic>;
        var result = dataWrapper['result'];
        return result;
      } else {
        widget.onError(
            "Failed to create payment. Status code: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      widget.onError("Error: $e");
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("VNPay Payment"),
        centerTitle: true,
      ),
      body: FutureBuilder<String?>(
        future: _createPayment(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text("An error occurred"));
          } else if (snapshot.hasData && snapshot.data != null) {
            return InAppWebView(
              initialUrlRequest: URLRequest(url: Uri.parse(snapshot.data!)),
              onWebViewCreated: (controller) {
                webViewController = controller;
              },
              shouldOverrideUrlLoading: (controller, navigationAction) async {
                var uri = navigationAction.request.url;
                if (uri != null) {
                  if (uri.queryParameters.containsKey("vnp_ResponseCode")) {
                    String responseCode =
                        uri.queryParameters["vnp_ResponseCode"]!;
                    if (responseCode == "00") {
                      widget.onSuccess(uri.toString());
                    } else {
                      widget.onError(
                          "Payment failed with response code: $responseCode");
                    }
                    return NavigationActionPolicy.CANCEL;
                  } else if (uri.queryParameters.containsKey("vnp_TxnRef")) {
                    widget.onCancel();
                    return NavigationActionPolicy.CANCEL;
                  }
                }
                return NavigationActionPolicy.ALLOW;
              },
              onLoadStart: (controller, url) async {

                print("Start loading: $url");
                
                if (!isHandled &&
                    url.toString().contains(
                        'http://10.0.2.2:8081/api/payment/v2/booking_vnpay')) {
                  isHandled = true;
                  var token = await tokenRepository.getToken();
                  final response = await http.get(
                    Uri.parse(url.toString()),
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer $token'
                    },
                  );

                  final bodyContent = utf8.decode(response.bodyBytes);
                  var dataWrapper =
                      jsonDecode(bodyContent) as Map<String, dynamic>;

                  // print('=================');
                  // print('=================');
                  // print('statusCode: ' + response.statusCode.toString());
                  // print('dataWrapper: ' + dataWrapper.toString());
                  // print('=================');
                  // print('=================');

                  BookingSuccessInfo bookingSuccessInfo= BookingSuccessInfo.fromJson(dataWrapper['result']);

                  if (response.statusCode == 200) {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => TransactionSuccessPage(bookingSuccessInfo: bookingSuccessInfo!,)),
                    );
                  }
                }
              },
              onLoadStop: (controller, url) async {
                if (!isHandled) {
                  print('Stop loading: ' + url.toString());
                }
              },
              onLoadError: (controller, url, code, message) {
                if (!isHandled) {
                  print('Failed to load: ' +
                      url.toString() +
                      ', Error: ' +
                      message);
                  Navigator.pop(context);
                }
              },
            );
          } else {
            return Center(child: Text("Failed to create payment URL"));
          }
        },
      ),
    );
  }
}
