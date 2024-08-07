import '../models/UserProfile.dart';
import '../source/profile.dart';

abstract interface class Responsetories {
  Future<UserProfile?> getProfile();
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
}
