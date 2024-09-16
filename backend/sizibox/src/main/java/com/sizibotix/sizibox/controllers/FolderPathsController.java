package com.sizibotix.sizibox.controllers;

import com.sizibotix.sizibox.models.FolderPathRequest;
import com.sizibotix.sizibox.models.FolderPathResponse;
import com.sizibotix.sizibox.services.FolderPathsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/folder-paths")
public class FolderPathsController {
    private final FolderPathsService folderPathsService;

    @GetMapping
    public ResponseEntity<List<FolderPathResponse>> getFolderPaths() {
        log.info("Getting all folder paths");
        List<FolderPathResponse> folderPaths = folderPathsService.getFolderPaths();

        return ResponseEntity.ok(folderPaths);
    }

    @PostMapping
    public ResponseEntity<FolderPathResponse> saveFolderPath(@RequestBody FolderPathRequest request) {
        log.info("Saving folder path: {}", request.getPath());
        FolderPathResponse folderPath = folderPathsService.saveFolderPath(request);

        return ResponseEntity.ok(folderPath);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FolderPathResponse> updateFolderPath(@PathVariable UUID id, @RequestBody FolderPathRequest request) {
        log.info("Updating folder path: {}", request.getPath());
        FolderPathResponse folderPath = folderPathsService.updateFolderPath(id, request);

        return ResponseEntity.ok(folderPath);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolderPath(@PathVariable UUID id) {
        log.info("Deleting folder path: {}", id);
        folderPathsService.deleteFolderPath(id);

        return ResponseEntity.noContent().build();
    }
}
