package com.sizibotix.sizibox.services;

import com.sizibotix.sizibox.models.SizibotixFile;

import java.util.List;

public interface FilesService {
    List<SizibotixFile> getFiles(String path);
    SizibotixFile getFile(String path);
    void deleteFile(String path);
    void createFile(String path);
    void updateFile(String path);
}
