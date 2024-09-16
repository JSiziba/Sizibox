package com.sizibotix.sizibox.services;

import com.sizibotix.sizibox.entities.FolderPath;
import com.sizibotix.sizibox.models.FolderPathRequest;
import com.sizibotix.sizibox.models.FolderPathResponse;
import com.sizibotix.sizibox.repositories.FolderPathsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FolderPathsService {
    private final FolderPathsRepository folderPathsRepository;

    public FolderPathResponse saveFolderPath(FolderPathRequest request) {
        log.info("Saving folder path: {}", request.getPath());
        FolderPath folderPath = FolderPath.builder()
                .path(request.getPath())
                .name(request.getName())
                .build();

        folderPath = folderPathsRepository.save(folderPath);

        return FolderPathResponse.fromEntity(folderPath);
    }

    public List<FolderPathResponse> getFolderPaths() {
        log.info("Getting all folder paths");
        List<FolderPath> folderPaths = folderPathsRepository.findAll();

        return FolderPathResponse.fromEntities(folderPaths);
    }

    public FolderPathResponse updateFolderPath(UUID id, FolderPathRequest request) {
        log.info("Updating folder path: {}", request.getPath());
        FolderPath folderPath = folderPathsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Folder path not found"));

        folderPath.setPath(request.getPath());
        folderPath.setName(request.getName());

        folderPath = folderPathsRepository.save(folderPath);

        return FolderPathResponse.fromEntity(folderPath);
    }

    public void deleteFolderPath(UUID id) {
        log.info("Deleting folder path: {}", id);
        folderPathsRepository.deleteById(id);
    }
}
