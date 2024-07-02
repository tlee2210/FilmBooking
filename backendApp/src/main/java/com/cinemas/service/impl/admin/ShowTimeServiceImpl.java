package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ShowTimeRequest;
import com.cinemas.dto.request.searchShowTimeRequest;
import com.cinemas.dto.request.showTimeItemRequet;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.dto.response.ShowTimeCreateResponse;
import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.Room;
import com.cinemas.entities.Showtimes;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.RoomRepository;
import com.cinemas.repositories.ShowTimeResponsitory;
import com.cinemas.service.admin.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@Service
public class ShowTimeServiceImpl implements ShowTimeService {
    @Autowired
    CinemaRespository cinemaRespository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    ShowTimeResponsitory showTimeResponsitory;

    @Override
    public SelectOptionAndModelReponse<Page<ShowTimeTableResponse>> getAllShowTime(searchShowTimeRequest paginationHelper) {

        List<ShowTimeTableResponse> showtimesList = showTimeResponsitory.searchAllByCinemaAndDate(paginationHelper.getCinema(), paginationHelper.getStartDay(), paginationHelper.getEndDay());

        PagedListHolder<ShowTimeTableResponse> pagedListHolder = new PagedListHolder<ShowTimeTableResponse>(showtimesList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        boolean ascending = paginationHelper.getSort().isAscending();
        List<ShowTimeTableResponse> pageList = pagedListHolder.getPageList();

        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<ShowTimeTableResponse> showtimesPage = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), showtimesList.size());

        List<Cinema> cinemaList = cinemaRespository.findAll();

        List<SelectOptionReponse> optionsCountries = new ArrayList<>();
        for (Cinema cinema : cinemaList) {
            optionsCountries.add(new SelectOptionReponse(cinema.getSlug(), cinema.getName()));
        }
        return new SelectOptionAndModelReponse<>(optionsCountries, showtimesPage);
    }

    @Override
    public boolean delete(Integer id) {
        Showtimes showtimes = showTimeResponsitory.findById(id).orElseThrow(() -> new AppException(NOT_FOUND));
        showTimeResponsitory.delete(showtimes);

        return true;
    }

    @Override
    public showTimeItemRequet getEdit(Integer id) {
        Showtimes showtimes = showTimeResponsitory.findById(id).orElseThrow(() -> new AppException(NOT_FOUND));
        showTimeItemRequet showTimeItemRequet = new showTimeItemRequet();
        showTimeItemRequet.setId(showtimes.getId());
        showTimeItemRequet.setTimes(showtimes.getTime());
        showTimeItemRequet.setDays(showtimes.getDate());
        showTimeItemRequet.setMovieId(showtimes.getMovie().getId());
        showTimeItemRequet.setCinemaId(showtimes.getCinema().getId());
        showTimeItemRequet.setRoomId(showtimes.getRoom().getId());
        showTimeItemRequet.setMovieFormat(showtimes.getMovieFormat());

        return showTimeItemRequet;
    }

    @Override
    public boolean updateShowTime(showTimeItemRequet showTimeItemRequet) {
        Showtimes showtimes = showTimeResponsitory.findById(showTimeItemRequet.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        Movie movie = movieRepository.findById(showTimeItemRequet.getMovieId()).orElseThrow(() -> new AppException(NOT_FOUND_MOVIE));

        Cinema cinema = cinemaRespository.findById(showTimeItemRequet.getCinemaId()).orElseThrow(() -> new AppException(NOT_FOUND_CINEMA));

        Room room = roomRepository.findById(showTimeItemRequet.getRoomId()).orElseThrow(() -> new AppException(NOT_FOUND_ROOM));
        LocalTime endTime = showTimeItemRequet.getTimes().plusMinutes(movie.getDuration_movie() + 5);
        List<Showtimes> overlappingShowtimesList = showTimeResponsitory.findOverlappingShowtimesUpdate(room.getId(), showTimeItemRequet.getDays(), showTimeItemRequet.getTimes(), endTime, showTimeItemRequet.getId());
        if (overlappingShowtimesList.isEmpty()) {
            showtimes.setDate(showTimeItemRequet.getDays());
            showtimes.setTime(showTimeItemRequet.getTimes());
            showtimes.setCinema(cinema);
            showtimes.setRoom(room);
            showtimes.setMovie(movie);
            showtimes.setMovieFormat(showTimeItemRequet.getMovieFormat());

            showTimeResponsitory.save(showtimes);

            return true;
        }

        throw new AppException(CREATE_FAILED, "Showtime conflict detected for room " + room.getName() + " on " + showTimeItemRequet.getDays() + " at " + showTimeItemRequet.getTimes());
    }

    @Override
    public ShowTimeCreateResponse getcreate() {
        List<Cinema> cinemaList = cinemaRespository.findAll();
        List<Movie> movieList = movieRepository.findAllMovieSetTime();
        List<SelectOptionReponse> optionsCinema = new ArrayList<>();
        List<SelectOptionReponse> optionsMovie = new ArrayList<>();

        cinemaList.forEach(cinema -> {
            optionsCinema.add(new SelectOptionReponse(cinema.getId(), cinema.getName()));
        });
        movieList.forEach(movie -> {
            optionsMovie.add(new SelectOptionReponse(movie.getId(), movie.getName()));
        });

        return new ShowTimeCreateResponse(optionsMovie, optionsCinema);
    }

    @Override
    public List<SelectOptionReponse> getRoomCreate(Integer idCinema) {
        List<SelectOptionReponse> optionsRoom = new ArrayList<>();
        List<Room> rooms = roomRepository.getRoomByCinemaId(idCinema);

        rooms.forEach(room -> {
            optionsRoom.add(new SelectOptionReponse(room.getId(), room.getName()));
        });

        return optionsRoom;
    }

    @Override
    public boolean createShowTime(ShowTimeRequest showTimeRequest) {

        Movie movie = movieRepository.findById(showTimeRequest.getMovieId()).orElseThrow(() -> new AppException(NOT_FOUND_MOVIE));

        Cinema cinema = cinemaRespository.findById(showTimeRequest.getCinemaId()).orElseThrow(() -> new AppException(NOT_FOUND_CINEMA));

        List<Room> roomList = new ArrayList<>();

        showTimeRequest.getRoomId().forEach(roomId -> {
            roomList.add(roomRepository.findById(roomId).orElseThrow(() -> new AppException(NOT_FOUND_ROOM)));
        });

        List<Showtimes> showtimesList = new ArrayList<>();

        showTimeRequest.getDays().forEach(day -> {
            showTimeRequest.getTimes().forEach(time -> {
                roomList.forEach(room -> {
                    LocalTime endTime = time.plusMinutes(movie.getDuration_movie() + 5);
                    List<Showtimes> overlappingShowtimesList = showTimeResponsitory.findOverlappingShowtimes(room.getId(), day, time, endTime);

                    if (overlappingShowtimesList.isEmpty()) {
                        showtimesList.add(new Showtimes(day, time, movie, room, cinema, showTimeRequest.getMovieFormat()));
                    } else {
                        throw new AppException(CREATE_FAILED, "Showtime conflict detected for room " + room.getName() + " on " + day + " at " + time);
                    }
                });
            });
        });

        showTimeResponsitory.saveAll(showtimesList);

        return true;
    }
}
