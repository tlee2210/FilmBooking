import 'package:fllmbooking_app/ui/MovieDetail/PreviewImage.dart';
import 'package:flutter/material.dart';

class Galleryimage extends StatefulWidget {
  final String imageUrl;
  const Galleryimage({required this.imageUrl});

  @override
  State<Galleryimage> createState() => _GalleryimageState();
}

class _GalleryimageState extends State<Galleryimage> {
  void _showImagePreview(String imageUrl) {
    showDialog(
      context: context,
      builder: (context) {
        return Previewimage(imageUrl: imageUrl);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: GestureDetector(
        onTap: () {
          _showImagePreview(widget.imageUrl);
        },
        child: ClipRRect(
          borderRadius: BorderRadius.circular(8.0),
          child: Image.network(
            widget.imageUrl,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
