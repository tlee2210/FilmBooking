package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.exception.AppException;
import com.cinemas.exception.ErrorCode;
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
    private CinemaRespository cinemaRespository;

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Movie> getAllMovie(PaginationHelper paginationHelper) {
        List<Movie> movieList = movieRepository.findAllWithBasicDetail();

        if (!movieList.isEmpty()) {
            movieList = movieRepository.findAllWithCelebrities(movieList);
        }

        // Step 3: Fetch cinemas for the movies
        if (!movieList.isEmpty()) {
            movieList = movieRepository.findAllWithCinemas(movieList);
        }
//        movieList.forEach(movie -> {
//            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(movie.getImage());
//            String videoUrl = fileStorageServiceImpl.getUrlFromPublicId(movie.getTrailer());
//            movie.setImage(imageUrl);
//            movie.setTrailer(videoUrl);
//        });

        PagedListHolder<Movie> pagedListHolder = new PagedListHolder<Movie>(movieList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Movie> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Movie> movies = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), movieList.size());
        return movies;
    }

    @Override
    public List<SelectOptionReponse> getCreateMovie() {
        List<SelectOptionReponse> options = new ArrayList<>();

        //list Country
        List<Country> countryList = countryRepository.findAll();
        for (Country country : countryList) {
            options.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        //list cinema
        List<Cinema> cinemaList = cinemaRespository.findAll();
        for(Cinema cinema : cinemaList) {
            options.add(new SelectOptionReponse(cinema.getId(), cinema.getName()));
        }

        //list celeb
        List<Celebrity> celebrityList = celebrityRepository.findAll();
        for(Celebrity celebrity : celebrityList) {
            options.add(new SelectOptionReponse(celebrity.getId(), celebrity.getName()));
        }

        //list movie genre
        List<MovieGenre> movieGenreList = movieGenreRepository.findAll();
        for (MovieGenre movieGenre : movieGenreList) {
            options.add(new SelectOptionReponse(movieGenre.getId(), movieGenre.getName()));
        }

        return options;
    }

    @Override
    public boolean addMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = new Movie();
        if(movieRepository.findByName(movieRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(movieRequest, movie);

        //set slug
        String slug = movieRequest.getName().toLowerCase().replaceAll("\\s+", "-");
        movie.setSlug(slug);

        //set country
        Country Country = countryRepository.findById(movieRequest.getCountryId());

        movie.setCountry(Country);

        //set movie genre
        List<MovieGenre> genres = movieRequest.getGenreIds().stream().map(id -> movieGenreRepository.getById(id))
                .collect(Collectors.toList());
        movie.setGenres(genres);

        //set cinema
        List<Cinema> cinemas = movieRequest.getCinemaIds().stream().map(id -> cinemaRespository.getById(id))
                .collect(Collectors.toList());
        movie.setCinemas(cinemas);

        //set celebrity
        List<Celebrity> celebrities = movieRequest.getCelebrityIds().stream().map(id -> celebrityRepository.getById(id))
                .collect(Collectors.toList());
        movie.setCelebrities(celebrities);

        //set image
        movie.setImage(fileStorageServiceImpl.uploadFile(movieRequest.getImage(), "MOVIE"));

        //set trailer
        movie.setTrailer(fileStorageServiceImpl.uploadFile(movieRequest.getTrailer(), "MOVIE"));

        movieRepository.save(movie);
        return true;
    }

    @Override
    public Integer deleteMovie(String slug) throws IOException {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(movie.getImage());
        fileStorageServiceImpl.deleteVideo(movie.getTrailer(), "video");
        movieRepository.delete(movie);
        return movie.getId();
    }

    @Override
    public EditSelectOptionReponse<Movie> getEditCelebrityBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        movie.setImage(fileStorageServiceImpl.getUrlFromPublicId(movie.getImage()));
        movie.setTrailer(fileStorageServiceImpl.getVideoFromPublicId(movie.getTrailer()));

        List<SelectOptionReponse> options = new ArrayList<>();

        //list Country
        List<Country> countryList = countryRepository.findAll();
        for (Country country : countryList) {
            options.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        //list cinema
        List<Cinema> cinemaList = cinemaRespository.findAll();
        for(Cinema cinema : cinemaList) {
            options.add(new SelectOptionReponse(cinema.getId(), cinema.getName()));
        }

        //list celeb
        List<Celebrity> celebrityList = celebrityRepository.findAll();
        for(Celebrity celebrity : celebrityList) {
            options.add(new SelectOptionReponse(celebrity.getId(), celebrity.getName()));
        }

        //list movie genre
        List<MovieGenre> movieGenreList = movieGenreRepository.findAll();
        for (MovieGenre movieGenre : movieGenreList) {
            options.add(new SelectOptionReponse(movieGenre.getId(), movieGenre.getName()));
        }

        return new EditSelectOptionReponse<>(options, movie);
    }

    @Override
    public boolean updateMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = movieRepository.findById(movieRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if(movieRepository.findByNameWithId(movieRequest.getName(), movieRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if(movieRequest.getImage() !=null){
            fileStorageServiceImpl.deleteFile(movie.getImage());
            movie.setImage(fileStorageServiceImpl.uploadFile(movieRequest.getImage(), "MOVIE"));
        }

        if(movieRequest.getTrailer() !=null){
            fileStorageServiceImpl.deleteVideo(movie.getTrailer(), "video");
            movie.setTrailer(fileStorageServiceImpl.uploadFile(movieRequest.getTrailer(), "MOVIE"));
        }

        ObjectUtils.copyFields(movieRequest, movie);

        //set slug
        String slug = movieRequest.getName().toLowerCase().replaceAll("\\s+", "-");
        movie.setSlug(slug);

        //set country
        Country Country = countryRepository.findById(movieRequest.getCountryId());

        movie.setCountry(Country);

        //set movie genre
        List<MovieGenre> genres = movieRequest.getGenreIds().stream().map(id -> movieGenreRepository.getById(id))
                .collect(Collectors.toList());
        movie.setGenres(genres);

        //set cinema
        List<Cinema> cinemas = movieRequest.getCinemaIds().stream().map(id -> cinemaRespository.getById(id))
                .collect(Collectors.toList());
        movie.setCinemas(cinemas);

        //set celebrity
        List<Celebrity> celebrities = movieRequest.getCelebrityIds().stream().map(id -> celebrityRepository.getById(id))
                .collect(Collectors.toList());
        movie.setCelebrities(celebrities);

        movieRepository.save(movie);
        return false;
    }
}
