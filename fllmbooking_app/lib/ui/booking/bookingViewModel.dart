import 'package:fllmbooking_app/data/models/VoucherRequest.dart';
import 'package:fllmbooking_app/data/models/WaterCorn.dart';

import '../../data/models/VoucherResponse.dart';
import '../../data/models/bookingData.dart';
import '../../data/responsitories/bookingResponsitories.dart';
import 'dart:async';

class BookingViewModel {
  final StreamController<ShowTimeTableResponse> _streamController =
      StreamController<ShowTimeTableResponse>();
  final StreamController<List<WaterCorn>> _streamWaterCornController =
      StreamController<List<WaterCorn>>();

  Stream<ShowTimeTableResponse> get dataStream => _streamController.stream;

  Stream<List<WaterCorn>> get waterCornStream =>
      _streamWaterCornController.stream;

  final BookingResponsitoties _repository = BookingResponsitoties();

  Future<void> getBookingTime(int id) async {
    try {
      final value = await _repository.getBookingTime(id);
      // print('value: ' + value.toString());
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
}
