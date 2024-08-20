import 'package:flutter/material.dart';
import 'package:fllmbooking_app/data/models/select_option_reponse.dart';

class SelectCity extends StatefulWidget {
  final List<SelectOptionReponse> cities;

  const SelectCity({required this.cities});

  @override
  State<SelectCity> createState() => _SelectCityState();
}

class _SelectCityState extends State<SelectCity> {
  SelectOptionReponse _selectedItem = SelectOptionReponse(value: '', label: '');

  void _itemChange(SelectOptionReponse item) {
    setState(() {
      _selectedItem = item;
    });
  }

  void _cancel() {
    Navigator.pop(context);
  }

  void _submit() {
    Navigator.pop(context, _selectedItem);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: const Color(0xff1f1d2b),
      title: const Text(
        'City',
        style: TextStyle(color: Colors.white),
      ),
      content: SingleChildScrollView(
        child: ListBody(
          children: widget.cities.map((city) {
            return ListTile(
              title: Text(
                city.label!,
                style: const TextStyle(color: Colors.white),
              ),
              leading: Radio<String>(
                fillColor: MaterialStateColor.resolveWith(
                    (states) => const Color(0xff12CDD9)),
                value: city.value!,
                groupValue: _selectedItem.value!,
                onChanged: (String? value) {
                  if (value != null) {
                    _itemChange(city);
                  }
                },
              ),
            );
          }).toList(),
        ),
      ),
      actions: [
        TextButton(
          onPressed: _cancel,
          child: const Text(
            'Cancel',
            style: TextStyle(color: Color(0xff12CDD9)),
          ),
        ),
        ElevatedButton(
          onPressed: _submit,
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xff12CDD9),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18.0),
            ),
          ),
          child: const Text(
            'Submit',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ],
    );
  }
}
