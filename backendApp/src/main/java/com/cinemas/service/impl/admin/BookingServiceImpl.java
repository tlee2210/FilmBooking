package com.cinemas.service.impl.admin;

import com.cinemas.dto.request.BookingSearchRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.BookingTableResponse;
import com.cinemas.entities.Booking;
import com.cinemas.entities.Celebrity;
import com.cinemas.repositories.BookingRepository;
import com.cinemas.service.admin.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Page<BookingTableResponse> getAllMovie(BookingSearchRequest searchRequest) {
        List<BookingTableResponse> bookings = bookingRepository.findAllBookingTable(
                searchRequest.getUserName(), searchRequest.getMovieName(), searchRequest.getStartDate(), searchRequest.getEndDate());

        PagedListHolder<BookingTableResponse> pagedListHolder = new PagedListHolder<BookingTableResponse>(bookings);
        pagedListHolder.setPage(searchRequest.getPageNo());
        pagedListHolder.setPageSize(searchRequest.getPageSize());

        List<BookingTableResponse> pageList = pagedListHolder.getPageList();
        boolean ascending = searchRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(searchRequest.getSortByColumn(), true, ascending));

        Page<BookingTableResponse> bookingTableResponses = new PageImpl<>(pageList, new PaginationHelper().getPageable(searchRequest), bookings.size());

        return bookingTableResponses;
    }
}
