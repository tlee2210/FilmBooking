import '../models/login.dart';
import '../models/signup.dart';
import '../models/token.dart';
import '../source/login.dart';

abstract interface class LoginRespoinsitory {
  Future<LoginToken?> signin(Login login);

  Future<void> signup(SignUp signUp);
}

class LoginResponsitories implements LoginRespoinsitory {
  final _loginDataSource = LoginData();

  @override
  Future<LoginToken?> signin(Login login) async {
    final value = await _loginDataSource.signin(login);
    if (value != null) {
      return value;
    } else {
      return null;
    }
  }

  @override
  Future<String?> signup(SignUp signUp) async {
    final value = await _loginDataSource.signup(signUp);
    if (value != null) {
      return value;
    } else {
      return null;
    }
  }
}
