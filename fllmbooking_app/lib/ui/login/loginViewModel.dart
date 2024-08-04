import '../../data/models/login.dart';
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
}
