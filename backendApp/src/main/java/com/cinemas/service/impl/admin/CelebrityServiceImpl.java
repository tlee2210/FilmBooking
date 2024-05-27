package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.CountryRepository;
import com.cinemas.service.admin.CelebrityService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@Service
public class    CelebrityServiceImpl implements CelebrityService {
    @Autowired
    CelebrityRepository celebrityRepository;
    @Autowired
    CountryRepository countryRepository;
    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Celebrity> getAllCelebrity(PaginationHelper PaginationHelper) {
        List<Celebrity> celebrityList = celebrityRepository.findAllWithCountry();

        celebrityList.forEach(celebrity -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(celebrity.getImage());
            celebrity.setImage(imageUrl);
        });

        PagedListHolder<Celebrity> pagedListHolder = new PagedListHolder<Celebrity>(celebrityList);
        pagedListHolder.setPage(PaginationHelper.getPageNo());
        pagedListHolder.setPageSize(PaginationHelper.getPageSize());

        List<Celebrity> pageList = pagedListHolder.getPageList();
        boolean ascending = PaginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(PaginationHelper.getSortByColumn(), true, ascending));

        Page<Celebrity> celebrities = new PageImpl<>(pageList, new PaginationHelper().getPageable(PaginationHelper), celebrityList.size());

        return celebrities;
    }

    @Override
    public boolean addCelebrity(CelebrityRequest celebrity) throws IOException {
        Celebrity addCeleb = new Celebrity();
        if (celebrityRepository.findByName(celebrity.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(celebrity, addCeleb);
        String slug = celebrity.getName().toLowerCase().replaceAll("\\s+", "-");
        addCeleb.setSlug(slug);
        int CountryId = Integer.parseInt(celebrity.getNationality());
        Country Country = countryRepository.findById(CountryId);

        addCeleb.setCountry(Country);
        addCeleb.setImage(fileStorageServiceImpl.uploadFile(celebrity.getFile(), String.valueOf(celebrity.getRole())));
//            System.out.println(addCeleb);
        celebrityRepository.save(addCeleb);
        return true;
    }

    @Override
    public List<SelectOptionReponse> getCreateCelebrity() {
        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> options = new ArrayList<>();
        for (Country country : countryList) {
            options.add(new SelectOptionReponse(country.getId(), country.getName()));
        }
        return options;
    }

    @Override
    public Integer deleteCelebrity(String slug) throws IOException {
        Celebrity celebrity = celebrityRepository.findBySlug(slug);

        if (celebrity == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(celebrity.getImage());
        celebrityRepository.delete(celebrity);

        return celebrity.getId();
    }

    @Override
    public EditSelectOptionReponse<Celebrity> getEditCelebrityBySlug(String slug) {

        Celebrity celebrity = celebrityRepository.findBySlug(slug);

        if (celebrity == null) throw new AppException(NOT_FOUND);

        celebrity.setImage(fileStorageServiceImpl.getUrlFromPublicId(celebrity.getImage()));

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> options = new ArrayList<>();

        for (Country country : countryList) {
            options.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        return new EditSelectOptionReponse<>(options, celebrity);
    }

    @Override
    public boolean updateCelebrity(CelebrityRequest celebrity) throws IOException {

        Celebrity cele = celebrityRepository
                .findById(celebrity.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (celebrityRepository.findByNameWithId(celebrity.getName(), celebrity.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (celebrity.getFile() != null) {
            fileStorageServiceImpl.deleteFile(cele.getImage());
            cele.setImage(fileStorageServiceImpl.uploadFile(celebrity.getFile(), String.valueOf(celebrity.getRole())));
        }

        ObjectUtils.copyFields(celebrity, cele);
        String slug = celebrity.getName().toLowerCase().replaceAll("\\s+", "-");
        cele.setSlug(slug);

        celebrityRepository.save(cele);

        return true;
    }
}
