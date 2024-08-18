class Room {
  final int id;
  final String name;
  final int doubleSeatRows;
  final int doubleSeatColumns;
  final int totalColumn;
  final int seatColumns;
  final int seatRows;

  Room({
    required this.id,
    required this.name,
    required this.doubleSeatRows,
    required this.doubleSeatColumns,
    required this.totalColumn,
    required this.seatColumns,
    required this.seatRows,
  });

  factory Room.fromJson(Map<String, dynamic> json) {
    return Room(
      id: json['id'],
      name: json['name'],
      doubleSeatRows: json['doubleSeatRows'],
      doubleSeatColumns: json['doubleSeatColumns'],
      totalColumn: json['totalColumn'],
      seatColumns: json['seatColumns'],
      seatRows: json['seatRows'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'doubleSeatRows': doubleSeatRows,
      'doubleSeatColumns': doubleSeatColumns,
      'totalColumn': totalColumn,
      'seatColumns': seatColumns,
      'seatRows': seatRows,
    };
  }
}
