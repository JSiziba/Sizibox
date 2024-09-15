package com.sizibotix.sizibox.controllers;

import com.sizibotix.sizibox.models.SizibotixFile;
import com.sizibotix.sizibox.services.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/media-server")
public class MediaServerController {
    private final FilesService filesService;

    @GetMapping("/status")
    public String getMediaServerStatus() {
        return "Media Server is up and running";
    }

    @GetMapping("/files")
    public ResponseEntity<List<SizibotixFile>> getMediaServerFiles() {
        List<SizibotixFile> files = filesService.getFiles("/home/su/Documents/t-1000");
        return ResponseEntity.ok(files);
    }
}
