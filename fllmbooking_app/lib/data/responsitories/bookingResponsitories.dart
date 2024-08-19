import '../models/bookingData.dart';
import '../models/seatbooked.dart';
import '../source/booking.dart';

abstract interface class Responsetories {
  Future<ShowTimeTableResponse?> getBookingTime(int id);

  Future<SeatBooked?> getSeatBooked(int id);
}

class BookingResponsitoties implements Responsetories {
  final BookingData _bookingDataSource = BookingData();

  @override
  Future<ShowTimeTableResponse?> getBookingTime(int id) async {
    try {
      final value = await _bookingDataSource.getBookingTime(id);
      // print('=========');
      // print('value:' + value.toString());
      // print('=========');
      return value;
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }

  @override
  Future<SeatBooked?> getSeatBooked(int id) async {
    try {
      final value = await _bookingDataSource.getSeatBooked(id);
      print('=========');
      print('value:' + value.toString());
      print('=========');
      return value;
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }
}
