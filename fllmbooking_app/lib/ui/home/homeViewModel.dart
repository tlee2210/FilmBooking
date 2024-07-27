import 'dart:async';

import '../../data/models/home.dart';
import '../../data/responsitories/homeResponsitories.dart';

class HomeViewModel {
  final StreamController<HomeDataModel> _homeStreamController =
      StreamController<HomeDataModel>();

  Stream<HomeDataModel> get homeStream => _homeStreamController.stream;

  void loadHome() {
    final repository = HomeResponsetories();
    repository.getHomeData()?.then((value) {
      if (value != null) {
        _homeStreamController.add(value);
      } else {
        _homeStreamController.addError('No data received');
      }
    });
    //     .catchError((error) {
    //   _homeStreamController.addError('Failed to load home data: $error');
    // });
  }

  void dispose() {
    _homeStreamController.close();
  }
}
