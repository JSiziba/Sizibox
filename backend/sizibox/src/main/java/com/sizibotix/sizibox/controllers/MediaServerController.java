package com.sizibotix.sizibox.controllers;

import com.sizibotix.sizibox.models.FileDetails;
import com.sizibotix.sizibox.models.FolderRequest;
import com.sizibotix.sizibox.services.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
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
    public ResponseEntity<List<FileDetails>> getMediaServerFiles(@RequestParam String path) {
        List<FileDetails> files = filesService.getFiles(path);
        return ResponseEntity.ok(files);
    }

    @GetMapping("/download")
    public ResponseEntity<FileSystemResource> downloadFile(@RequestParam String path) {
        FileSystemResource file = filesService.downloadFile(path);

        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        File fileRes = new File(path);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileRes.getName() + "\"");
        headers.add(HttpHeaders.CONTENT_TYPE, filesService.getMimeType(file));
        headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileRes.length()));

        return ResponseEntity.ok()
                .headers(headers)
                .body(file);
    }

    @GetMapping("/stream-media")
    public ResponseEntity<InputStreamResource> streamMedia(@RequestParam String path, @RequestHeader HttpHeaders headers) throws IOException {
        File file = new File(path);
        if (!file.exists() || !file.isFile()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        long fileSize = file.length();
        List<HttpRange> ranges = headers.getRange();

        // Check if the request is asking for a specific range (partial content)
        if (ranges.isEmpty()) {
            // No range specified, serve the whole file
            InputStream inputStream = new FileInputStream(file);
            InputStreamResource resource = new InputStreamResource(inputStream);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"");
            responseHeaders.add(HttpHeaders.CONTENT_TYPE, filesService.getMimeType(file));

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .contentLength(fileSize)
                    .body(resource);
        } else {
            // Serve the requested range (partial content)
            HttpRange range = ranges.getFirst(); // Only handle the first range for simplicity
            long start = range.getRangeStart(fileSize);
            long end = range.getRangeEnd(fileSize);

            InputStream inputStream = new FileInputStream(file);
            inputStream.skip(start); // Skip to the start of the requested range
            InputStreamResource resource = new InputStreamResource(inputStream);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"");
            responseHeaders.add(HttpHeaders.CONTENT_TYPE, filesService.getMimeType(file));
            responseHeaders.add(HttpHeaders.ACCEPT_RANGES, "bytes");

            long contentLength = end - start + 1;
            responseHeaders.add(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + fileSize);

            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .headers(responseHeaders)
                    .contentLength(contentLength)
                    .body(resource);
        }
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<FileDetails> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("path") String path) {
        FileDetails fileDetails = filesService.uploadSingleFile(file, path);
        return ResponseEntity.ok(fileDetails);
    }

    @PostMapping("/uploadFiles")
    public ResponseEntity<ArrayList<FileDetails>> uploadFiles(@RequestParam("files") List<MultipartFile> files, @RequestParam("path") String path) {
        ArrayList<FileDetails> fileDetailsList = new ArrayList<>();

        for (MultipartFile file : files) {
            FileDetails fileDetails = filesService.uploadSingleFile(file, path);
            fileDetailsList.add(fileDetails);
        }

        return ResponseEntity.ok(fileDetailsList);
    }

    @DeleteMapping("/deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam String path) {
        String message = filesService.deleteFile(path);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/renameFile")
    public ResponseEntity<FileDetails> renameFile(@RequestParam String path, @RequestParam String newName) {
        FileDetails fileDetails = filesService.renameFile(path, newName);
        return ResponseEntity.ok(fileDetails);
    }

    @PostMapping("/add-new-folder")
    public ResponseEntity<FileDetails> createNewFolder(@RequestBody FolderRequest folderRequest) {
        FileDetails fileDetails = filesService.createFolder(folderRequest);
        return ResponseEntity.ok(fileDetails);
    }
}
