import '../../data/models/bookingData.dart';
import '../../data/responsitories/bookingResponsitories.dart';
import 'dart:async';

class BookingViewModel {
  final StreamController<ShowTimeTableResponse> _streamController =
  StreamController<ShowTimeTableResponse>();

  Stream<ShowTimeTableResponse> get dataStream => _streamController.stream;
  final BookingResponsitoties _repository = BookingResponsitoties();

  Future<void> getBookingTime(int id) async {
    try {
      final value = await _repository.getBookingTime(id);
      print('value: ' + value.toString());
      if(value != null){
        _streamController.add(value);
      }
    } catch (e) {
      throw e;
    }
  }
}
