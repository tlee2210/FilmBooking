import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../../data/models/login.dart';
import '../../data/models/token.dart';
import '../../data/responsitories/TokenRepositories.dart';
import '../../main.dart';
import '../ProgressBar/getProgressBar.dart';
import '../home/home.dart';
import 'SignUpPage.dart';
import 'forgotPasswordPage.dart';
import 'loginViewModel.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  // final _emailController = TextEditingController();
  // final _passwordController = TextEditingController();
  TokenRepositories tokenRepository = TokenRepositories();
  final _emailController = TextEditingController(text: 'thienle255@gmail.com');
  final _passwordController = TextEditingController(text: 'thienle2210');
  bool _obscurePassword = true;
  late LoginViewModel _loginViewModel;
  String? _errorMessage;
  bool isLoading = false;

  @override
  void initState() {
    _loginViewModel = LoginViewModel();
    super.initState();
  }

  void _login() async {
    if (isLoading) return;

    if (_formKey.currentState?.validate() ?? false) {
      setState(() {
        isLoading = true;
        _errorMessage = null;
      });

      String email = _emailController.text;
      String password = _passwordController.text;

      Login login = Login(email: email, password: password);
      print('======================');
      print('email: ' + email);
      print('password: ' + password);
      print('======================');
      try {
        LoginToken? token = await _loginViewModel.signin(login);
        if (token != null) {
          var saveToken = token.token.toString();
          await tokenRepository.saveToken(saveToken);
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => MyApp()),
          );
          // Navigator.pushReplacement(
          //   context,
          //   MaterialPageRoute(
          //     builder: (context) => MyApp(),
          //     settings: RouteSettings(arguments: 0), // 0 là chỉ số của Home tab
          //   ),
          // );
        }
      } catch (e) {
        _errorMessage = e.toString().replaceFirst('Exception: ', '');

        Fluttertoast.showToast(
          msg: _errorMessage.toString(),
          toastLength: Toast.LENGTH_LONG,
          gravity: ToastGravity.TOP,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 18.0,
        );
      } finally {
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  void _navigateToForgotPassword() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ForgotPasswordPage()),
    );
  }

  void _navigateToSignUp() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignUpPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Login',
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: const Color(0xff1f1d2b),
      ),
      backgroundColor: const Color(0xff1f1d2b),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const SizedBox(height: 8),
                const Text(
                  'Login Your Account',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                  ),
                ),
                const SizedBox(height: 32),
                TextFormField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'Email Address',
                    labelStyle:
                        const TextStyle(color: Colors.white, fontSize: 18),
                    hintStyle: const TextStyle(color: Colors.white),
                    filled: true,
                    fillColor: const Color(0xff1f1d2b),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(
                        color: Color(0xFF00D0F1),
                        width: 1.0,
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(
                        color: Color(0xFF00D0F1),
                        width: 2.0,
                      ),
                    ),
                  ),
                  style: const TextStyle(color: Colors.white),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your email';
                    } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+')
                        .hasMatch(value)) {
                      return 'Please enter a valid email';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                      labelText: 'Password',
                      labelStyle:
                          const TextStyle(color: Colors.white, fontSize: 18),
                      // hintText: 'Password',
                      hintStyle: const TextStyle(color: Colors.white),
                      filled: true,
                      fillColor: const Color(0xff1f1d2b),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                        borderSide: const BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 1.0,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                        borderSide: const BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 2.0,
                        ),
                      ),
                      suffixIcon: IconButton(
                        onPressed: () {
                          setState(() {
                            _obscurePassword = !_obscurePassword;
                          });
                        },
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_off
                              : Icons.visibility,
                          color: Colors.grey,
                        ),
                      )
                      // const Icon(Icons.visibility_off, color: Colors.white),
                      ),
                  style: const TextStyle(color: Colors.white),
                  obscureText: _obscurePassword,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your password';
                    } else if (value.length < 6) {
                      return 'Password must be at least 6 characters long';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                Align(
                  alignment: Alignment.centerRight,
                  child: GestureDetector(
                    onTap: _navigateToForgotPassword,
                    child: Text(
                      'Forgot Password ?',
                      style: TextStyle(color: Color(0xff12CDD9)),
                    ),
                  ),
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _login,
                    child: Text(
                      'Login',
                      style: TextStyle(color: Colors.white),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xff12CDD9),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                ),
                Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      'New User!',
                      style: TextStyle(color: Colors.white),
                    ),
                    SizedBox(width: 10),
                    ElevatedButton(
                      onPressed: _navigateToSignUp,
                      style: ElevatedButton.styleFrom(
                        // primary: Colors.orange,
                        backgroundColor: const Color(0xff12CDD9),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18.0),
                        ),
                      ),
                      child: Text(
                        'Register',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ),
                // if (isLoading)
                //   const Center(
                //     child: CircularProgressIndicator(),
                //   ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
