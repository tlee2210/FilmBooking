package com.cinemas.controller.admin;

import com.cinemas.service.admin.UploadFileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/v1/file-upload")
@Tag(name = "Dashboard Upload File")
public class FileUploadController {
    @Autowired
    private UploadFileService uploadFileService;

    //    @PostMapping()
//    public APIResponse<String> uploadFile(@RequestParam("upload") MultipartFile file) throws IOException {
//        String url = uploadFileService.UploadFile(file, "blog");
//        APIResponse<String> apiResponse = new APIResponse<>();
//        apiResponse.setResult(url);
//        System.out.println("=======================");
//        System.out.println(url);
//        System.out.println("=======================");
//        return apiResponse;
//    }
    @PostMapping()
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("upload") MultipartFile file) throws IOException {
        String url = uploadFileService.UploadFile(file, "blog");

        Map<String, String> response = new HashMap<>();
        response.put("url", url);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}