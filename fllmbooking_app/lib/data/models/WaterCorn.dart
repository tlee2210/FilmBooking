class WaterCorn {
  int id;
  String name;
  String slug;
  double price;
  String description;
  String image;

  WaterCorn({
    required this.id,
    required this.name,
    required this.slug,
    required this.price,
    required this.description,
    required this.image,
  });

  factory WaterCorn.fromJson(Map<String, dynamic> json) {
    return WaterCorn(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      price: json['price'].toDouble(),
      description: json['description'],
      image: json['image'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'slug': slug,
      'price': price,
      'description': description,
      'image': image,
    };
  }

  @override
  String toString() {
    return 'WaterCorn{id: $id, name: $name, slug: $slug, price: $price, description: $description, image: $image}';
  }
}
