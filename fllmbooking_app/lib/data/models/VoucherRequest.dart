class VoucherRequest {
  String? code;

  VoucherRequest({required this.code});

  Map<String, dynamic> toJson() {
    return {
      'code': code,
    };
  }
}