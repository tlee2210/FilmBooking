package com.cinemas.service.admin;

import com.cinemas.dto.request.RoomRequest;
import com.cinemas.dto.request.SearchRoomRequest;
import com.cinemas.dto.response.RoomTableReponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Room;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RoomService {
    List<SelectOptionReponse<?>> getCreate();

    boolean createRoom(RoomRequest roomRequest);

    SelectOptionAndModelReponse<Page<RoomTableReponse>> getAllRoom(SearchRoomRequest roomRequest);

    SelectOptionAndModelReponse<RoomTableReponse> getEditRoom(Integer id);

    boolean updateRoom(RoomRequest roomRequest);
    boolean delete(Integer id);

    SelectOptionAndModelReponse getAllRoomAndStatusByCinemaId(Integer id);
}
