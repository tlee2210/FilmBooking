class BookingWaterCorn {
  int id;
  String name;
  int quantity;

  BookingWaterCorn({
    required this.id,
    required this.name,
    required this.quantity,
  });

  factory BookingWaterCorn.fromJson(Map<String, dynamic> json) {
    return BookingWaterCorn(
      id: json['id'],
      name: json['name'],
      quantity: json['quantity'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'quantity': quantity,
    };
  }

  @override
  String toString() {
    return 'BookingWaterCorn{id: $id, name: $name, quantity: $quantity}';
  }
}
