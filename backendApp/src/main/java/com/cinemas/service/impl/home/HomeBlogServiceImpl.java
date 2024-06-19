package com.cinemas.service.impl.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieBlog;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.MovieBlogRepository;
import com.cinemas.service.home.HomeBlogService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;


@Component
public class HomeBlogServiceImpl implements HomeBlogService {
    @Autowired
    private MovieBlogRepository movieBlogRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<MovieBlog> getAllBlog(PaginationHelper paginationHelper) {
        List<MovieBlog> movieBlogs = movieBlogRepository.findAll();

        movieBlogs.forEach(blog -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(blog.getThumbnail());
            blog.setThumbnail(imageUrl);
        });

        PagedListHolder<MovieBlog> pagedListHolder = new PagedListHolder<MovieBlog>(movieBlogs);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<MovieBlog> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<MovieBlog> blogs = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), movieBlogs.size());

        return blogs;
    }

    @Override
    public MovieBlog getBlogDetail(String slug) {
        MovieBlog movieBlog = movieBlogRepository.findBySlug(slug);

        if (movieBlog == null) throw new AppException(NOT_FOUND);

        movieBlog.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(movieBlog.getThumbnail()));
        return movieBlog;
    }
}
