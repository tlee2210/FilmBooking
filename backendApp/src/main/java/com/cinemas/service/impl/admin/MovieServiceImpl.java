package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;

import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.*;
import com.cinemas.service.admin.MovieService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CelebrityRepository celebrityRepository;

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Autowired
    private PriceMovieResponsetory priceMovieResponsetory;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public SelectOptionAndModelReponse<Page<Movie>> getAllMovie(SearchMovie paginationHelper) {
        List<Movie> movieList = movieRepository.searchMovie(paginationHelper.getName(), paginationHelper.getCountryId(), paginationHelper.getMovieStatus());

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

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        return new SelectOptionAndModelReponse<>(movies, optionsCountries, optionsStatus);
    }

    @Override
    public SelectOptionMovie<?> getCreateMovie() {
//        List<SelectOptionReponse> optionsCategory = new ArrayList<>();
//        List<MovieGenre> categories = movieGenreRepository.findAll();
//
//        for (MovieGenre category : categories) {
////            optionsCategory.add(new SelectOptionReponse(category.getId(), category.getName()));
//            optionsCategory.add(SelectOptionReponse.builder()
//                    .value(category.getId())
//                    .label(category.getName())
//                    .build());
//        }
        List<SelectOptionReponse> optionsCategory = getMovieGenreOptions();
//        List<SelectOptionReponse> optionsActor = new ArrayList<>();
//        List<Celebrity> actors = celebrityRepository.findByRole(RoleCeleb.ACTOR);

//        for (Celebrity actor : actors) {
////            optionsActor.add(new SelectOptionReponse(actor.getId(), actor.getName()));
//            optionsActor.add(SelectOptionReponse.builder()
//                    .value(actor.getId())
//                    .label(actor.getName())
//                    .build());
//        }
        List<SelectOptionReponse> optionsActor = getCelebrityOptions(RoleCeleb.ACTOR);
//        List<SelectOptionReponse> optionsDirector = new ArrayList<>();
//        List<Celebrity> directors = celebrityRepository.findByRole(RoleCeleb.DIRECTOR);
//
//        for (Celebrity director : directors) {
////            optionsDirector.add(new SelectOptionReponse(director.getId(), director.getName()));
//            optionsDirector.add(SelectOptionReponse.builder()
//                    .value(director.getId())
//                    .label(director.getName())
//                    .build());
//        }
        List<SelectOptionReponse> optionsDirector = getCelebrityOptions(RoleCeleb.DIRECTOR);
//        List<SelectOptionReponse> optionsStatus = new ArrayList<>();
//
//        for (MovieStatus movieStatus : MovieStatus.values()) {
////            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
//            optionsStatus.add(SelectOptionReponse.builder()
//                    .value(movieStatus.name())
//                    .label(movieStatus.getValue())
//                    .build());
//        }
        List<SelectOptionReponse> optionsStatus = getMovieStatusOptions();
//        List<Country> countryList = countryRepository.findAll();
//        List<SelectOptionReponse> optionsCountries = new ArrayList<>();
//
//        for (Country country : countryList) {
////            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
//            optionsCountries.add(SelectOptionReponse.builder()
//                    .value(country.getId())
//                    .label(country.getName())
//                    .build());
//        }

        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor, optionsStatus, getCountryOptions());
    }

    @Override
    public boolean addMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = new Movie();
        if (movieRepository.findByName(movieRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        //set image
        movie.setImageLandscape(fileStorageServiceImpl.uploadFile(movieRequest.getImageLandscape(), "movie"));
        movie.setImagePortrait(fileStorageServiceImpl.uploadFile(movieRequest.getImagePortrait(), "movie"));

        populateMovieEntity(movie, movieRequest);
//        ObjectUtils.copyFields(movieRequest, movie);
//        movie.setStatus(movieRequest.getStatus());
//        movie.setSlug(generateSlug(movieRequest.getName()));
//        movie.setCountry(countryRepository.findById(movieRequest.getCountryId()));
//
//        //set movie genre
//        List<MovieGenre> genres = movieRequest.getCategoriesIds().stream().map(id -> movieGenreRepository.getById(id))
//                .collect(Collectors.toList());
//        movie.setCategories(genres);
//
//        //set celebrity
//        List<Celebrity> actors = movieRequest.getActorId().stream().map(id -> celebrityRepository.getById(id))
//                .collect(Collectors.toList());
//        movie.setActor(actors);
//
//        List<Celebrity> directors = movieRequest.getDirectorId().stream().map(id -> celebrityRepository.getById(id))
//                .collect(Collectors.toList());
//        movie.setDirector(directors);
//
//        if (movieRequest.getPrices() != null) {
//            List<PriceMovie> prices = new ArrayList<>();
//
//            movieRequest.getPrices().forEach(price -> {
////                PriceMovie priceMovie = new PriceMovie(price.getDate(), price.getPrice());
//                PriceMovie priceMovie = PriceMovie.builder()
//                        .date(price.getDate())
//                        .price(price.getPrice())
//                        .movie(movie)
//                        .build();
//                prices.add(priceMovie);
//            });
//
//            movie.setPriceMovies(prices);
//        }
        movieRepository.save(movie);

        return true;
    }

    @Override
    public Integer deleteMovie(String slug) throws IOException {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(movie.getImageLandscape());
        fileStorageServiceImpl.deleteFile(movie.getImagePortrait());
        movieRepository.delete(movie);
        return movie.getId();
    }

    @Override
    public SelectOptionMovie<Movie> getEditCelebrityBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);
        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
