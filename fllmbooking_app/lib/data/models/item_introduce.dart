class ItemIntroduce {
  final int id;
  final String name;
  final String slug;
  final String imagePortrait;
  final String trailer;

  ItemIntroduce({
    required this.id,
    required this.name,
    required this.slug,
    required this.imagePortrait,
    required this.trailer,
  });

  factory ItemIntroduce.fromJson(Map<String, dynamic> json) {
    return ItemIntroduce(
      id: json["id"] ?? 0,
      name: json["name"] ?? '',
      slug: json["slug"] ?? '',
      imagePortrait: json["imagePortrait"] ?? '',
      trailer: json["trailer"] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "name": name,
      "slug": slug,
      "imagePortrait": imagePortrait,
      "trailer": trailer,
    };
  }

  @override
  String toString() {
    return 'ItemIntroduce{id: $id, name: $name, slug: $slug, imagePortrait: $imagePortrait, trailer: $trailer}';
  }
}
