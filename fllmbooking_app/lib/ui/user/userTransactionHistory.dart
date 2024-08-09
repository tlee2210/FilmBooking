import 'package:fllmbooking_app/ui/user/userTransactionCard.dart';
import 'package:flutter/material.dart';

import '../../data/models/Booking.dart';

class TransactionHistoryPage extends StatefulWidget {
  final List<Booking> bookingList;

  TransactionHistoryPage({required this.bookingList});

  @override
  State<TransactionHistoryPage> createState() => _TransactionHistoryPageState();
}

class _TransactionHistoryPageState extends State<TransactionHistoryPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1F1D2B),
      body: ListView.builder(
        padding: EdgeInsets.all(8.0),
        itemCount: widget.bookingList.length,
        itemBuilder: (context, index) {
          return TransactionCard(transaction: widget.bookingList[index]);
        },
      ),
    );
  }
}