//        List<SelectOptionReponse> optionsCategory = new ArrayList<>();
//        List<MovieGenre> categories = movieGenreRepository.findAll();
//
//        for (MovieGenre category : categories) {
//            optionsCategory.add(new SelectOptionReponse(category.getId(), category.getName()));
//        }
        List<SelectOptionReponse> optionsCategory = getMovieGenreOptions();
//        List<SelectOptionReponse> optionsActor = new ArrayList<>();
//        List<Celebrity> actors = celebrityRepository.findByRole(RoleCeleb.ACTOR);
//
//        for (Celebrity actor : actors) {
//            optionsActor.add(new SelectOptionReponse(actor.getId(), actor.getName()));
//        }
        List<SelectOptionReponse> optionsActor = getCelebrityOptions(RoleCeleb.ACTOR);
//        List<SelectOptionReponse> optionsDirector = new ArrayList<>();
//        List<Celebrity> directors = celebrityRepository.findByRole(RoleCeleb.DIRECTOR);
//
//        for (Celebrity director : directors) {
//            optionsDirector.add(new SelectOptionReponse(director.getId(), director.getName()));
//        }
        List<SelectOptionReponse> optionsDirector = getCelebrityOptions(RoleCeleb.DIRECTOR);
//        List<SelectOptionReponse> optionsStatus = new ArrayList<>();
//
//        for (MovieStatus movieStatus : MovieStatus.values()) {
//            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
//        }
        List<SelectOptionReponse> optionsStatus = getMovieStatusOptions();
