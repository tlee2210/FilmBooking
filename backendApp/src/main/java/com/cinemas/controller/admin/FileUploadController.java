package com.cinemas.controller.admin;

import com.cinemas.service.admin.UploadFileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
@RequestMapping("/api/admin/file-upload")
@Tag(name = "Dashboard Upload File")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FileUploadController {
    UploadFileService uploadFileService;

    @PostMapping("/v1")
    public ResponseEntity<Map<String, String>> uploadFileReview(
            @RequestParam("upload") MultipartFile file,
            @RequestParam("type") String type
    ) throws IOException {
        String url = uploadFileService.UploadFile(file, type);

        Map<String, String> response = new HashMap<>();
        response.put("url", url);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}