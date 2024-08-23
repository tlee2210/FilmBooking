enum DiscountType { PERCENTAGE, FIXED }

class VoucherResponse {
  int? id;
  String? discountType;
  double? discountValue;
  double? maxDiscount = null;

  VoucherResponse({
    required this.id,
    required this.discountType,
    required this.discountValue,
    required this.maxDiscount,
  });

  factory VoucherResponse.fromJson(Map<String, dynamic> json) {
    return VoucherResponse(
      id: json['id'],
      discountType: json['discountType'],
      discountValue: json['discountValue'],
      maxDiscount: json['maxDiscount'],
    );
  }
}