//        List<Country> countryList = countryRepository.findAll();
//        List<SelectOptionReponse> optionsCountries = new ArrayList<>();
//
//        for (Country country : countryList) {
//            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
//        }
        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor, optionsStatus, getCountryOptions(), movie);
    }

    private List<SelectOptionReponse> getMovieGenreOptions() {
        return movieGenreRepository.findAll().stream()
                .map(category -> SelectOptionReponse.builder()
                        .value(category.getId())
                        .label(category.getName())
                        .build())
                .collect(Collectors.toList());
    }

    private List<SelectOptionReponse> getCelebrityOptions(RoleCeleb role) {
        return celebrityRepository.findByRole(role).stream()
                .map(celeb -> SelectOptionReponse.builder()
                        .value(celeb.getId())
                        .label(celeb.getName())
                        .build())
                .collect(Collectors.toList());
    }

    private List<SelectOptionReponse> getMovieStatusOptions() {
        return Arrays.stream(MovieStatus.values())
                .map(status -> SelectOptionReponse.builder()
                        .value(status.name())
                        .label(status.getValue())
                        .build())
                .collect(Collectors.toList());
    }

    private List<SelectOptionReponse> getCountryOptions() {
        return countryRepository.findAll().stream()
                .map(country -> SelectOptionReponse.builder()
                        .value(country.getId())
                        .label(country.getName())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public boolean updateMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = movieRepository.findById(movieRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (movieRepository.findByNameWithId(movieRequest.getName(), movieRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (movieRequest.getImageLandscape() != null && !movieRequest.getImageLandscape().isEmpty()) {
            fileStorageServiceImpl.deleteFile(movie.getImageLandscape());
            movie.setImageLandscape(fileStorageServiceImpl.uploadFile(movieRequest.getImageLandscape(), "movie"));
        }

        if (movieRequest.getImagePortrait() != null && !movieRequest.getImagePortrait().isEmpty()) {
            fileStorageServiceImpl.deleteFile(movie.getImagePortrait());
            movie.setImagePortrait(fileStorageServiceImpl.uploadFile(movieRequest.getImagePortrait(), "movie"));
        }

        populateMovieEntity(movie, movieRequest);
//        //set slug
////        movie.setSlug(movieRequest.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
//        movie.setSlug(generateSlug(movieRequest.getName()));
//        //set country
//        movie.setCountry(countryRepository.findById(movieRequest.getCountryId()));
//
//        //set movie genre
//        List<MovieGenre> genres = movieRequest.getCategoriesIds().stream().map(id -> movieGenreRepository.getById(id))
//                .collect(Collectors.toList());
//        movie.setCategories(genres);
//
//        //set actors
//        List<Celebrity> actors = movieRequest.getActorId().stream().map(id -> celebrityRepository.getById(id))
//                .collect(Collectors.toList());
//        movie.setActor(actors);
//
//        //set directors
//        List<Celebrity> directors = movieRequest.getDirectorId().stream().map(id -> celebrityRepository.getById(id))
//                .collect(Collectors.toList());
//        movie.setDirector(directors);
//
//        if (movieRequest.getPrices() != null) {
//            movie.getPriceMovies().clear();
//
//            movieRequest.getPrices().forEach(price -> {
////                PriceMovie priceMovie = new PriceMovie(price.getDate(), price.getPrice());
////                priceMovie.setMovie(movie);
//                PriceMovie priceMovie = PriceMovie.builder()
//                        .date(price.getDate())
//                        .price(price.getPrice())
//                        .movie(movie)
//                        .build();
//
//                movie.getPriceMovies().add(priceMovie);
//            });
//        }
        movieRepository.save(movie);

        return true;
    }

    private void populateMovieEntity(Movie movie, MovieRequest request) {
//        ObjectUtils.copyFields(request, movie);
        movie.setSlug(generateSlug(request.getName()));
        movie.setStatus(request.getStatus());
        movie.setCountry(countryRepository.findById(request.getCountryId()));

        List<MovieGenre> genres = request.getCategoriesIds().stream()
                .map(movieGenreRepository::getById)
                .collect(Collectors.toList());

        movie.setCategories(genres);

        List<Celebrity> actors = request.getActorId().stream()
                .map(celebrityRepository::getById)
                .collect(Collectors.toList());
        movie.setActor(actors);

        List<Celebrity> directors = request.getDirectorId().stream()
                .map(celebrityRepository::getById)
                .collect(Collectors.toList());
        movie.setDirector(directors);

        if (request.getPrices() != null) {
            movie.getPriceMovies().clear();

            for (var priceRequest : request.getPrices()) {
                PriceMovie priceMovie = PriceMovie.builder()
                        .date(priceRequest.getDate())
                        .price(priceRequest.getPrice())
                        .movie(movie)
                        .build();

                movie.getPriceMovies().add(priceMovie);
            }
        }
    }

    @Override
    public Movie findMovieById(Integer id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(NOT_FOUND));
        movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));

        return movie;
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }

}
