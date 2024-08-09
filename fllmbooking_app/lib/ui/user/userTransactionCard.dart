
import 'package:fllmbooking_app/ui/user/userTransactionCardDetail.dart';
import 'package:flutter/material.dart';

import '../../data/models/Booking.dart';

class TransactionCard extends StatelessWidget {
  final Booking transaction;

  const TransactionCard({required this.transaction});

  void showDetail(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TransactionCardDetail(booking: transaction),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => showDetail(context),
      child: Card(
        margin: EdgeInsets.symmetric(vertical: 8.0),
        color: Color(0xFF252836),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        child: ListTile(
          contentPadding: EdgeInsets.all(8.0),
          leading: ClipRRect(
            borderRadius: BorderRadius.circular(8.0),
            child: Image.network(
              transaction.image,
              width: 50.0,
              height: 50.0,
              fit: BoxFit.cover,
            ),
          ),
          title: Text(
            transaction.movieName,
            style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
          ),
          subtitle: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 2.0),
                    decoration: BoxDecoration(
                      color: Colors.orange, // New background color
                      borderRadius: BorderRadius.circular(4.0),
                    ),
                    child: Text(
                      transaction.rules,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14.0,
                      ),
                    ),
                  ),
                  SizedBox(width: 8.0),
                  Text(
                    transaction.movieFormat,
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 14.0,
                    ),
                  ),
                ],
              ),
              Text(
                transaction.cinemaName,
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),
              Text(
                transaction.showTime + ", " + transaction.showTimeDate,
                style: TextStyle(
                  color: Colors.grey,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
