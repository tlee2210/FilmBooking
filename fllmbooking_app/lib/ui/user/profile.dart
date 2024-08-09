import 'package:fllmbooking_app/data/models/Booking.dart';
import 'package:fllmbooking_app/ui/user/userTransactionHistory.dart';
import 'package:fllmbooking_app/ui/user/userViewModel.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../../data/models/UserProfile.dart';
import '../../data/responsitories/TokenRepositories.dart';
import '../../main.dart';
import '../ProgressBar/getProgressBar.dart';
import '../login/login.dart';
import 'EditProfile.dart';

class ProfileTab extends StatefulWidget {
  @override
  _ProfileTabState createState() => _ProfileTabState();
}

class _ProfileTabState extends State<ProfileTab>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final ImagePicker _picker = ImagePicker();
  String? _imageUrl = 'https://via.placeholder.com/150';
  TokenRepositories tokenRepository = TokenRepositories();

  late UserViewModel _userViewModel;
  UserProfile? _userProfile;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);

    _checkTokenAndFetchProfile();
  }

  Future<void> _checkTokenAndFetchProfile() async {
    // await tokenRepository.deleteToken();
    var token = await tokenRepository.getToken();
    // print('======================');
    // print('token: $token');
    // print('======================');
    if (token == null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
      );
    } else {
      _userViewModel = UserViewModel();
      _userViewModel.getprofile();
      _userViewModel.profileStream.listen((UserProfile userProfile) {
        setState(() {
          _userProfile = userProfile;
        });
      });

      // _userProfile = UserProfile();
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _pickImage() async {
    final pickedFile = await _picker.getImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _imageUrl = pickedFile.path;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Profile',
          style: TextStyle(
              color: Colors.white, fontWeight: FontWeight.bold, fontSize: 22),
        ),
        centerTitle: true,
        backgroundColor: const Color(0xFF1F1D2B),
      ),
      body: getBody(),
    );
  }

  Widget getBody() {
    if (_userProfile != null) {
      return Container(
        color: const Color(0xFF1F1D2B),
        child: Column(
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: <Widget>[
                  GestureDetector(
                    onTap: () => _showPicker(context),
                    child: Stack(
                      children: [
                        CircleAvatar(
                          radius: 50,
                          backgroundImage: _userProfile != null
                              ? NetworkImage(_userProfile!.avatar ?? _imageUrl!)
                              : NetworkImage(_imageUrl!),
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.black54,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.edit,
                              color: Colors.white,
                              size: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    _userProfile!.name,
                    style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.white),
                  ),
                  Text(
                    _userProfile!.email,
                    style: const TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                ],
              ),
            ),
            // TabBar
            Container(
              color: Color(0xFF1F1D2B),
              child: TabBar(
                controller: _tabController,
                labelColor: const Color(0xFF12CDD9),
                unselectedLabelColor: Colors.grey,
                indicatorColor: const Color(0xFF12CDD9),
                tabs: const [
                  Tab(icon: Icon(Icons.info), text: 'Information'),
                  Tab(icon: Icon(Icons.history), text: 'Transaction History'),
                ],
              ),
            ),

            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _userProfile != null
                      ? EditProfile(userProfile: _userProfile!)
                      : const Center(child: CircularProgressIndicator()),
                  _userProfile!.bookingList != null &&
                          _userProfile!.bookingList.isNotEmpty
                      ? TransactionHistoryPage(
                          bookingList: _userProfile!.bookingList,
                        )
                      : const Center(
                          child: Text(
                            'No transactions available',
                            style:
                                TextStyle(color: Colors.white, fontSize: 16.0),
                          ),
                        ),
                ],
              ),
            ),
            const SizedBox(
              height: 10,
            ),
          ],
        ),
      );
    } else {
      return getProgressBar();
    }
  }

  void _showPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext bc) {
        return SafeArea(
          child: Wrap(
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text('Select from Library'),
                onTap: () {
                  _pickImage();
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_camera),
                title: const Text('Take a new photo'),
                onTap: () {
                  _pickImage();
                  Navigator.of(context).pop();
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
