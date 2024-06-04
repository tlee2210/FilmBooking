package com.cinemas.controller.admin;

import com.cinemas.dto.request.RoomRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.SearchRoomRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieGenre;
import com.cinemas.entities.Room;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.RoomService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/room")
@Tag(name = "Movie Room Controller")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping
    public APIResponse<SelectOptionAndModelReponse<Page<RoomTableReponse>>> getAllRoom(@RequestParam(required = false) String name, @RequestParam(required = false) Integer cinema, @RequestParam(required = false, defaultValue = "1") Integer pageNo, @RequestParam(required = false, defaultValue = "15") Integer pageSize, @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort) {
        SearchRoomRequest roomRequest = new SearchRoomRequest(pageNo - 1, pageSize, sort, name, cinema);
        SelectOptionAndModelReponse<Page<RoomTableReponse>> optionAndModelReponse = roomService.getAllRoom(roomRequest);

        APIResponse<SelectOptionAndModelReponse<Page<RoomTableReponse>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(optionAndModelReponse);

        return apiResponse;
    }

    @GetMapping("/create")
    public APIResponse<List<SelectOptionReponse<?>>> getCreateRoom() {
        APIResponse<List<SelectOptionReponse<?>>> apiResponse = new APIResponse();

        List<SelectOptionReponse<?>> reponse = roomService.getCreate();
        apiResponse.setCode(200);
        apiResponse.setResult(reponse);

        return apiResponse;
    }

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

    @GetMapping("/{id}/edit")
    public APIResponse<SelectOptionAndModelReponse<RoomTableReponse>> getEditRoom(@PathVariable Integer id) {
        APIResponse<SelectOptionAndModelReponse<RoomTableReponse>> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(roomService.getEditRoom(id));

        return apiResponse;
    }

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
}
