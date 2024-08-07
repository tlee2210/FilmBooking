import '../../data/models/UserProfile.dart';
import '../../data/responsitories/profileResponsitories.dart';
import 'dart:async';

class UserViewModel {
  final StreamController<UserProfile> _streamController =
      StreamController<UserProfile>();

  Stream<UserProfile> get profileStream => _streamController.stream;

  final _responsitoties = ProfileResponsitoties();

  void getprofile() async {
    try {
      final value = await _responsitoties.getProfile();
      if (value != null) {
        _streamController.add(value);
      }
    } catch (e) {
      throw e;
    }
  }
}
