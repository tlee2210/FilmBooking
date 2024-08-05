class imageDescription {
  int? id;
  String? url;
  String? slug_name;

  imageDescription({this.id, this.url, this.slug_name});

  factory imageDescription.fromJson(Map<String, dynamic> json) {
    return imageDescription(
      id: json['id'],
      url: json['url'],
      slug_name: json['slug_name'],
    );
  }
}
