class Review {
  int? id;
  String? name;
  String? slug;
  String? description;
  String? thumbnail;
  int? view;
  // ReviewType? type;

  Review({
    this.id,
    this.name,
    this.slug,
    this.description,
    this.thumbnail,
    this.view,
    // this.type,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      description: json['description'],
      thumbnail: json['thumbnail'],
      view: json['view'],
      // type: json['type'],
    );
  }
}
