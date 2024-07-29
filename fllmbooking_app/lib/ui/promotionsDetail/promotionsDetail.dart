import 'package:flutter/material.dart';

class PromotionsDetailPage extends StatefulWidget {
  const PromotionsDetailPage({super.key});

  @override
  State<PromotionsDetailPage> createState() => _MovieDetailPageState();
}

class _MovieDetailPageState extends State<PromotionsDetailPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Promotions Detail Page'),
      ),
      body: Center(
        child: Text('Promotions Detail Page'),
      ),
    );
  }
}
