import 'package:fllmbooking_app/data/models/home_film_response.dart';
import 'package:fllmbooking_app/data/responsitories/movieResponsitories.dart';
import 'package:fllmbooking_app/ui/MovieDetail/MovieContent.dart';
import 'package:fllmbooking_app/ui/MovieDetail/MovieTrailerDialog.dart';
import 'package:fllmbooking_app/ui/MovieDetail/News.dart';
import 'package:fllmbooking_app/ui/MovieDetail/Showtime.dart';
import 'package:flutter/material.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class MovieDetailPage extends StatefulWidget {
  final String slug;
  const MovieDetailPage({required this.slug});

  @override
  _MovieDetailPageState createState() => _MovieDetailPageState();
}

class _MovieDetailPageState extends State<MovieDetailPage> {
  late Future<HomeFilmResponse?> _movies;
  YoutubePlayerController? _controller;
  final List<String> tabs = ['Showtime', 'Content', 'News'];
  int tabIndex = 0;
  late Widget _content;

  @override
  void initState() {
    super.initState();
    _content = ShowtimeWidget(slug: widget.slug);
    _movies = MovieResponsetories().getMovieDetail(widget.slug);
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  void _onTabSelect(int index) {
    setState(() {
      tabIndex = index;

      if (tabIndex == 0) {
        _content = ShowtimeWidget(slug: widget.slug);
      } else if (tabIndex == 1) {
        _content = MovieContent(
          item: _movies,
        );
      } else if (tabIndex == 2) {
        _content = MovieNews(
          item: _movies,
        );
      }
    });
  }

  void _showTrailer(String trailerUrl) {
    showDialog(
        context: context,
        builder: (context) {
          return Movietrailerdialog(
              trailerUrl: trailerUrl, controller: _controller);
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff1f1d2b),
      body: FutureBuilder<HomeFilmResponse?>(
        future: _movies,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data == null) {
            return const Center(child: Text('No data available'));
          } else {
            final movie = snapshot.data!;
            final genreText =
                movie.categories?.map((genre) => genre.name ?? '').join(', ') ??
                    '';
            final celebText =
                movie.actor?.map((celeb) => celeb.name ?? '').join(', ') ?? '';

            return CustomScrollView(
              slivers: [
                SliverAppBar(
                  backgroundColor: Colors.transparent,
                  expandedHeight: 250.0,
                  flexibleSpace: FlexibleSpaceBar(
                    background: Stack(
                      children: [
                        Center(
                          child: Image.network(
                            movie.imageLandscape ?? '',
                            fit: BoxFit.cover,
                          ),
                        ),
                        Center(
                          child: Container(
                            child: PhysicalModel(
                              borderRadius: BorderRadius.circular(30),
                              color: Colors.grey.withOpacity(0.5),
                              child: IconButton(
                                icon: const Icon(Icons.play_arrow,
                                    color: Colors.white, size: 40),
                                onPressed: () {
                                  _showTrailer(movie.trailer ?? '');
                                },
                              ),
                            ),
                          ),
                        )
                      ],
                    ),
                  ),
                  leading: IconButton(
                    icon: const Icon(Icons.arrow_back, color: Colors.white),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8.0),
                              child: Image.network(
                                movie.imagePortrait ?? '',
                                fit: BoxFit.cover,
                                height: 180,
                                width: 120,
                              ),
                            ),
                            const SizedBox(
                              width: 10.0,
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    movie.name ?? '',
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 16),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.access_time_filled_outlined,
                                        color: Colors.cyanAccent,
                                      ),
                                      const SizedBox(
                                        width: 4,
                                      ),
                                      Text(
                                        "${movie.duration_movie.toString()} min",
                                        style: const TextStyle(
                                          color: Colors.white,
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 8,
                                      ),
                                      const Icon(
                                        Icons.calendar_month_sharp,
                                        color: Colors.cyanAccent,
                                      ),
                                      const SizedBox(
                                        width: 4,
                                      ),
                                      Text(
                                        '${movie.releaseDate?.day}-${movie.releaseDate?.month}-${movie.releaseDate?.year}',
                                        style: const TextStyle(
                                          color: Colors.white,
                                        ),
                                      ),
                                      if (movie.rules != null &&
                                          movie.rules!.isNotEmpty)
                                        Container(
                                          margin:
                                              const EdgeInsets.only(left: 8.0),
                                          padding: const EdgeInsets.symmetric(
                                            horizontal: 8,
                                            vertical: 2,
                                          ),
                                          decoration: BoxDecoration(
                                            color: Colors.cyanAccent,
                                            borderRadius:
                                                BorderRadius.circular(4),
                                            border: Border.all(
                                              color: Colors.cyanAccent,
                                            ),
                                          ),
                                          child: Text(
                                            "T${movie.rules}",
                                            style: const TextStyle(
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        )
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.movie,
                                        color: Colors.cyanAccent,
                                      ),
                                      const SizedBox(
                                        width: 4,
                                      ),
                                      Expanded(
                                          child: Text(
                                        genreText,
                                        style: const TextStyle(
                                          color: Colors.white,
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      )),
                                    ],
                                  ),
                                  const SizedBox(
                                    height: 8,
                                  ),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.videocam,
                                        color: Colors.cyanAccent,
                                      ),
                                      const SizedBox(
                                        width: 4,
                                      ),
                                      Expanded(
                                        child: Text(
                                          movie.producer ?? '',
                                          style: const TextStyle(
                                            color: Colors.white,
                                          ),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(
                                    height: 8,
                                  ),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.person,
                                        color: Colors.cyanAccent,
                                      ),
                                      const SizedBox(
                                        width: 4,
                                      ),
                                      Expanded(
                                        child: Text(
                                          celebText,
                                          style: const TextStyle(
                                            color: Colors.white,
                                          ),
                                          maxLines: 2,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 10.0,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: List.generate(tabs.length, (index) {
                            return GestureDetector(
                              onTap: () {
                                _onTabSelect(index);
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8.0, horizontal: 16.0),
                                decoration: BoxDecoration(
                                  color: tabIndex == index
                                      ? Colors.cyanAccent.withOpacity(0.1)
                                      : Colors.transparent,
                                  borderRadius: BorderRadius.circular(16.0),
                                ),
                                child: Text(
                                  tabs[index],
                                  style: TextStyle(
                                    color: tabIndex == index
                                        ? Colors.cyanAccent
                                        : Colors.white,
                                  ),
                                ),
                              ),
                            );
                          }),
                        ),
                        const SizedBox(
                          height: 10.0,
                        ),
                        _content,
                      ],
                    ),
                  ),
                ),
              ],
            );
          }
        },
      ),
    );
  }
}
