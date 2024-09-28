import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import '../../data/models/PaymentRequest.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../data/responsitories/TokenRepositories.dart';

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
                print("Navigating to URI: ${uri.toString()}");
//kiem tra url back ve
                if (uri != null &&
                    uri.toString().contains(
                        'http://10.0.2.2:8081/api/payment/v2/booking_vnpay')) {
                  print('Blocked URL: ${uri.toString()}');
                  executePayment(uri, context);
                  return NavigationActionPolicy.CANCEL;
                }

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
              initialOptions: InAppWebViewGroupOptions(
                crossPlatform: InAppWebViewOptions(
                  useShouldOverrideUrlLoading: true,
                ),
              ),
              onLoadStart: (controller, url) async {
                print("Start loading: $url");
                if (!isHandled &&
                    url.toString().contains(
                        'http://10.0.2.2:8081/api/payment/v2/booking_vnpay')) {
                  isHandled = true;
                  executePayment(url, context);

                  Navigator.pop(context);
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

  void executePayment(Uri? url, BuildContext context) {
    if (url != null) {
      Map<String, String> urlMap = {
        'url': url.toString(),
      };
      widget.onSuccess(urlMap);
    } else {
      widget.onError("Invalid URL");
    }
  }
}
