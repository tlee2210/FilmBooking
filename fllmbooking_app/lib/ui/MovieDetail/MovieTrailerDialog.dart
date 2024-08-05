import 'package:flutter/material.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class Movietrailerdialog extends StatelessWidget {
  final String trailerUrl;
  late YoutubePlayerController? controller;
  Movietrailerdialog({required this.trailerUrl, this.controller});

  @override
  Widget build(BuildContext context) {
    final videoId = YoutubePlayer.convertUrlToId(trailerUrl);
    if (videoId != null) {
      controller = YoutubePlayerController(
        initialVideoId: videoId,
        flags: const YoutubePlayerFlags(
          mute: false,
        ),
      );
    }
    return Container(
      padding: const EdgeInsets.only(left: 15, right: 15),
      child: Center(
        child: Stack(
          children: [
            if (controller != null)
              YoutubePlayerBuilder(
                player: YoutubePlayer(
                  controller: controller!,
                  showVideoProgressIndicator: true,
                ),
                builder: (context, player) {
                  return player;
                },
              ),
            Positioned(
              top: 0,
              right: 0,
              child: IconButton(
                icon: const Icon(Icons.close, color: Colors.white, size: 30),
                onPressed: () {
                  controller?.dispose();
                  Navigator.of(context).pop();
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
