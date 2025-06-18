package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.MovieGenre;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.MovieGenreRepository;
import com.cinemas.service.admin.MovieGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class MovieGenreServiceImpl implements MovieGenreService {
    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Override
    public Page<MovieGenre> getAllMovieGenre(SearchRequest searchRequest) {
        List<MovieGenre> movieGenreList;
        if (searchRequest.getSearchname() != null) {
            movieGenreList = movieGenreRepository.searchMovieGenre(searchRequest.getSearchname());
        } else {
            movieGenreList = movieGenreRepository.findAll();
        }

        PagedListHolder<MovieGenre> pagedListHolder = new PagedListHolder<MovieGenre>(movieGenreList);
        pagedListHolder.setPage(searchRequest.getPageNo());
        pagedListHolder.setPageSize(searchRequest.getPageSize());

        List<MovieGenre> pageList = pagedListHolder.getPageList();
        boolean ascending = searchRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(searchRequest.getSortByColumn(), true, ascending));

        Page<MovieGenre> movieGenres = new PageImpl<>(pageList, new PaginationHelper().getPageable(searchRequest), movieGenreList.size());

        return movieGenres;
    }

    @Override
    public MovieGenre getEditMovieGenreBySlug(String slug) {
        MovieGenre movieGenre = movieGenreRepository.findMovieGenreBySlug(slug);

        if (movieGenre == null) throw new AppException(NOT_FOUND);

        return movieGenre;
    }

    @Override
    public boolean addMovieGenre(MovieGenreRequest movieGenre) {
        if (movieGenreRepository.findByName(movieGenre.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        MovieGenre addMovieGenre = new MovieGenre();

        ObjectUtils.copyFields(movieGenre, addMovieGenre);
        addMovieGenre.setSlug(generateSlug(movieGenre.getName()));
//        addMovieGenre.setSlug(movieGenre.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
        movieGenreRepository.save(addMovieGenre);

        return true;
    }

    @Override
    public boolean updateMovieGenre(MovieGenreRequest movieGenre) {
        MovieGenre movie = movieGenreRepository
                .findById(movieGenre.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (movieGenreRepository.findByNameWithId(movieGenre.getName(), movieGenre.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(movieGenre, movie);
        String slug = generateSlug(movieGenre.getName());
//                movieGenre.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-");
        movie.setSlug(slug);

        movieGenreRepository.save(movie);

        return true;
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }

    @Override
    public Integer deleteMovieGenre(String slug) {
        MovieGenre movieGenre = movieGenreRepository.findMovieGenreBySlug(slug);

        if (movieGenre == null) throw new AppException(NOT_FOUND);

        movieGenreRepository.delete(movieGenre);
        Integer id = movieGenre.getId();
        return id;
    }
}
