package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchCelebRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.CountryRepository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.service.home.HomeCelebService;
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
public class HomeCelebServiceImpl implements HomeCelebService {
    @Autowired
    private CelebrityRepository celebrityRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public SelectOptionCeleb<Page<Celebrity>> getAllActor(SearchCelebRequest searchCelebRequest) {
        List<Celebrity> celebrityList = celebrityRepository.searchCelebAndCountry(RoleCeleb.ACTOR, searchCelebRequest.getSlugCountry());

        celebrityList.forEach(celebrity -> {
            celebrity.setImage(fileStorageServiceImpl.getUrlFromPublicId(celebrity.getImage()));
        });

        PagedListHolder<Celebrity> pagedListHolder = new PagedListHolder<Celebrity>(celebrityList);
        pagedListHolder.setPage(searchCelebRequest.getPageNo());
        pagedListHolder.setPageSize(searchCelebRequest.getPageSize());

        List<Celebrity> pageList = pagedListHolder.getPageList();
        boolean ascending = searchCelebRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(searchCelebRequest.getSortByColumn(), true, ascending));

        Page<Celebrity> celebrities = new PageImpl<>(pageList, new PaginationHelper().getPageable(searchCelebRequest), celebrityList.size());

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getSlug(), country.getName()));
        }

        return new SelectOptionCeleb<>(celebrities, optionsCountries);
    }

    @Override
    public SelectOptionCeleb<Page<Celebrity>> getAllDirector(SearchCelebRequest searchCelebRequest) {
        List<Celebrity> celebrityList = celebrityRepository.searchCelebAndCountry(RoleCeleb.DIRECTOR, searchCelebRequest.getSlugCountry());

        celebrityList.forEach(celebrity -> {
            celebrity.setImage(fileStorageServiceImpl.getUrlFromPublicId(celebrity.getImage()));
        });

        PagedListHolder<Celebrity> pagedListHolder = new PagedListHolder<Celebrity>(celebrityList);
        pagedListHolder.setPage(searchCelebRequest.getPageNo());
        pagedListHolder.setPageSize(searchCelebRequest.getPageSize());

        List<Celebrity> pageList = pagedListHolder.getPageList();
        boolean ascending = searchCelebRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(searchCelebRequest.getSortByColumn(), true, ascending));

        Page<Celebrity> celebrities = new PageImpl<>(pageList, new PaginationHelper().getPageable(searchCelebRequest), celebrityList.size());

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getSlug(), country.getName()));
        }

        return new SelectOptionCeleb<>(celebrities, optionsCountries);
    }

    @Override
    public CelebResponse getDetailCeleb(String slug) {
        Celebrity celebrity = celebrityRepository.findBySlug(slug);

        if (celebrity == null) throw new AppException(NOT_FOUND);

        celebrity.setImage(fileStorageServiceImpl.getUrlFromPublicId(celebrity.getImage()));

        CelebResponse celebResponse = new CelebResponse();
        ObjectUtils.copyFields(celebrity, celebResponse);

        List<Movie> movieList = new ArrayList<>();
        if(celebrity.getRole() == RoleCeleb.ACTOR){
            movieList = celebrity.getMoviesActor();
        }
        else{
            movieList = celebrity.getMoviesDirector();
        }

        List<MovieCelebResponse> movieCelebList = new ArrayList<>();
        for (Movie movie : movieList) {
            MovieCelebResponse movieCelebResponse = new MovieCelebResponse();
            ObjectUtils.copyFields(movie, movieCelebResponse);
            movieCelebResponse.setImage(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
            movieCelebList.add(movieCelebResponse);
        }
        celebResponse.setMovieList(movieCelebList);
        return celebResponse;
    }
}
