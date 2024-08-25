import 'package:fllmbooking_app/data/models/VoucherRequest.dart';
import 'package:fllmbooking_app/data/models/WaterCorn.dart';

import '../../data/models/BookingSuccessInfo.dart';
import '../../data/models/PaymentRequest.dart';
import '../../data/models/VoucherResponse.dart';
import '../../data/models/bookingData.dart';
import '../../data/responsitories/bookingResponsitories.dart';
import 'dart:async';

class BookingViewModel {
  final StreamController<ShowTimeTableResponse> _streamController =
      StreamController<ShowTimeTableResponse>();
  final StreamController<List<WaterCorn>> _streamWaterCornController =
      StreamController<List<WaterCorn>>();

  final StreamController<String> _streamSeatBookedController =
  StreamController<String>();


  Stream<ShowTimeTableResponse> get dataStream => _streamController.stream;
  Stream<String> get SeatBooked => _streamSeatBookedController.stream;

  Stream<List<WaterCorn>> get waterCornStream =>
      _streamWaterCornController.stream;

  final BookingResponsitoties _repository = BookingResponsitoties();

  Future<void> getBookingTime(int id) async {
    try {
      final value = await _repository.getBookingTime(id);
      if (value != null) {
        _streamController.add(value);
      }
    } catch (e) {
      throw e;
    }
  }

  Future<void> getSeatBooked(int id) async {
    try {
      final value = await _repository.getSeatBooked(id);
      // print('value: ' + value.toString());
      if (value != null) {
        //   _streamController.add(value);
        _streamWaterCornController.add(value.waterCorns);
        _streamSeatBookedController.add(value.seatBooked);
      }
    } catch (e) {
      throw e;
    }
  }

  Future<VoucherResponse?> applyVoucher(VoucherRequest code) async {
    try {
      final value = await _repository.applyVoucher(code);
      // print('value: ' + value.toString());
      if (value != null) {
        return value;
      }
    } catch (e) {
      throw e;
    }
  }

  Future<BookingSuccessInfo?> bookingPaypal(PaymentRequest paymentRequest) async {
    try {
      final value = await _repository.bookingPaypal(paymentRequest);
      if (value != null) {
        return value;
      }
    } catch (e) {
      throw e;
    }
  }
}
