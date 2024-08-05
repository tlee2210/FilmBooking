class SelectOptionReponse<T> {
  T? value;
  String? label;

  SelectOptionReponse({required this.value, required this.label});

  factory SelectOptionReponse.fromJson(Map<String, dynamic> json) {
    return SelectOptionReponse(
      value: json['value'],
      label: json['label'],
    );
  }
}
