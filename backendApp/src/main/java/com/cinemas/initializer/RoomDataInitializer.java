package com.cinemas.initializer;

import com.cinemas.entities.Cinema;
import com.cinemas.entities.Room;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class RoomDataInitializer {
    @Autowired
    CinemaRespository cinemaRespository;
    @Autowired
    RoomRepository roomRepository;
    private static final List<String> ROOM_NAMES = Arrays.asList(
            "Room 1",
            "Room 2",
            "Room 3"
    );
    private static final List<Integer> SEAT_COLUMNS = Arrays.asList(
            14, 13, 15
    );
    private static final List<Integer> SEAT_ROWS = Arrays.asList(
            7, 7, 8
    );

    private static final List<Integer> DOUBLE_SEAT_ROWS = Arrays.asList(
            7, 8, 9
    );
    private static final List<Integer> DOUBLE_SEAT_COLUMNS = Arrays.asList(
            2, 2, 1
    );

    private static final List<Integer> TOTAL_COLUMNS = Arrays.asList(
            1, 2, 2
    );
    public void initRoomData() {
        if (roomRepository.count() == 0) {
            List<Room> roomList = new ArrayList<>();

            List<Cinema> cinemaList = cinemaRespository.findAll();
            for (Cinema cinema : cinemaList) {
                for (int i = 0; i < ROOM_NAMES.size(); i++) {
                    Room room = Room.builder()
                            .name(ROOM_NAMES.get(i))
                            .SeatRows(SEAT_ROWS.get(i))
                            .SeatColumns(SEAT_COLUMNS.get(i))
                            .doubleSeatRows(DOUBLE_SEAT_ROWS.get(i))
                            .doubleSeatColumns(DOUBLE_SEAT_COLUMNS.get(i))
                            .totalColumn(TOTAL_COLUMNS.get(i))
                            .cinema(cinema)
                            .build();

                    roomList.add(room);
                }
            }
            roomRepository.saveAll(roomList);
        }
    }
}

