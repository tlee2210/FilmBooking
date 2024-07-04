package com.cinemas.controller.admin;

import com.cinemas.dto.request.RoomRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.SearchRoomRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieGenre;
import com.cinemas.entities.Room;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.RoomService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/room")
@Tag(name = "Dashboard Room Cinema Controller")
public class RoomController {
    @Autowired
    private RoomService roomService;

    /**
     * get all or search Room
     *
     * @param name
     * @param cinema
     * @param pageNo
     * @param pageSize
     * @param sort
     * @return
     */
    @GetMapping
    public APIResponse<SelectOptionAndModelReponse<Page<RoomTableReponse>>> getAllRoom(@RequestParam(required = false) String name, @RequestParam(required = false) Integer cinema, @RequestParam(required = false, defaultValue = "1") Integer pageNo, @RequestParam(required = false, defaultValue = "15") Integer pageSize, @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort) {
        SearchRoomRequest roomRequest = new SearchRoomRequest(pageNo - 1, pageSize, sort, name, cinema);
        SelectOptionAndModelReponse<Page<RoomTableReponse>> optionAndModelReponse = roomService.getAllRoom(roomRequest);

        APIResponse<SelectOptionAndModelReponse<Page<RoomTableReponse>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(optionAndModelReponse);

        return apiResponse;
    }

    /**
     * get cinema for create
     *
     * @return
     */
    @GetMapping("/create")
    public APIResponse<List<SelectOptionReponse<?>>> getCreateRoom() {
        APIResponse<List<SelectOptionReponse<?>>> apiResponse = new APIResponse();

        List<SelectOptionReponse<?>> reponse = roomService.getCreate();
        apiResponse.setCode(200);
        apiResponse.setResult(reponse);

        return apiResponse;
    }

    /**
     * create new room
     *
     * @param roomRequest
     * @return
     */
    @PostMapping("/create")
    public APIResponse<String> createRoom(@RequestBody RoomRequest roomRequest) {
        boolean checkCreate = roomService.createRoom(roomRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    /**
     * get room detail by id
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}/edit")
    public APIResponse<SelectOptionAndModelReponse<RoomTableReponse>> getEditRoom(@PathVariable Integer id) {
        APIResponse<SelectOptionAndModelReponse<RoomTableReponse>> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(roomService.getEditRoom(id));

        return apiResponse;
    }

    /**
     * update room
     *
     * @param roomRequest
     * @return
     */
    @PutMapping("/update")
    public APIResponse<String> updateRoom(@ModelAttribute RoomRequest roomRequest) {
        boolean checkUpdate = roomService.updateRoom(roomRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    /**
     * delete room by id
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}/delete")
    public APIResponse<String> deleteRoom(@PathVariable Integer id) {
        boolean checkDelete = roomService.delete(id);
        if (checkDelete) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Delete successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{id}")
    public APIResponse<SelectOptionAndModelReponse> getAllRoomByCinemaIdToSelectOption(@PathVariable Integer id) {
        SelectOptionAndModelReponse cinemaList = roomService.getAllRoomAndStatusByCinemaId(id);
        APIResponse<SelectOptionAndModelReponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(cinemaList);

        return apiResponse;
    }
}
