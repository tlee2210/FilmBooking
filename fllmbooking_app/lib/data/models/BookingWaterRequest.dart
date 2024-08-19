class BookingWaterRequest {
  int? id;
  int? quantity;

  BookingWaterRequest({
    this.id,
    this.quantity,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'quantity': quantity,
    };
  }

  // Create from JSON
  factory BookingWaterRequest.fromJson(Map<String, dynamic> json) {
    return BookingWaterRequest(
      id: json['id'],
      quantity: json['quantity'],
    );
  }

  @override
  String toString() {
    return 'BookingWaterRequest{id: $id, quantity: $quantity}';
  }
}
