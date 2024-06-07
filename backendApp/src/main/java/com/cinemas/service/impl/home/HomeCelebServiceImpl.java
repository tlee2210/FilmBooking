package com.cinemas.service.impl.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchCelebRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionCeleb;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleCeleb;
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
        List<Celebrity> celebrityList = celebrityRepository.searchCeleb(RoleCeleb.ACTOR, searchCelebRequest.getCountryId());

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
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        List<Movie> movieList = movieRepository.radomMovieSoon(MovieStatus.COMING_SOON);

        return new SelectOptionCeleb<>(celebrities, optionsCountries, movieList);
    }

    @Override
    public SelectOptionCeleb<Page<Celebrity>> getAllDirector(SearchCelebRequest searchCelebRequest) {
        List<Celebrity> celebrityList = celebrityRepository.searchCeleb(RoleCeleb.DIRECTOR, searchCelebRequest.getCountryId());

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
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        List<Movie> movieList = movieRepository.radomMovieSoon(MovieStatus.COMING_SOON);

        return new SelectOptionCeleb<>(celebrities, optionsCountries, movieList);
    }
}
