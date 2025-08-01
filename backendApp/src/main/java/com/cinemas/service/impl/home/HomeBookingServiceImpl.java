package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.VoucherApplyRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.*;
import com.cinemas.enums.MovieFormat;
import com.cinemas.enums.StatusVoucher;
import com.cinemas.exception.AppException;
import com.cinemas.exception.ErrorCode;
import com.cinemas.repositories.*;
import com.cinemas.service.home.HomeBookingService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class HomeBookingServiceImpl implements HomeBookingService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CinemaRespository cinemaRespository;

    @Autowired
    private ShowTimeResponsitory showTimeResponsitory;
    @Autowired
    private FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    private PriceMovieResponsetory priceMovieResponsetory;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    WaterCornRepository waterCornRepository;

    @Override
    public bookTicketsResponse getTimeForMovie(String slug, String city, String cinema) {
        List<String> cityList = cinemaRespository.findByCity();
//        List<bookingShowTimeResponse> showtimes = showTimeResponsitory.findDayByMovie_Slug(slug, city, cinema);
        LocalTime currentTimePlus15 = LocalTime.now().plusMinutes(15);
//        showtimes.forEach(item -> {
//            item.setCinemaTimeMovies(showTimeResponsitory.findByDayAndMovie_Slug(item.getDay(), slug, currentTimePlus15, city, cinema));
//        });

        List<bookingShowTimeResponse> showtimes = showTimeResponsitory.findDayByMovie_Slug(slug, city, cinema)
                .stream()
                .peek(item -> item.setCinemaTimeMovies(showTimeResponsitory.findByDayAndMovie_Slug(item.getDay(), slug, currentTimePlus15, city, cinema)))
                .collect(Collectors.toList());

        showtimes.forEach(item -> {
            item.getCinemaTimeMovies().forEach(timeMovies -> {
//                List<MovieFormat> listMovieFormat = showTimeResponsitory.findMovieFormat(item.getDay(), slug, currentTimePlus15, timeMovies.getName());
//
//                List<HomeMovieFormatResponse> homeMovieFormatResponses = new ArrayList<>();
//
//                listMovieFormat.forEach(name -> {
//                    HomeMovieFormatResponse homeMovieFormatResponse = new HomeMovieFormatResponse();
//                    homeMovieFormatResponse.setName(name.getValue());
//                    homeMovieFormatResponse.setTimes(showTimeResponsitory.findMovieTimes(item.getDay(), slug, currentTimePlus15, timeMovies.getName(), name));
//
//                    homeMovieFormatResponses.add(homeMovieFormatResponse);
//                });
//
//                timeMovies.setMovieFormat(homeMovieFormatResponses);
                List<HomeMovieFormatResponse> homeMovieFormatResponses = showTimeResponsitory.findMovieFormat(item.getDay(), slug, currentTimePlus15, timeMovies.getName())
                        .stream()
                        .map(name -> HomeMovieFormatResponse.builder()
                                .name(name.getValue())
                                .times(showTimeResponsitory.findMovieTimes(item.getDay(), slug, currentTimePlus15, timeMovies.getName(), name))
                                .build())
                        .collect(Collectors.toList());

                timeMovies.setMovieFormat(homeMovieFormatResponses);
            });
        });

//        List<SelectOptionReponse> options = new ArrayList<>();
//        cityList.forEach(item -> {
//            options.add(new SelectOptionReponse(item, item));
//        });

        List<SelectOptionReponse> options = cityList.stream()
                .map(item -> SelectOptionReponse.builder()
                        .value(item)
                        .label(item)
                        .build())
                .collect(Collectors.toList());


        bookTicketsResponse bookticketsResponse = bookTicketsResponse.builder()
                .city(options)
                .cinema(cinemaRespository.selectCinema(city))
                .bookingShowTimeResponses(showtimes)
                .build();
//
//        bookTicketsResponse.setCity(options);
//        bookTicketsResponse.setCinema(cinemaRespository.selectCinema(city));
//        bookTicketsResponse.setBookingShowTimeResponses(showtimes);

        return bookticketsResponse;
    }

    @Override
    public ShowTimeTableResponse getBookingTime(Integer id) {
        ShowTimeTableResponse response = showTimeResponsitory.getBookingTime(id);
        response.setImage(fileStorageServiceImpl.getUrlFromPublicId(response.getImage()));
        PriceMovie priceMovie = priceMovieResponsetory.findPriceMovie(response.getMovieName(), response.getDate());

        if (priceMovie != null) {
            response.setPrice(priceMovie.getPrice());
        }
        LocalTime timeNow = LocalTime.now().plusMinutes(15);
//        List<HomeMovieFormatResponse> homeMovieFormatResponses = new ArrayList<>();
//        List<MovieFormat> listMovieFormat = showTimeResponsitory.findMovieFormat(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName());
//        listMovieFormat.forEach(item -> {
//            HomeMovieFormatResponse homeMovieFormatResponse = new HomeMovieFormatResponse();
//            homeMovieFormatResponse.setName(item.getValue());
//            homeMovieFormatResponse.setTimes(showTimeResponsitory.findshowtimes(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName(), item));
//
//            homeMovieFormatResponses.add(homeMovieFormatResponse);
//        });


        List<HomeMovieFormatResponse> homeMovieFormatResponses =
                showTimeResponsitory.findMovieFormat(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName())
                        .stream()
                        .map(item -> HomeMovieFormatResponse.builder()
                                .name(item.getValue())
                                .times(showTimeResponsitory.findshowtimes(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName(), item))
                                .build())
                        .collect(Collectors.toList());

        response.setMovieformats(homeMovieFormatResponses);

        return response;
    }

    @Override
    public BuyTicketResponse getInfoTicket(String slugmovie, String slugcinema, LocalDate date) {
//        BuyTicketResponse buyTicketFast = new BuyTicketResponse();
        LocalTime currentTimePlus15 = LocalTime.now().plusMinutes(15);
//        List<Movie> movies = movieRepository.getListBySlug();
//        List<SelectOptionReponse> movieList = new ArrayList<>();
//        movies.forEach(movie -> {
//            movieList.add(new SelectOptionReponse<>(movie.getSlug(), movie.getName()));
//        });
        List<SelectOptionReponse> movieList = movieRepository.getListBySlug()
                .stream()
                .map(movie -> SelectOptionReponse.builder()
                        .value(movie.getSlug())
                        .label(movie.getName())
                        .build())
                .collect(Collectors.toList());
//        buyTicketFast.setMovieList(movieList);
//        List<SelectOptionReponse> cinemaList = new ArrayList<>();
//        List<Cinema> cinemas = showTimeResponsitory.findCinemasByMovieSlug(slugmovie);
//
//        cinemas.forEach(cinema -> {
//            cinemaList.add(new SelectOptionReponse<>(cinema.getSlug(), cinema.getName()));
//        });
        List<SelectOptionReponse> cinemaList = showTimeResponsitory.findCinemasByMovieSlug(slugmovie).stream()
                .map(cinema -> SelectOptionReponse.builder()
                        .value(cinema.getSlug())
                        .label(cinema.getName())
                        .build())
                .collect(Collectors.toList());
//        buyTicketFast.setCinemaList(cinemaList);

//        buyTicketFast.setDateList(showTimeResponsitory.findDates(slugcinema, slugmovie));

//        List<HomeMovieFormatResponse> movieFormatList = new ArrayList<>();
//        List<MovieFormat> movieFormatName = showTimeResponsitory.getMovieFormatName(slugmovie, slugcinema, date, currentTimePlus15);
//
//        movieFormatName.forEach(item -> {
//            HomeMovieFormatResponse homeMovieFormatResponse = new HomeMovieFormatResponse();
//            homeMovieFormatResponse.setName(item.getValue());
//            homeMovieFormatResponse.setTimes(showTimeResponsitory.getTimes(slugmovie, slugcinema, date, currentTimePlus15, item));
//
//            movieFormatList.add(homeMovieFormatResponse);
//        });
        List<HomeMovieFormatResponse> movieFormatList = showTimeResponsitory.getMovieFormatName(slugmovie, slugcinema, date, currentTimePlus15)
                .stream()
                .map(item -> HomeMovieFormatResponse.builder()
                        .name(item.getValue())
                        .times(showTimeResponsitory.getTimes(
                                slugmovie,
                                slugcinema,
                                date,
                                currentTimePlus15,
                                item
                        ))
                        .build())
                .collect(Collectors.toList());

//        buyTicketFast.setMovieFormat(movieFormatList);

        return BuyTicketResponse.builder()
                .movieList(movieList)
                .cinemaList(cinemaList)
                .dateList(showTimeResponsitory.findDates(slugcinema, slugmovie))
                .movieFormat(movieFormatList)
                .build();
    }

    @Override
    public VoucherResponse findByCode(VoucherApplyRequest code) {
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = userRepository
//                .findByEmail(userDetails.getUsername())
//                .orElseThrow(() -> new AppException(NOT_FOUND));
//
//        Voucher voucher = voucherRepository.findByCode(code.getCode());
//
//        if (voucher == null) {
//            throw new AppException(ErrorCode.VOUCHER_NOT_FOUND);
//        }
//        if (voucher != null && voucher.getStatusVoucher() == StatusVoucher.EXPIRED) {
//            throw new AppException(ErrorCode.VOUCHER_EXPIRED);
//        }
////        if(voucher != null && voucher.getMinSpend() != null){
////            if (voucher != null && voucher.getMinSpend() > code.getPrice()) {
////                throw new AppException(ErrorCode.VOUCHER_NOT_ELIGIBLE);
////            }
////        }
//
////        if (voucher != null && voucher.getUsedCount() >= voucher.getUsageLimit()) {
////            throw new AppException(ErrorCode.VOUCHER_USAGE_LIMIT_EXCEEDED);
////        }
//        Booking booking = bookingRepository.checkUsage(voucher.getId(), user.getId());
//        if (booking != null) {
//            throw new AppException(ErrorCode.VOUCHER_ALREADY_USED);
//        }
//        VoucherResponse voucherResponse = new VoucherResponse();
//        ObjectUtils.copyFields(voucher, voucherResponse);
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        Voucher voucher = voucherRepository.findByCode(code.getCode());

        if (voucher == null) {
            throw new AppException(ErrorCode.VOUCHER_NOT_FOUND);
        }

        VoucherResponse voucherResponse = new VoucherResponse();
        ObjectUtils.copyFields(voucher, voucherResponse);

        return voucherResponse;
    }

    @Override
    public SeatBookedResponse getBookedSeats(Integer id) {

        SeatBookedResponse seatBookedResponse = new SeatBookedResponse();

        List<WaterCorn> waterCorns = waterCornRepository.findAll();
        waterCorns.forEach(item -> {
            item.setImage(fileStorageServiceImpl.getUrlFromPublicId(item.getImage()));
        });
        seatBookedResponse.setWaterCorns(waterCorns);

        List<Booking> bookings = bookingRepository.findByShowtimeId(id);
        String seat = "";
        if (bookings != null) {
            for (Booking booking : bookings) {
                if (booking.getQuantitySeat() != null && !booking.getQuantitySeat().isEmpty()) {
                    seat = seat.concat(booking.getQuantitySeat()).concat(", ");
                }
                if (booking.getQuantityDoubleSeat() != null && !booking.getQuantityDoubleSeat().isEmpty()) {
                    seat = seat.concat(booking.getQuantityDoubleSeat()).concat(", ");
                }
            }
        }

        if (!seat.isEmpty()) {
            seat = seat.substring(0, seat.length() - 2);
        }

        seatBookedResponse.setSeatBooked(seat);

        return seatBookedResponse;
    }

    @Override
    public BookingTicketResponse getBookingTicket(String city, String slugMovie) {
        BookingTicketResponse bookingTicketResponse = new BookingTicketResponse();
        bookingTicketResponse.setListCity(cinemaRespository.findByCity());
        bookingTicketResponse.setMovieList(new ArrayList<>());
        if (city != null) {
            List<SelectOptionReponse<?>> cinemaList = cinemaRespository.selectCinema(city);
            List<MovieBookingResponse> movieListOld = new ArrayList<>();
            cinemaList.forEach(cine -> {
                List<MovieBookingResponse> movieListNew = showTimeResponsitory.findMoviesByCinema(String.valueOf(cine.getValue()));
                boolean isEqual = Arrays.equals(movieListOld.toArray(), movieListNew.toArray());
                if (!isEqual && movieListNew.size() != 0) {
                    movieListNew.forEach(movie -> {
                        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
                        movieListOld.add(movie);
                    });
                    bookingTicketResponse.setMovieList(movieListNew);
                }
            });
        }
        LocalTime currentTimePlus15 = LocalTime.now().plusMinutes(15);

//        List<bookingShowTimeResponse> showtimes = showTimeResponsitory.findDayByMovie_Slug(slugMovie);
//        showtimes.forEach(item -> {
//            item.setCinemaTimeMovies(showTimeResponsitory.findByDayAndMovie_Slug(item.getDay(), slugMovie, currentTimePlus15));
//        });

        List<bookingShowTimeResponse> showtimes = showTimeResponsitory.findDayByMovie_Slug(slugMovie)
                .stream()
                .peek(item -> item.setCinemaTimeMovies(showTimeResponsitory.findByDayAndMovie_Slug(item.getDay(), slugMovie, currentTimePlus15)))
                .collect(Collectors.toList());

        showtimes.forEach(item -> {
            item.getCinemaTimeMovies().forEach(timeMovies -> {
//                List<MovieFormat> listMovieFormat = showTimeResponsitory.findMovieFormat(item.getDay(), slugMovie, currentTimePlus15, timeMovies.getName());
//
//                List<HomeMovieFormatResponse> homeMovieFormatResponses = new ArrayList<>();
//
//                listMovieFormat.forEach(name -> {
//                    HomeMovieFormatResponse homeMovieFormatResponse = HomeMovieFormatResponse.builder()
//                            .name(name.getValue())
//                            .times(showTimeResponsitory.findMovieTimes(item.getDay(), slugMovie, currentTimePlus15, timeMovies.getName(), name))
//                            .build();
//
//                    homeMovieFormatResponses.add(homeMovieFormatResponse);
//                });
                List<HomeMovieFormatResponse> homeMovieFormatResponses = showTimeResponsitory.findMovieFormat(item.getDay(), slugMovie, currentTimePlus15, timeMovies.getName())
                        .stream()
                        .map(name -> HomeMovieFormatResponse.builder()
                                .name(name.getValue())
                                .times(showTimeResponsitory.findMovieTimes(item.getDay(), slugMovie, currentTimePlus15, timeMovies.getName(), name))
                                .build())
                        .collect(Collectors.toList());

                timeMovies.setMovieFormat(homeMovieFormatResponses);

            });
        });

        bookingTicketResponse.setBookingShowTimeResponses(showtimes);

        return bookingTicketResponse;
    }

}
