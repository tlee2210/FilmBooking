class VoucherRequest {
  String? code;
  double? price;
  VoucherRequest({required this.code,required this.price});

  factory VoucherRequest.fromJson(Map<String, dynamic> json) {
    return VoucherRequest(
      code: json["code"],
      price: double.parse(json["price"]),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "code": this.code,
      "price": this.price,
    };
  }

  @override
  String toString() {
    return 'VoucherRequest{code: $code, price: $price}';
  }

//
}