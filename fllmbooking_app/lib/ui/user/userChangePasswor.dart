import 'package:fllmbooking_app/ui/user/userViewModel.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../../data/models/ChangePasswordRequest.dart';

class ChangePasswordPage extends StatefulWidget {
  @override
  _ChangePasswordPageState createState() => _ChangePasswordPageState();
}

class _ChangePasswordPageState extends State<ChangePasswordPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _currentPasswordController =
      TextEditingController();
  final TextEditingController _newPasswordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  bool _obscureCurrentPassword = true;
  bool _obscureNewPassword = true;
  bool _obscureConfirmPassword = true;
  bool isLoading = false;
  String? _errorMessage;
  late UserViewModel userViewModel;

  void _changePassword() async {
    if (_formKey.currentState?.validate() ?? false) {
      userViewModel = UserViewModel();
      // print('"===================');
      // print('_currentPasswordController: ' + _currentPasswordController.text);
      // print('_newPasswordController: ' + _newPasswordController.text);
      // print('_confirmPasswordController: ' + _confirmPasswordController.text);
      // print('"===================');
      ChangePasswordRequest changePasswordRequest = ChangePasswordRequest(
          password: _currentPasswordController.text,
          newPassword: _newPasswordController.text,
          repeatPassword: _confirmPasswordController.text);

      try {
        String? message =
            await userViewModel.updatepassword(changePasswordRequest);
        Fluttertoast.showToast(
          msg: message.toString(),
          toastLength: Toast.LENGTH_LONG,
          gravity: ToastGravity.TOP,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 18.0,
        );
        // Navigator.push(
        //   context,
        //   MaterialPageRoute(builder: (context) => LoginPage()),
        // );
        _currentPasswordController.clear();
        _newPasswordController.clear();
        _confirmPasswordController.clear();
      } catch (e) {
        _errorMessage = await e.toString().replaceFirst('Exception: ', '');

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

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Change Password',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: const Color(0xff1f1d2b),
        iconTheme: const IconThemeData(color: Colors.white),
        elevation: 0,
      ),
      backgroundColor: const Color(0xff1f1d2b),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Current Password Field
              TextFormField(
                controller: _currentPasswordController,
                decoration: InputDecoration(
                  labelText: 'Current Password',
                  labelStyle: TextStyle(color: Colors.white, fontSize: 18),
                  hintText: 'Enter your current password',
                  hintStyle: const TextStyle(color: Colors.grey),
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
                    icon: Icon(
                      _obscureCurrentPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscureCurrentPassword = !_obscureCurrentPassword;
                      });
                    },
                  ),
                ),
                style: const TextStyle(color: Colors.white),
                obscureText: _obscureCurrentPassword,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your current password';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // New Password Field
              TextFormField(
                controller: _newPasswordController,
                decoration: InputDecoration(
                  labelText: 'New Password',
                  labelStyle: TextStyle(color: Colors.white, fontSize: 18),
                  hintText: 'Enter your new password',
                  hintStyle: const TextStyle(color: Colors.grey),
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
                    icon: Icon(
                      _obscureNewPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscureNewPassword = !_obscureNewPassword;
                      });
                    },
                  ),
                ),
                style: const TextStyle(color: Colors.white),
                obscureText: _obscureNewPassword,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your new password';
                  } else if (value.length < 6) {
                    return 'Password must be at least 6 characters long';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Confirm Password Field
              TextFormField(
                controller: _confirmPasswordController,
                decoration: InputDecoration(
                  labelText: 'Confirm Password',
                  labelStyle:
                      const TextStyle(color: Colors.white, fontSize: 18),
                  hintText: 'Re-enter your new password',
                  hintStyle: const TextStyle(color: Colors.grey),
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
                    icon: Icon(
                      _obscureConfirmPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscureConfirmPassword = !_obscureConfirmPassword;
                      });
                    },
                  ),
                ),
                style: const TextStyle(color: Colors.white),
                obscureText: _obscureConfirmPassword,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please confirm your password';
                  } else if (value != _newPasswordController.text) {
                    return 'Passwords do not match';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      _changePassword();
                    }
                  },
                  child: Text(
                    'Change Password',
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
            ],
          ),
        ),
      ),
    );
  }
}
