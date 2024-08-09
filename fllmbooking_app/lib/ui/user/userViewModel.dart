import '../../data/models/ChangePasswordRequest.dart';
import '../../data/models/UserProfile.dart';
import '../../data/models/UserProfileResquest.dart';
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

  Future<String?> updatepassword(
      ChangePasswordRequest changePasswordRequest) async {
    try {
      final message =
          await _responsitoties.changePassword(changePasswordRequest);
      return message;
    } catch (e) {
      throw e;
    }
  }
  Future<String?> updateProfile(
      UserProfileRequest UserProfileRequest) async {
    try {
      final message =
      await _responsitoties.updateProfile(UserProfileRequest);
      return message;
    } catch (e) {
      throw e;
    }
  }
}
