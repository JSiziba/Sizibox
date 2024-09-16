package com.sizibotix.sizibox.models;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Builder
public class FolderPathResponse {
    private UUID id;
    private String path;
    private String name;
    private Timestamp createdOn;
    private Timestamp updatedOn;

    public static FolderPathResponse fromEntity(com.sizibotix.sizibox.entities.FolderPath folderPath) {
        return FolderPathResponse.builder()
                .id(folderPath.getId())
                .path(folderPath.getPath())
                .name(folderPath.getName())
                .createdOn(folderPath.getCreatedOn())
                .updatedOn(folderPath.getUpdatedOn())
                .build();
    }

    public static List<FolderPathResponse> fromEntities(List<com.sizibotix.sizibox.entities.FolderPath> folderPaths) {
        return folderPaths.stream()
                .map(FolderPathResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
