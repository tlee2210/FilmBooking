package com.cinemas.service.impl.admin;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Movie;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.service.admin.MovieService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Movie> getAllMovie(PaginationHelper paginationHelper) {
        List<Movie> movieList = movieRepository.findAllWithDetail();
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
}
