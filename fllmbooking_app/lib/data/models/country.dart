class Country {
  int? id;
  String? name;
  String? slug;

  Country({
    this.id,
    this.name,
    this.slug,
  });

  factory Country.fromJson(Map<String, dynamic> json) {
    return Country(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
    );
  }
}
