package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.RoomRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.SearchRoomRequest;
import com.cinemas.dto.response.RoomTableReponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.enums.MovieFormat;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CinemaImageRespository;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.RoomRepository;
import com.cinemas.service.admin.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    CinemaRespository cinemaRespository;
    @Autowired
    RoomRepository roomRepository;


    @Override
    public SelectOptionAndModelReponse<Page<RoomTableReponse>> getAllRoom(SearchRoomRequest roomRequest) {
        List<Room> roomList = roomRepository.searchByNameAndAndCinemaId(roomRequest.getName(), roomRequest.getCinemaId());
        List<RoomTableReponse> roomTableReponses = new ArrayList<>();

        roomList.forEach(room -> {
            RoomTableReponse roomTableReponse = new RoomTableReponse();
            ObjectUtils.copyFields(room, roomTableReponse);
            roomTableReponse.setCinemaName(room.getCinema().getName());

            roomTableReponses.add(roomTableReponse);
        });

        PagedListHolder<RoomTableReponse> pagedListHolder = new PagedListHolder<RoomTableReponse>(roomTableReponses);
        pagedListHolder.setPage(roomRequest.getPageNo());
        pagedListHolder.setPageSize(roomRequest.getPageSize());
        List<RoomTableReponse> pageList = pagedListHolder.getPageList();
        boolean ascending = roomRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(roomRequest.getSortByColumn(), true, ascending));

        Page<RoomTableReponse> rooms = new PageImpl<>(pageList, new PaginationHelper().getPageable(roomRequest), roomList.size());

//        List<Cinema> cinemaList = cinemaRespository.findAll();
//        List<SelectOptionReponse> optionsCountries = new ArrayList<>();
//        for (Cinema cinema : cinemaList) {
//            optionsCountries.add(SelectOptionReponse
//                    .builder()
//                    .value(cinema.getId())
//                    .label(cinema.getName())
//                    .build());
//        }

        List<SelectOptionReponse> optionsCountries = cinemaRespository.findAll()
                .stream().map(options -> SelectOptionReponse
                        .builder()
                        .value(options.getId())
                        .label(options.getName())
                        .build())
                .collect(Collectors.toList());


        return new SelectOptionAndModelReponse<>(optionsCountries, rooms);
    }

    @Override
    public SelectOptionAndModelReponse<RoomTableReponse> getEditRoom(Integer id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(NOT_FOUND));

//        RoomTableReponse roomTableReponse = new RoomTableReponse();
        RoomTableReponse roomTableReponse = RoomTableReponse.builder()
                .id(room.getId())
                .name(room.getName())
                .SeatColumns(room.getSeatColumns())
                .SeatRows(room.getSeatRows())
                .doubleSeatColumns(room.getDoubleSeatColumns())
                .doubleSeatRows(room.getDoubleSeatRows())
                .totalColumn(room.getTotalColumn())
                .cinemaId(room.getCinema().getId())
                .build();

//        roomTableReponse.setId(room.getId());
//        roomTableReponse.setName(room.getName());
//        roomTableReponse.setSeatColumns(room.getSeatColumns());
//        roomTableReponse.setSeatRows(room.getSeatRows());
//        roomTableReponse.setDoubleSeatColumns(room.getDoubleSeatColumns());
//        roomTableReponse.setDoubleSeatRows(room.getDoubleSeatRows());
//        roomTableReponse.setTotalColumn(room.getTotalColumn());
//        roomTableReponse.setCinemaId(room.getCinema().getId());

//        List<Cinema> cinemaList = cinemaRespository.findAll();
//
//        List<SelectOptionReponse> optionsCinema = new ArrayList<>();
//
//        for (Cinema cinema : cinemaList) {
//            optionsCinema.add(new SelectOptionReponse(cinema.getId(), cinema.getName()));
//        }
        List<SelectOptionReponse> optionsCinema = cinemaRespository.findAll()
                .stream()
                .map(Option -> SelectOptionReponse.builder()
                        .value(Option.getId())
                        .label(Option.getName())
                        .build())
                .collect(Collectors.toList());

        SelectOptionAndModelReponse<RoomTableReponse> SelectOptionAndModelReponse = new SelectOptionAndModelReponse<>(optionsCinema, roomTableReponse);

        return SelectOptionAndModelReponse;
    }

    @Override
    public boolean updateRoom(RoomRequest roomRequest) {
        Room room = roomRepository.findById(roomRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (roomRepository.findByNameAndIdAndCinemaId(roomRequest.getName(), roomRequest.getCinema(), roomRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        ObjectUtils.copyFields(roomRequest, room);

        room.setCinema(cinemaRespository.getById(roomRequest.getCinema()));

        roomRepository.save(room);

        return true;
    }

    @Override
    public boolean delete(Integer id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(NOT_FOUND));
        roomRepository.delete(room);

        return true;
    }

    @Override
    public SelectOptionAndModelReponse getAllRoomAndStatusByCinemaId(Integer id) {
        SelectOptionAndModelReponse optionAndModelReponse = new SelectOptionAndModelReponse();

//        List<Room> rooms = roomRepository.getRoomByCinemaId(id);
//        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();
//
//        rooms.forEach(room -> {
//            selectOptionReponses.add(new SelectOptionReponse<>(room.getId(), room.getName()));
//        });
        List<SelectOptionReponse> selectOptionReponses =
                roomRepository.getRoomByCinemaId(id)
                        .stream()
                        .map(Option -> SelectOptionReponse.builder()
                        .value(Option.getId())
                        .label(Option.getName())
                        .build())
                .collect(Collectors.toList());

        optionAndModelReponse.setSelectOptionReponse(selectOptionReponses);

        List<SelectOptionReponse> selectOptionReponseStatus = new ArrayList<>();
        for (MovieFormat movieFormat : MovieFormat.values()) {
            selectOptionReponseStatus.add(new SelectOptionReponse<>(movieFormat.getValue(), movieFormat.getValue()));
        }
        optionAndModelReponse.setSelectOptionStatus(selectOptionReponseStatus);

        return optionAndModelReponse;
    }

    @Override
    public List<SelectOptionReponse<?>> getCreate() {
        List<Cinema> cinemaList = cinemaRespository.findAll();
        List<SelectOptionReponse<?>> selectOptionReponses = new ArrayList<>();
        cinemaList.forEach(cinema -> {
            selectOptionReponses.add(new SelectOptionReponse<>(cinema.getId(), cinema.getName()));
        });
        return selectOptionReponses;
    }

    @Override
    public boolean createRoom(RoomRequest roomRequest) {
        if (roomRepository.findByNameAndIdAndCinemaId(roomRequest.getName(), roomRequest.getCinema(), roomRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        Room room = new Room();
        ObjectUtils.copyFields(roomRequest, room);
        room.setCinema(cinemaRespository.getById(roomRequest.getCinema()));

        roomRepository.save(room);

        return true;
    }
}
