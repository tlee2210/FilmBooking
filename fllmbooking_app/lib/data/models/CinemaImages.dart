class CinemaImages{
  int? uid;
  String? url;
  String? cinemaId;

  CinemaImages({required this.uid, required this.url, required this.cinemaId});

  factory CinemaImages.fromJson(Map<String, dynamic> json) {
    return CinemaImages(
      uid: json['uid'],
      url: json['url'],
      cinemaId: json['cinemaId'],
    );
  }
}