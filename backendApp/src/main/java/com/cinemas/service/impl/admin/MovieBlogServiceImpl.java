package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.*;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.MovieBlogRepository;
import com.cinemas.repositories.imageDescriptionRespository;
import com.cinemas.service.admin.MovieBlogService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class MovieBlogServiceImpl implements MovieBlogService {
    @Autowired
    private MovieBlogRepository movieBlogRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    imageDescriptionRespository imageDescriptionRespository;

    @Override
    public Page<MovieBlog> getAllBlog(SearchRequest paginationHelper) {
        List<MovieBlog> blogs = movieBlogRepository.searchByName(paginationHelper.getSearchname());

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

        if (movieBlogRepository.findByName(movieBlogRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        MovieBlog blog = new MovieBlog();

        blog.setThumbnail(fileStorageServiceImpl.uploadFile(movieBlogRequest.getFile(), "blogThumbnail"));
        ObjectUtils.copyFields(movieBlogRequest, blog);

        blog.setSlug(movieBlogRequest.getName().toLowerCase().replaceAll("\\s+", "-"));

        List<imageDescription> imageDescriptionList = new ArrayList<>();

        if (movieBlogRequest.getUrl() != null) {
            movieBlogRequest.getUrl().forEach(item -> {
                imageDescription imageDescription = imageDescriptionRespository.findByUrl(item);
                imageDescription.setSlug_name(blog.getSlug());
                imageDescriptionList.add(imageDescription);
            });
        }
        imageDescriptionRespository.saveAll(imageDescriptionList);

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
        MovieBlog blog = movieBlogRepository.findById(movieBlogRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (movieBlogRepository.findByNameWithId(movieBlogRequest.getName(), movieBlogRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (movieBlogRequest.getFile() != null) {
            fileStorageServiceImpl.deleteFile(blog.getThumbnail());
            blog.setThumbnail(fileStorageServiceImpl.uploadFile(movieBlogRequest.getFile(), "blogThumbnail"));
        }
        String slugOld = blog.getSlug();

        ObjectUtils.copyFields(movieBlogRequest, blog);

        String slug = movieBlogRequest.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-");
        blog.setSlug(slug);
        List<imageDescription> imageDescriptionList = imageDescriptionRespository.findBySlug_name(slugOld);

        if (movieBlogRequest.getUrl() != null) {
            List<imageDescription> imageDelete = imageDescriptionList.stream().filter(image -> !movieBlogRequest.getUrl().contains(image.getUrl())).peek(images -> {
                try {
                    fileStorageServiceImpl.deleteFile(images.getUrl());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList());

            List<imageDescription> newImages = movieBlogRequest.getUrl().stream()
                    .map(url -> {
                        imageDescription imageDescription = imageDescriptionRespository.findByUrl(url);
                        imageDescription.setSlug_name(blog.getSlug());
                        return imageDescription;
                    })
                    .collect(Collectors.toList());

            imageDescriptionRespository.saveAll(newImages);

            imageDescriptionRespository.deleteAll(imageDelete);
        } else {
            imageDescriptionRespository.deleteAll(imageDescriptionList);
        }

        movieBlogRepository.save(blog);

        return true;
    }

    @Override
    public Integer deleteBlog(String slug) throws IOException {
        MovieBlog blog = movieBlogRepository.findBySlug(slug);

        if (blog == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(blog.getThumbnail());

        List<imageDescription> imageDescriptionList = imageDescriptionRespository.findBySlug_name(slug);
        imageDescriptionList.forEach(item -> {
            try {
                fileStorageServiceImpl.deleteFile(item.getUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        imageDescriptionRespository.deleteAll(imageDescriptionList);
        movieBlogRepository.delete(blog);

        return blog.getId();
    }
}
