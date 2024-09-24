package com.sizibotix.sizibox.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FolderRequest {
    private String folderName;
    private String path;
}
