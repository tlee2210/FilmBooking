import 'package:fllmbooking_app/data/models/MovieBlog.dart';
import 'package:fllmbooking_app/data/source/blog.dart';

abstract interface class Repositories {
  Future<List<MovieBlog>?> getAllMovieBlog();
  Future<MovieBlog?> getBlogDetail(String slug);
}

class BlogRepository implements Repositories {
  final BlogData _blogDataSource = BlogData();
  @override
  Future<List<MovieBlog>?> getAllMovieBlog() async {
    try {
      final value = await _blogDataSource.getAllBlog();
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }

  @override
  Future<MovieBlog?> getBlogDetail(String slug) async {
    try {
      final value = await _blogDataSource.getBlogDetail(slug);
      if (value != null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      throw Exception('Failed to get data: $e');
    }
  }
}
