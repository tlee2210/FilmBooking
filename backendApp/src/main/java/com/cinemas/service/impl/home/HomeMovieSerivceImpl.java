package com.cinemas.service.impl.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchMovieHome;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieGenre;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.CountryRepository;
import com.cinemas.repositories.MovieGenreRepository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.service.home.HomeMovieSerivce;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class HomeMovieSerivceImpl implements HomeMovieSerivce {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CelebrityRepository celebrityRepository;

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public SelectOptionAndModelReponse<Page<Movie>> getMovieActive(SearchMovieHome paginationHelper) {
        List<Movie> movieList = movieRepository.findMovieByStatus(paginationHelper.getName(), MovieStatus.NOW_SHOWING);

        movieList.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });

        PagedListHolder<Movie> pagedListHolder = new PagedListHolder<Movie>(movieList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Movie> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Movie> movies = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), movieList.size());

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();

        for (MovieStatus movieStatus : MovieStatus.values()) {
            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
        }

        return new SelectOptionAndModelReponse<>(optionsStatus, movies);
    }

    @Override
    public SelectOptionAndModelReponse<Page<Movie>> getMovieSoon(SearchMovieHome paginationHelper) {
        List<Movie> movieList = movieRepository.findMovieByStatus(paginationHelper.getName(), MovieStatus.COMING_SOON);

        movieList.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });

        PagedListHolder<Movie> pagedListHolder = new PagedListHolder<Movie>(movieList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Movie> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Movie> movies = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), movieList.size());

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();

        for (MovieStatus movieStatus : MovieStatus.values()) {
            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
        }

        return new SelectOptionAndModelReponse<>(optionsStatus, movies);
    }

    @Override
    public SelectOptionMovie<Movie> getMoiveBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));

        List<SelectOptionReponse> optionsCategory = new ArrayList<>();
        List<MovieGenre> categories = movieGenreRepository.findAll();

        for (MovieGenre category : categories) {
            optionsCategory.add(new SelectOptionReponse(category.getId(), category.getName()));
        }

        List<SelectOptionReponse> optionsActor = new ArrayList<>();
        List<Celebrity> actors = celebrityRepository.findByRole(RoleCeleb.ACTOR);

        for (Celebrity actor : actors) {
            optionsActor.add(new SelectOptionReponse(actor.getId(), actor.getName()));
        }

        List<SelectOptionReponse> optionsDirector = new ArrayList<>();
        List<Celebrity> directors = celebrityRepository.findByRole(RoleCeleb.DIRECTOR);

        for (Celebrity director : directors) {
            optionsDirector.add(new SelectOptionReponse(director.getId(), director.getName()));
        }

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();

        for (MovieStatus movieStatus : MovieStatus.values()) {
            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
        }

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor, optionsStatus, optionsCountries, movie);
    }
}
