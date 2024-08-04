import '../models/login.dart';
import '../models/token.dart';
import '../source/login.dart';

abstract interface class LoginRespoinsitory {
  Future<LoginToken?> signin(Login login);
}

class LoginResponsitories implements LoginRespoinsitory {
  final _loginDataSource = LoginData();

  @override
  Future<LoginToken?> signin(Login login) async {
    final value = await _loginDataSource.signin(login);
    if (value != null) {
      // print('===============================');
      // print(value);
      // print('===============================');
      return value;
    } else {
      return null;
    }
  }
}
