enum RoleCeleb { ACTOR, DIRECTOR }

class Celebrity {
  int? id;
  String? name;
  String? description;
  DateTime? dateOfBirth;
  String? biography;
  RoleCeleb? role;
  String? image;
  int? countryId;
  String? slug;
  int? view;

  Celebrity({
    this.id,
    this.name,
    this.description,
    this.dateOfBirth,
    this.biography,
    this.role,
    this.image,
    this.countryId,
    this.slug,
    this.view,
  });

  factory Celebrity.fromJson(Map<String, dynamic> json) {
    return Celebrity(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      dateOfBirth: json['dateOfBirth'] != null
          ? DateTime.parse(json['dateOfBirth'])
          : null,
      biography: json['biography'],
      role: json['role'],
      image: json['image'],
      countryId: json['countryId'],
      slug: json['slug'],
      view: json['view'],
    );
  }

  static List<Celebrity> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => Celebrity.fromJson(json)).toList();
  }
}
