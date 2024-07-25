class Homegenerated {
  int? _code;
  Result? _result;

  @override
  String toString() {
    return 'Homegenerated{_code: $_code, _result: $_result}';
  }

  Autogenerated({int? code, Result? result}) {
    if (code != null) {
      this._code = code;
    }
    if (result != null) {
      this._result = result;
    }
  }

  int? get code => _code;

  set code(int? code) => _code = code;

  Result? get result => _result;

  set result(Result? result) => _result = result;

  Homegenerated.fromJson(Map<String, dynamic> json) {
    _code = json['code'];
    _result =
        json['result'] != null ? new Result.fromJson(json['result']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['code'] = this._code;
    if (this._result != null) {
      data['result'] = this._result!.toJson();
    }
    return data;
  }
}

class Result {
  List<MovieShowingList>? _movieShowingList;
  List<MovieSoonList>? _movieSoonList;
  List<MovieBlogList>? _movieBlogList;
  List<ReviewList>? _reviewList;

  Result(
      {List<MovieShowingList>? movieShowingList,
      List<MovieSoonList>? movieSoonList,
      List<MovieBlogList>? movieBlogList,
      List<ReviewList>? reviewList}) {
    if (movieShowingList != null) {
      this._movieShowingList = movieShowingList;
    }
    if (movieSoonList != null) {
      this._movieSoonList = movieSoonList;
    }
    if (movieBlogList != null) {
      this._movieBlogList = movieBlogList;
    }
    if (reviewList != null) {
      this._reviewList = reviewList;
    }
  }

  List<MovieShowingList>? get movieShowingList => _movieShowingList;

  set movieShowingList(List<MovieShowingList>? movieShowingList) =>
      _movieShowingList = movieShowingList;

  List<MovieSoonList>? get movieSoonList => _movieSoonList;

  set movieSoonList(List<MovieSoonList>? movieSoonList) =>
      _movieSoonList = movieSoonList;

  List<MovieBlogList>? get movieBlogList => _movieBlogList;

  set movieBlogList(List<MovieBlogList>? movieBlogList) =>
      _movieBlogList = movieBlogList;

  List<ReviewList>? get reviewList => _reviewList;

  set reviewList(List<ReviewList>? reviewList) => _reviewList = reviewList;

  Result.fromJson(Map<String, dynamic> json) {
    if (json['movieShowingList'] != null) {
      _movieShowingList = <MovieShowingList>[];
      json['movieShowingList'].forEach((v) {
        _movieShowingList!.add(new MovieShowingList.fromJson(v));
      });
    }
    if (json['movieSoonList'] != null) {
      _movieSoonList = <MovieSoonList>[];
      json['movieSoonList'].forEach((v) {
        _movieSoonList!.add(new MovieSoonList.fromJson(v));
      });
    }
    if (json['movieBlogList'] != null) {
      _movieBlogList = <MovieBlogList>[];
      json['movieBlogList'].forEach((v) {
        _movieBlogList!.add(new MovieBlogList.fromJson(v));
      });
    }
    if (json['reviewList'] != null) {
      _reviewList = <ReviewList>[];
      json['reviewList'].forEach((v) {
        _reviewList!.add(new ReviewList.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this._movieShowingList != null) {
      data['movieShowingList'] =
          this._movieShowingList!.map((v) => v.toJson()).toList();
    }
    if (this._movieSoonList != null) {
      data['movieSoonList'] =
          this._movieSoonList!.map((v) => v.toJson()).toList();
    }
    if (this._movieBlogList != null) {
      data['movieBlogList'] =
          this._movieBlogList!.map((v) => v.toJson()).toList();
    }
    if (this._reviewList != null) {
      data['reviewList'] = this._reviewList!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class MovieShowingList {
  int? _id;
  String? _name;
  String? _slug;
  String? _imagePortrait;
  String? _trailer;

  MovieShowingList(
      {int? id,
      String? name,
      String? slug,
      String? imagePortrait,
      String? trailer}) {
    if (id != null) {
      this._id = id;
    }
    if (name != null) {
      this._name = name;
    }
    if (slug != null) {
      this._slug = slug;
    }
    if (imagePortrait != null) {
      this._imagePortrait = imagePortrait;
    }
    if (trailer != null) {
      this._trailer = trailer;
    }
  }

  int? get id => _id;

  set id(int? id) => _id = id;

  String? get name => _name;

  set name(String? name) => _name = name;

  String? get slug => _slug;

  set slug(String? slug) => _slug = slug;

  String? get imagePortrait => _imagePortrait;

  set imagePortrait(String? imagePortrait) => _imagePortrait = imagePortrait;

  String? get trailer => _trailer;

  set trailer(String? trailer) => _trailer = trailer;

  MovieShowingList.fromJson(Map<String, dynamic> json) {
    _id = json['id'];
    _name = json['name'];
    _slug = json['slug'];
    _imagePortrait = json['imagePortrait'];
    _trailer = json['trailer'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this._id;
    data['name'] = this._name;
    data['slug'] = this._slug;
    data['imagePortrait'] = this._imagePortrait;
    data['trailer'] = this._trailer;
    return data;
  }
}

class MovieSoonList {
  int? _id;
  String? _name;
  String? _slug;
  String? _imagePortrait;
  String? _trailer;

  MovieSoonList(
      {int? id,
      String? name,
      String? slug,
      String? imagePortrait,
      String? trailer}) {
    if (id != null) {
      this._id = id;
    }
    if (name != null) {
      this._name = name;
    }
    if (slug != null) {
      this._slug = slug;
    }
    if (imagePortrait != null) {
      this._imagePortrait = imagePortrait;
    }
    if (trailer != null) {
      this._trailer = trailer;
    }
  }

  int? get id => _id;

  set id(int? id) => _id = id;

  String? get name => _name;

  set name(String? name) => _name = name;

  String? get slug => _slug;

  set slug(String? slug) => _slug = slug;

  String? get imagePortrait => _imagePortrait;

  set imagePortrait(String? imagePortrait) => _imagePortrait = imagePortrait;

  String? get trailer => _trailer;

  set trailer(String? trailer) => _trailer = trailer;

  MovieSoonList.fromJson(Map<String, dynamic> json) {
    _id = json['id'];
    _name = json['name'];
    _slug = json['slug'];
    _imagePortrait = json['imagePortrait'];
    _trailer = json['trailer'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this._id;
    data['name'] = this._name;
    data['slug'] = this._slug;
    data['imagePortrait'] = this._imagePortrait;
    data['trailer'] = this._trailer;
    return data;
  }
}

class MovieBlogList {
  int? _id;
  String? _name;
  String? _slug;
  String? _imagePortrait;

  MovieBlogList({int? id, String? name, String? slug, String? imagePortrait}) {
    if (id != null) {
      this._id = id;
    }
    if (name != null) {
      this._name = name;
    }
    if (slug != null) {
      this._slug = slug;
    }
    if (imagePortrait != null) {
      this._imagePortrait = imagePortrait;
    }
  }

  int? get id => _id;

  set id(int? id) => _id = id;

  String? get name => _name;

  set name(String? name) => _name = name;

  String? get slug => _slug;

  set slug(String? slug) => _slug = slug;

  String? get imagePortrait => _imagePortrait;

  set imagePortrait(String? imagePortrait) => _imagePortrait = imagePortrait;

  MovieBlogList.fromJson(Map<String, dynamic> json) {
    _id = json['id'];
    _name = json['name'];
    _slug = json['slug'];
    _imagePortrait = json['imagePortrait'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this._id;
    data['name'] = this._name;
    data['slug'] = this._slug;
    data['imagePortrait'] = this._imagePortrait;
    return data;
  }
}

class ReviewList {
  int? _id;
  String? _content;
  String? _author;

  ReviewList({int? id, String? content, String? author}) {
    if (id != null) {
      this._id = id;
    }
    if (content != null) {
      this._content = content;
    }
    if (author != null) {
      this._author = author;
    }
  }

  int? get id => _id;

  set id(int? id) => _id = id;

  String? get content => _content;

  set content(String? content) => _content = content;

  String? get author => _author;

  set author(String? author) => _author = author;

  ReviewList.fromJson(Map<String, dynamic> json) {
    _id = json['id'];
    _content = json['content'];
    _author = json['author'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this._id;
    data['content'] = this._content;
    data['author'] = this._author;
    return data;
  }
}
