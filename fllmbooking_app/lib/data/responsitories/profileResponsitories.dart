import 'package:fllmbooking_app/data/models/UserProfileResquest.dart';

import '../models/ChangePasswordRequest.dart';
import '../models/UserProfile.dart';
import '../source/profile.dart';

abstract interface class Responsetories {
  Future<UserProfile?> getProfile();

  Future<String?> changePassword(ChangePasswordRequest changePasswordRequest);

  Future<String?> updateProfile(UserProfileRequest userProfileRequest);
}

class ProfileResponsitoties implements Responsetories {
  final ProfileData _profileDataSource = ProfileData();

  @override
  Future<UserProfile?> getProfile() async {
    try {
      final value = await _profileDataSource.getProfile();
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }

  @override
  Future<String?> changePassword(
      ChangePasswordRequest changePasswordRequest) async {
    try {
      final value =
          await _profileDataSource.changePassword(changePasswordRequest);
      if (value != null) {
        return value;
      } else {
        throw Exception('update fail');
      }
    } catch (e) {
      throw Exception('$e');
    }
  }

  @override
  Future<String?> updateProfile(UserProfileRequest userProfileRequest) async {
    try {
      final value = await _profileDataSource.updateProfile(userProfileRequest);
      if (value != null) {
        return value;
      } else {
        throw Exception('update fail');
      }
    } catch (e) {
      throw Exception('$e');
    }
  }
}
