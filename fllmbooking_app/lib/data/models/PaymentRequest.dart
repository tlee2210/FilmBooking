import 'BookingWaterRequest.dart';

class PaymentRequest {
  int? id;
  String? orderId;
  String? paymentId;
  List<String>? quantitySeat;
  List<String>? quantityDoubleSeat;
  double? totalPrice;
  int? showtimeId;
  int? voucherId;
  List<BookingWaterRequest>? quantityWater;

  PaymentRequest({
    this.id,
    this.orderId,
    this.paymentId,
    this.quantitySeat,
    this.quantityDoubleSeat,
    this.totalPrice,
    this.showtimeId,
    this.voucherId,
    this.quantityWater,
  });

  // Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'orderId': orderId,
      'paymentId': paymentId,
      'quantitySeat': quantitySeat ?? [],
      'quantityDoubleSeat': quantityDoubleSeat ?? [],
      'totalPrice': totalPrice,
      'showtimeId': showtimeId,
      'voucherId': voucherId,
      'quantityWater': quantityWater?.map((e) => e.toJson()).toList(),
    };
  }

  // Create from JSON
  factory PaymentRequest.fromJson(Map<String, dynamic> json) {
    return PaymentRequest(
      id: json['id'],
      orderId: json['orderId'],
      paymentId: json['paymentId'],
      quantitySeat: (json['quantitySeat'] as List?)?.map((item) => item as String).toList() ?? [],
      quantityDoubleSeat: (json['quantityDoubleSeat'] as List?)?.map((item) => item as String).toList() ?? [],
      totalPrice: json['totalPrice'],
      showtimeId: json['showtimeId'],
      voucherId: json['voucherId'],
      quantityWater: (json['quantityWater'] as List?)
          ?.map((item) => BookingWaterRequest.fromJson(item))
          .toList(),
    );
  }

  @override
  String toString() {
    return 'PaymentRequest{id: $id, orderId: $orderId, paymentId: $paymentId, quantitySeat: $quantitySeat, quantityDoubleSeat: $quantityDoubleSeat, totalPrice: $totalPrice, showtimeId: $showtimeId, voucherId: $voucherId, quantityWater: $quantityWater}';
  }
}
