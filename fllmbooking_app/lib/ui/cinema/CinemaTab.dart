import 'dart:convert';

import 'package:app_settings/app_settings.dart';
import 'package:fllmbooking_app/data/models/CinemaListResponse.dart';
import 'package:fllmbooking_app/data/models/select_option_reponse.dart';
import 'package:fllmbooking_app/data/responsitories/CinemaRepositories.dart';
import 'package:fllmbooking_app/ui/cinema/CinemaDetail.dart';
import 'package:fllmbooking_app/ui/cinema/CinemaItem.dart';
import 'package:fllmbooking_app/ui/cinema/SelectCity.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map_math/flutter_geo_math.dart';
import 'package:html/parser.dart';
import 'package:location/location.dart';

class CinemaTab extends StatefulWidget {
  const CinemaTab({super.key});

  @override
  State<CinemaTab> createState() => _CinemaTabState();
}

class _CinemaTabState extends State<CinemaTab> {
  double latitude = 0.0;
  double longitude = 0.0;
  late Future<CinemaListResponse?> _items =
      Future.value(CinemaListResponse(cinemas: [], cityList: []));
  late List<SelectOptionReponse> cities = [];
  late SelectOptionReponse _selectedItem =
      SelectOptionReponse(value: '', label: 'All city');

  @override
  void initState() {
    super.initState();
    _fetchInitialData();
    getUserCurrentLocation();
  }

  Future<void> _fetchInitialData() async {
    try {
      final response = await CinemaRepositories().getAllCinema('');
      setState(() {
        response?.cityList!.forEach((city) {
          cities.add(SelectOptionReponse(
              value: parse(utf8.decode(city.value!.codeUnits)).body!.text,
              label: parse(utf8.decode(city.label!.codeUnits)).body!.text));
        });

        if (cities.isNotEmpty) {
          _items = CinemaRepositories().getAllCinema('');
        } else {
          _items = Future.value(CinemaListResponse(cinemas: [], cityList: []));
        }
      });
    } catch (e) {
      print('Error fetching data: $e');
      setState(() {
        _items = Future.value(CinemaListResponse(cinemas: [], cityList: []));
      });
    }
  }

  Future<void> getUserCurrentLocation() async {
    Location location = Location();

    bool serviceEnabled;
    PermissionStatus permissionGranted;

    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        _showNormalConfirmationDialog(
          'Location Is Disabled',
          'App wants to access your location',
          'Enable Location',
          () {
            AppSettings.openAppSettings();
          },
        );
        return;
      }
    }

    permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        _showNormalConfirmationDialog(
          'Location Permission Denied',
          'Please go to settings and enable location permission',
          'Open Settings',
          () {
            AppSettings.openAppSettings();
          },
        );
        return;
      }
    }

    location.onLocationChanged.listen((LocationData currentLocation) {
      setState(() {
        latitude = currentLocation.latitude!;
        longitude = currentLocation.longitude!;
      });
    });
  }

  void _showNormalConfirmationDialog(
      String title, String message, String buttonText, VoidCallback onPressed) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: Text(message),
          actions: [
            ElevatedButton(
              onPressed: onPressed,
              child: Text(buttonText),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }

  void _showSelectCity() async {
    final SelectOptionReponse? result = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return SelectCity(cities: cities);
      },
    );

    if (result != null) {
      setState(() {
        _selectedItem = result;
        _items = CinemaRepositories().getAllCinema(result.value);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff1f1d2b),
        title: const Text(
          'Cinemas',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      backgroundColor: const Color(0xff1f1d2b),
      body: FutureBuilder<CinemaListResponse?>(
          future: _items,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (!snapshot.hasData || snapshot.data == null) {
              return const Center(child: Text('No data available'));
            } else {
              final items = snapshot.data!;

              return Column(
                children: [
                  buildDropdown(),
                  Expanded(
                    child: buildCinemaList(items),
                  ),
                ],
              );
            }
          }),
    );
  }

  Widget buildDropdown() {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: GestureDetector(
        onTap: _showSelectCity,
        child: Text(
          _selectedItem.label!,
          style: const TextStyle(color: Colors.white, fontSize: 15),
        ),
      ),
    );
  }

  Widget buildCinemaList(CinemaListResponse items) {
    return ListView.builder(
      padding: const EdgeInsets.all(8),
      itemCount: items.cinemas!.length,
      itemBuilder: (BuildContext context, int index) {
        final item = items.cinemas![index];

        return Column(
          children: [
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return CinemaDetail(
                        slug: utf8.decode(item.slug!.codeUnits),
                        distance: FlutterMapMath().distanceBetween(
                            latitude,
                            longitude,
                            double.parse(item.lat!),
                            double.parse(item.lng!),
                            'kilometers'),
                      );
                    },
                  ),
                );
              },
              child: CinemaItem(
                  item: item,
                  distance: FlutterMapMath().distanceBetween(
                      latitude,
                      longitude,
                      double.parse(item.lat!),
                      double.parse(item.lng!),
                      'kilometers')),
            ),
            const Divider(
              color: Colors.white,
            ),
          ],
        );
      },
    );
  }
}
