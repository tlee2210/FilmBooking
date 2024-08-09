import 'package:fllmbooking_app/ui/user/userChangePasswor.dart';
import 'package:fllmbooking_app/ui/user/userViewModel.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../data/models/UserProfile.dart';
import '../../data/models/UserProfileResquest.dart';
import '../../data/responsitories/TokenRepositories.dart';
import '../../main.dart';
import 'package:fluttertoast/fluttertoast.dart';

class EditProfile extends StatefulWidget {
  final UserProfile userProfile;

  const EditProfile({required this.userProfile}) : assert(userProfile != null);

  @override
  State<EditProfile> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _dateOfBirthController;
  late String _selectedGender;
  final _formKey = GlobalKey<FormState>();
  bool _isEditable = true;
  TokenRepositories tokenRepository = TokenRepositories();
  bool isLoading = false;
  String? _errorMessage;
  late UserViewModel userViewModel;
  late UserProfileRequest userProfileRequest;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.userProfile.name);
    _emailController = TextEditingController(text: widget.userProfile.email);
    _phoneController = TextEditingController(text: widget.userProfile.phone);
    _dateOfBirthController =
        TextEditingController(text: widget.userProfile.dob);
    _selectedGender = widget.userProfile.gender;
    userViewModel = UserViewModel();
  }

  Future<String?> updateUserProfile() async {
    // print('=========================');
    // print('name: ' + _nameController.text);
    // print('email: ' + _emailController.text);
    // print('phone: ' + _phoneController.text);
    // print('dob: ' + _dateOfBirthController.text);
    // print('gender: ' + _selectedGender);
    // print('=========================');

    userProfileRequest = UserProfileRequest(
      name: _nameController.text,
      email: _emailController.text,
      phone: _phoneController.text,
      dob: _dateOfBirthController.text,
      gender: _selectedGender,
    );

    try {
      String? message = await userViewModel.updateProfile(userProfileRequest);
      Fluttertoast.showToast(
        msg: message.toString(),
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.TOP,
        backgroundColor: Colors.green,
        textColor: Colors.white,
        fontSize: 18.0,
      );

      setState(() {
        _isEditable = true;
      });

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

  Future<void> _selectDate(BuildContext context) async {
    DateTime? selectedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (selectedDate != null) {
      setState(() {
        _dateOfBirthController.text =
            DateFormat('yyyy-MM-dd').format(selectedDate);
      });
    }
  }

  void _logout(BuildContext context) async {
    await tokenRepository.deleteToken();
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => MyApp()),
    ); // Example navigation
  }

  void _ChangePasswordPage(BuildContext context) async {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ChangePasswordPage(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff1f1d2b),
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _nameController,
                    readOnly: _isEditable,
                    decoration: const InputDecoration(
                      labelText: 'Full Name',
                      labelStyle: TextStyle(color: Colors.white, fontSize: 18),
                      hintStyle: TextStyle(color: Colors.grey),
                      filled: true,
                      fillColor: Color(0xff1f1d2b),
                      // Màu nền của TextFormField
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                        borderSide: BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 1.0,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                        borderSide: BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 2.0,
                        ),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your full name';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16.0),
                  TextFormField(
                    controller: _emailController,
                    readOnly: true,
                    decoration: const InputDecoration(
                      labelText: 'Email Address',
                      labelStyle: TextStyle(color: Colors.white, fontSize: 18),
                      hintStyle: TextStyle(color: Colors.grey),
                      filled: true,
                      fillColor: Color(0xff1f1d2b),
                      // Màu nền của TextFormField
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                        borderSide: BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 1.0,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                        borderSide: BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 2.0,
                        ),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter email';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16.0),
                  TextFormField(
                    controller: _phoneController,
                    readOnly: _isEditable,
                    decoration: const InputDecoration(
                      labelText: 'Phone',
                      labelStyle: TextStyle(color: Colors.white, fontSize: 18),
                      hintStyle: TextStyle(color: Colors.grey),
                      filled: true,
                      fillColor: Color(0xff1f1d2b),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                        borderSide: BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 1.0,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                        borderSide: BorderSide(
                          color: Color(0xFF00D0F1),
                          width: 2.0,
                        ),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the phone number';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16.0),
                  DropdownButtonFormField<String>(
                    value: _selectedGender,
                    decoration: InputDecoration(
                      labelText: 'Gender',
                      labelStyle:
                          const TextStyle(color: Colors.white, fontSize: 18),
                      hintText: 'Select gender',
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
                    ),
                    style: const TextStyle(color: Colors.white),
                    dropdownColor: const Color(0xff1f1d2b),
                    items: ['Male', 'Female'].map((gender) {
                      return DropdownMenuItem(
                        value: gender,
                        child: Text(gender,
                            style: const TextStyle(color: Colors.white)),
                      );
                    }).toList(),
                    onChanged: !_isEditable
                        ? (value) {
                            setState(() {
                              _selectedGender = value!;
                            });
                          }
                        : null,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please select gender';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16.0),
                  GestureDetector(
                    onTap: !_isEditable ? () => _selectDate(context) : null,
                    child: AbsorbPointer(
                      child: TextFormField(
                        controller: _dateOfBirthController,
                        decoration: InputDecoration(
                          labelText: 'Date of Birth',
                          labelStyle: const TextStyle(
                              color: Colors.white, fontSize: 18),
                          hintText: 'YYYY-MM-DD',
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
                        ),
                        style: const TextStyle(color: Colors.white),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter date of birth';
                          } else {
                            DateTime dateOfBirth =
                                DateFormat('yyyy-MM-dd').parse(value);
                            int age = DateTime.now().year - dateOfBirth.year;
                            if (age < 13 || age > 80) {
                              return 'Age must be between 13 and 80';
                            }
                          }
                          return null;
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  TextButton(
                    onPressed: () => _ChangePasswordPage(context),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 15.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: RichText(
                      text: const TextSpan(
                        text: 'Change ',
                        style: TextStyle(
                          color: Colors.blue, // Text color
                          fontSize: 18.0, // Text size
                          fontWeight: FontWeight.normal,
                        ),
                        children: <TextSpan>[
                          TextSpan(
                            text: 'password',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  SizedBox(
                      width: double.infinity,
                      child: _isEditable
                          ? ElevatedButton(
                              onPressed: () {
                                setState(() {
                                  _isEditable = false;
                                });
                              },
                              child: const Text(
                                'Edit Profile',
                                style: TextStyle(color: Colors.white),
                              ),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xff12CDD9),
                                padding:
                                    const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                            )
                          : ElevatedButton(
                              onPressed: () {
                                if (_formKey.currentState?.validate() ??
                                    false) {
                                  if (_formKey.currentState?.validate() ??
                                      false) {
                                    updateUserProfile();
                                  }
                                }
                              },
                              child: const Text(
                                'Save',
                                style: TextStyle(color: Colors.white),
                              ),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xff12CDD9),
                                padding:
                                    const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                            )),
                  const SizedBox(height: 10),
                  TextButton(
                    onPressed: () => _logout(context),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 50.0, vertical: 20.0),
                      shape: RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(10.0), // Rounded corners
                      ),

                      backgroundColor:
                          Colors.transparent, // Transparent background
                    ),
                    child: const Text(
                      'Log Out',
                      style: TextStyle(
                        color: Colors.orange, // Text color
                        fontSize: 18.0, // Text size
                        fontWeight: FontWeight.bold, // Font weight
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
