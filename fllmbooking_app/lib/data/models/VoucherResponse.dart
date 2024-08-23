enum DiscountType { PERCENTAGE, FIXED }

class VoucherResponse {
  int? id;
  String? discountType;
  double? discountValue;
  double? maxDiscount = null;

  VoucherResponse({
    this.id,
    this.discountType,
    this.discountValue,
    this.maxDiscount,
  });

  factory VoucherResponse.fromJson(Map<String, dynamic> json) {
    return VoucherResponse(
      id: json['id'],
      discountType: json['discountType'],
      discountValue: json['discountValue'],
      maxDiscount: json['maxDiscount'],
    );
  }

  @override
  String toString() {
    return 'VoucherResponse{id: $id, discountType: $discountType, discountValue: $discountValue, maxDiscount: $maxDiscount}';
  }
}
