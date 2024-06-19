package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Review;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.MovieBlogRepository;
import com.cinemas.service.admin.MovieBlogService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class MovieBlogServiceImpl implements MovieBlogService {
    @Autowired
    private MovieBlogRepository movieBlogRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<MovieBlog> getAllBlog(PaginationHelper paginationHelper) {
        List<MovieBlog> blogs = movieBlogRepository.findAll();

        blogs.forEach(blog -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(blog.getThumbnail());
            blog.setThumbnail(imageUrl);
        });

        PagedListHolder<MovieBlog> pagedListHolder = new PagedListHolder<MovieBlog>(blogs);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<MovieBlog> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<MovieBlog> blogList = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), blogs.size());

        return blogList;
    }

    @Override
    public boolean addBlog(MovieBlogRequest movieBlogRequest) throws IOException {
        MovieBlog blog = new MovieBlog();
        if (movieBlogRepository.findByName(movieBlogRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(movieBlogRequest, blog);
        String slug = movieBlogRequest.getName().toLowerCase().replaceAll("\\s+", "-");
        blog.setSlug(slug);
        blog.setThumbnail(fileStorageServiceImpl.uploadFile(movieBlogRequest.getThumbnail(), "blog"));

        movieBlogRepository.save(blog);
        return true;
    }

    @Override
    public MovieBlog getEditBlog(String slug) {
        MovieBlog blog = movieBlogRepository.findBySlug(slug);

        if (blog == null) throw new AppException(NOT_FOUND);

        blog.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(blog.getThumbnail()));
        return blog;
    }

    @Override
    public boolean updateBlog(MovieBlogRequest movieBlogRequest) throws IOException {
        MovieBlog blog = movieBlogRepository
                .findById(movieBlogRequest.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (movieBlogRepository.findByNameWithId(movieBlogRequest.getName(), movieBlogRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (movieBlogRequest.getThumbnail() != null) {
            fileStorageServiceImpl.deleteFile(blog.getThumbnail());
            blog.setThumbnail(fileStorageServiceImpl.uploadFile(movieBlogRequest.getThumbnail(), "blog"));
        }

        ObjectUtils.copyFields(movieBlogRequest, blog);
        String slug = movieBlogRequest.getName().toLowerCase().replaceAll("\\s+", "-");
        blog.setSlug(slug);

        movieBlogRepository.save(blog);
        return true;
    }

    @Override
    public Integer deleteBlog(String slug) throws IOException {
        MovieBlog blog = movieBlogRepository.findBySlug(slug);

        if (blog == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(blog.getThumbnail());
        movieBlogRepository.delete(blog);

        return blog.getId();
    }
}
