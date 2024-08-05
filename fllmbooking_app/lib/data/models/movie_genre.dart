class MovieGenre {
  int? id;
  String? name;
  String? slug;

  MovieGenre({
    this.id,
    this.name,
    this.slug,
  });

  factory MovieGenre.fromJson(Map<String, dynamic> json) {
    return MovieGenre(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
    );
  }

  static List<MovieGenre> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => MovieGenre.fromJson(json)).toList();
  }
}
