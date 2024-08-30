import '../../data/models/login.dart';
import '../../data/models/signup.dart';
import '../../data/models/verifyMailrequest.dart';
import '../../data/responsitories/loginResponsitories.dart';
import '../../data/models/token.dart';

class LoginViewModel {
  final LoginResponsitories _repository = LoginResponsitories();

  Future<LoginToken?> signin(Login login) async {
    try {
      final token = await _repository.signin(login);
      return token;
    } catch (e) {
      throw e;
    }
  }

  Future<String?> signup(SignUp signUp) async {
    try {
      final message = await _repository.signup(signUp);
      return message;
    } catch (e) {
      throw e;
    }
  }

  Future<String?> resetPassword(verifyMailrequest email) async {
    try {
      final message = await _repository.resetPassword(email);
      return message;
    } catch (e) {
      throw e;
    }
  }
}
