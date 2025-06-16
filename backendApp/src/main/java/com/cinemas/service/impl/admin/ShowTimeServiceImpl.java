package com.cinemas.service.impl.admin;

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

import java.time.LocalDate;
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
        Showtimes showtimes = showTimeResponsitory.findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND));

        return showTimeItemRequet.builder()
                .id(showtimes.getId())
                .times(showtimes.getTime())
                .days(showtimes.getDate())
                .movieId(showtimes.getMovie().getId())
                .cinemaId(showtimes.getCinema().getId())
                .roomId(showtimes.getRoom().getId())
                .movieFormat(showtimes.getMovieFormat())
                .build();
    }

    @Override
    public boolean updateShowTime(showTimeItemRequet showTimeItemRequet) {
        Showtimes showtimes = findShowtimesById(showTimeItemRequet.getId());

        Movie movie = findMovieById(showTimeItemRequet.getMovieId());

        Cinema cinema = findCinemaById(showTimeItemRequet.getCinemaId());

        Room room = findRoomById(showTimeItemRequet.getRoomId());

        LocalTime startTime = showTimeItemRequet.getTimes();
        LocalTime endTime = showTimeItemRequet.getTimes().plusMinutes(movie.getDuration_movie() + 5);

//        List<Showtimes> overlappingShowtimesList =
//                showTimeResponsitory.findOverlappingShowtimesUpdate(
//                        room.getId(),
//                        showTimeItemRequet.getDays(),
//                        startTime,
//                        endTime,
//                        showTimeItemRequet.getId());

        validateNoOverlappingShowtime(
                room.getId(),
                showTimeItemRequet.getDays(),
                startTime,
                endTime,
                showTimeItemRequet.getId(),
                room.getName()
        );


//        if (overlappingShowtimesList.isEmpty()) {
//            showtimes.setDate(showTimeItemRequet.getDays());
//            showtimes.setTime(showTimeItemRequet.getTimes());
//            showtimes.setCinema(cinema);
//            showtimes.setRoom(room);
//            showtimes.setMovie(movie);
//            showtimes.setMovieFormat(showTimeItemRequet.getMovieFormat());
//
//            showTimeResponsitory.save(showtimes);
//
//            return true;
//        }

//        throw new AppException(CREATE_FAILED, "Showtime conflict detected for room " + room.getName() + " on " + showTimeItemRequet.getDays() + " at " + showTimeItemRequet.getTimes());
        updateShowtimeEntity(showtimes, showTimeItemRequet, movie, cinema, room);
        showTimeResponsitory.save(showtimes);

        return true;
    }

    private Showtimes findShowtimesById(Integer id) {

        return showTimeResponsitory.findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND));
    }

    private Movie findMovieById(Integer id) {

        return movieRepository.findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND_MOVIE));
    }

    private Cinema findCinemaById(Integer id) {

        return cinemaRespository.findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND_CINEMA));

    }

    private Room findRoomById(Integer id) {

        return roomRepository.findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND_ROOM));
    }

    private void validateNoOverlappingShowtime(Integer roomId, LocalDate date, LocalTime startTime, LocalTime endTime, Integer showtimeId, String roomName) {
        List<Showtimes> overlapping =
                showTimeResponsitory.findOverlappingShowtimesUpdate(
                        roomId, date, startTime, endTime, showtimeId
                );

        if (!overlapping.isEmpty()) {
            throw new AppException(CREATE_FAILED, String.format(
                    "Showtime conflict detected for room %s on %s at %s",
                    roomName, date, startTime
            ));
        }
    }

    private void updateShowtimeEntity(Showtimes showtimes, showTimeItemRequet request,
                                      Movie movie, Cinema cinema, Room room) {
        showtimes.setDate(request.getDays());
        showtimes.setTime(request.getTimes());
        showtimes.setMovie(movie);
        showtimes.setCinema(cinema);
        showtimes.setRoom(room);
        showtimes.setMovieFormat(request.getMovieFormat());
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

        Movie movie = findMovieById(showTimeRequest.getMovieId());

        Cinema cinema = findCinemaById(showTimeRequest.getCinemaId());

        List<Room> roomList = new ArrayList<>();

        showTimeRequest.getRoomId().forEach(roomId -> {
            roomList.add(findRoomById(roomId));
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

                        throw new AppException(CREATE_FAILED, String.format(
                                "Showtime conflict detected for room %s on %s at %s",
                                room.getName(), day, time
                        ));
                    }
                });
            });
        });

        showTimeResponsitory.saveAll(showtimesList);

        return true;
    }
}
