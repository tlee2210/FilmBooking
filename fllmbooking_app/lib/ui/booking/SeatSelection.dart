import 'package:flutter/material.dart';

class SeatSelectionScreen extends StatefulWidget {
  @override
  _SeatSelectionScreenState createState() => _SeatSelectionScreenState();
}

class _SeatSelectionScreenState extends State<SeatSelectionScreen> {
  int seatColumns = 14; // Số cột của ghế đơn
  int seatRows = 7; // Số hàng của ghế đơn
  int doubleSeatColumns = 7; // Số cặp ghế đôi
  int doubleSeatRows = 2; // Số hàng của ghế đôi
  int totalColumns = 3; // Chia số cột ghế chia ra làm ba bên

  // Kích thước ghế đơn
  double seatHeight = 40.0;
  double seatWidth = 40.0;

  // Tạo một lưới ghế ngồi
  List<List<bool>> seats = [];
  List<List<bool>> doubleSeats = [];

  @override
  void initState() {
    super.initState();
    seats = List.generate(
        seatRows, (i) => List.generate(seatColumns, (j) => false));
    doubleSeats = List.generate(
        doubleSeatRows, (i) => List.generate(doubleSeatColumns, (j) => false));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chọn Ghế'),
      ),
      body: Column(
        children: [
          // Render ghế đôi trước
          GridView.builder(
            shrinkWrap: true,
            padding: EdgeInsets.all(4),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: doubleSeatColumns, // Số cột cho ghế đôi
              mainAxisSpacing: 4,
              crossAxisSpacing: 4,
              childAspectRatio: 2, // Đảm bảo ghế đôi rộng gấp đôi ghế đơn
            ),
            itemCount: doubleSeatRows * doubleSeatColumns,
            itemBuilder: (context, idx) {
              int row = idx ~/ doubleSeatColumns;
              int col = idx % doubleSeatColumns;

              // Xác định nhãn ghế đôi dựa trên index
              // String seatLabel = 'G${idx * 2 + 1}-${idx * 2 + 2}';
              // String seatLabel = '${String.fromCharCode(65 + (seatRows +seatColumns - 1 - row))}${col + 1}';
              String seatLabel =
                  '${String.fromCharCode(65 + seatRows + row)}${col * 2 + 1}-${col * 2 + 2}';

              return GestureDetector(
                onTap: () {
                  setState(() {
                    doubleSeats[row][col] = !doubleSeats[row][col];
                  });
                },
                child: Container(
                  height: seatHeight, // Chiều cao ghế đôi bằng ghế đơn
                  width: seatWidth, // Chiều rộng ghế đôi gấp đôi ghế đơn
                  decoration: BoxDecoration(
                    color: doubleSeats[row][col] ? Colors.blue : Colors.white,
                    border: Border.all(color: Colors.black),
                  ),
                  // child: Center(child: Text(seatLabel)),
                  child: Center(child: Container()), // Giữ ô trắng mà không có nội dung

                ),
              );
            },
          ),
          // Render ghế đơn
          GridView.builder(
            shrinkWrap: true,
            padding: EdgeInsets.all(4),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: seatColumns, // Số cột cho ghế đôi
              mainAxisSpacing: 4,
              crossAxisSpacing: 4,
              childAspectRatio: 2, // Đảm bảo ghế đôi rộng gấp đôi ghế đơn
            ),
            itemCount: seatRows * seatColumns,
            itemBuilder: (context, idx) {
              int row = idx ~/ seatColumns;
              int col = idx % seatColumns;

              // Xác định nhãn ghế đôi dựa trên index
              // String seatLabel = '${idx * 2 + 1}-${idx * 2 + 2}';
              String seatLabel =
                  '${String.fromCharCode(65 + (seatRows - 1 - row))}${col + 1}';
              return GestureDetector(
                onTap: () {
                  setState(() {
                    seats[row][col] = !seats[row][col];
                  });
                },
                child: Container(
                  height: seatHeight, // Chiều cao ghế đôi bằng ghế đơn
                  width: seatWidth, // Chiều rộng ghế đôi gấp đôi ghế đơn
                  decoration: BoxDecoration(
                    color: seats[row][col] ? Colors.orange : Colors.white,
                    border: Border.all(color: Colors.black),
                  ),
                  // child: Center(child: Text(seatLabel)),
                  child: Center(child: Container()), // Giữ ô trắng mà không có nội dung
                ),
              );
            },
          ),
          // Expanded(
          //   child: Center(
          //     child: GridView.builder(
          //       shrinkWrap: true,
          //       padding: EdgeInsets.all(4),
          //       gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          //         crossAxisCount: seatColumns ~/ totalColumns, // Chia cột ghế đơn ra làm 3 phần
          //         mainAxisSpacing: 4,
          //         crossAxisSpacing: 4,
          //         childAspectRatio: 1, // Đảm bảo tỷ lệ chiều cao/chiều rộng cho ghế đơn
          //       ),
          //       itemCount: seatRows * seatColumns,
          //       itemBuilder: (context, idx) {
          //         int row = idx ~/ seatColumns;
          //         int col = idx % seatColumns;
          //
          //         // Sử dụng cùng một index để in nhãn ghế đơn
          //         String seatLabel = '${String.fromCharCode(65 + (seatRows - 1 - row))}${col + 1}';
          //
          //         return GestureDetector(
          //           onTap: () {
          //             setState(() {
          //               seats[row][col] = !seats[row][col];
          //             });
          //           },
          //           child: Container(
          //             height: seatHeight, // Chiều cao ghế đơn
          //             width: seatWidth, // Chiều rộng ghế đơn
          //             decoration: BoxDecoration(
          //               color: seats[row][col] ? Colors.orange : Colors.white,
          //               border: Border.all(color: Colors.black),
          //             ),
          //             child: Center(child: Text(seatLabel)),
          //           ),
          //         );
          //       },
          //     ),
          //   ),
          // ),
          Padding(
            padding: EdgeInsets.all(16),
            child: ElevatedButton(
              onPressed: () {
                // Tạo danh sách để lưu tên các ghế đã chọn
                List<String> selectedSeatNames = [];

// Đếm và lưu tên ghế đơn đã chọn
                for (int i = 0; i < seats.length; i++) {
                  for (int j = 0; j < seats[i].length; j++) {
                    if (seats[i][j]) {
                      String seatLabel =
                          '${String.fromCharCode(65 + (seatRows - 1 - i))}${j + 1}';
                      selectedSeatNames.add(seatLabel);
                    }
                  }
                }

// Đếm và lưu tên ghế đôi đã chọn
                for (int i = 0; i < doubleSeats.length; i++) {
                  for (int j = 0; j < doubleSeats[i].length; j++) {
                    if (doubleSeats[i][j]) {
                      String seatLabel = 'G${j * 2 + 1}-${j * 2 + 2}';
                      selectedSeatNames.add(seatLabel);
                    }
                  }
                }

// Hiển thị tên các ghế đã chọn
                String selectedSeatsMessage = selectedSeatNames.isNotEmpty
                    ? 'Bạn đã chọn các ghế: ${selectedSeatNames.join(", ")}.'
                    : 'Bạn chưa chọn ghế nào.';

                showDialog(
                  context: context,
                  builder: (context) {
                    return AlertDialog(
                      title: Text('Ghế đã chọn'),
                      content: Text(selectedSeatsMessage),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: Text('OK'),
                        ),
                      ],
                    );
                  },
                );
              },
              child: Text('Tiếp tục'),
            ),
          ),
        ],
      ),
    );
  }
}
