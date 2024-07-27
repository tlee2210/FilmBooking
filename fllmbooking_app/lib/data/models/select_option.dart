class SelectOption {
  String value;
  String label;

  SelectOption({required this.value, required this.label});

  factory SelectOption.fromJson(Map<String, dynamic> json) {
    return SelectOption(
      value: json["value"] as String,
      label: json["label"] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "value": this.value,
      "label": this.label,
    };
  }

  @override
  String toString() {
    return 'SelectOption{value: $value, label: $label}';
  }
}
