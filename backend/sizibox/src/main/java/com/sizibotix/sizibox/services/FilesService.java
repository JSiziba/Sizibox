package com.sizibotix.sizibox.services;


import com.sizibotix.sizibox.models.FileDetails;
import com.sizibotix.sizibox.models.FolderRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class FilesService {

    public List<FileDetails> getFiles(String folderPath) {
        List<FileDetails> fileDetailsList = new ArrayList<>();
        File folder = new File(folderPath);

        if (folder.exists() && folder.isDirectory()) {
            File[] files = folder.listFiles();
            if (files != null) {
                for (File file : files) {
                    FileDetails fileDetails = FileDetails.fromFile(file);
                    fileDetailsList.add(fileDetails);
                }
            }
        }

        return fileDetailsList;
    }

    public FileSystemResource downloadFile(String path) {
        File file = new File(path);
        if (!file.exists() || file.isDirectory()) {
            log.error("File not found: {}", path);
            return null;
        }

        return new FileSystemResource(file);
    }

    public String getMimeType(FileSystemResource file) {
        String mimeType = "application/octet-stream";
        try {
            mimeType = java.nio.file.Files.probeContentType(file.getFile().toPath());
        } catch (Exception e) {
            log.error("Error getting MIME type for file: {}", file.getFilename(), e);
        }
        return mimeType;
    }

    public String getMimeType(File file) {
        String mimeType = "application/octet-stream";
        try {
            mimeType = java.nio.file.Files.probeContentType(file.toPath());
        } catch (Exception e) {
            log.error("Error getting MIME type for file: {}", file.getName(), e);
        }
        return mimeType;
    }

    public FileDetails uploadSingleFile(MultipartFile multipartFile, String path) {
        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("Failed: File is empty");
        }

        try {
            Path destinationPath = Paths.get(path).toAbsolutePath().normalize();
            Files.createDirectories(destinationPath);

            Path targetLocation = destinationPath.resolve(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            multipartFile.transferTo(targetLocation.toFile());

            File file = targetLocation.toFile();

            return FileDetails.fromFile(file);

        } catch (IOException e) {
            log.error("Error uploading file", e);
            throw new IllegalArgumentException("Failed to upload file");
        }
    }

    public String deleteFile(String path) {
        String message = "File deleted successfully";
        File file = new File(path);
        if(!file.exists()) {
            throw new IllegalArgumentException("File not found");
        }

        if(file.isDirectory()) {
            File[] files = file.listFiles();
            if(files != null) {
                for(File f : files) {
                    deleteFile(f.getAbsolutePath());
                }
            }
            if(!file.delete()) {
                message = "Failed to delete directory";
            }
            else {
                log.info("Directory deleted: {}", path);
                message = "Directory deleted successfully";
            }
        }

        else {
            if(!file.delete()) {
                message = "Failed to delete file";
            }
            else {
                log.info("File deleted: {}", path);
                message = "File deleted successfully";
            }
        }

        return message;
    }

    public FileDetails renameFile(String path, String newName) {
        File oldFile = new File(path);
        String newPath = oldFile.getParent() + File.separator + newName;
        File newFile = new File(newPath);

        if(!oldFile.exists()) {
            throw new IllegalArgumentException("File not found");
        }

        if(newFile.exists()) {
            throw new IllegalArgumentException("File already exists");
        }

        if(oldFile.renameTo(newFile)) {
            log.info("File renamed: {} -> {}", path, newPath);
            return FileDetails.fromFile(newFile);
        }
        else {
            throw new IllegalArgumentException("Failed to rename file");
        }
    }

    public FileDetails createFolder(FolderRequest folderRequest) {
        File folder = new File(folderRequest.getPath() + File.separator + folderRequest.getFolderName());
        if(folder.exists()) {
            throw new IllegalArgumentException("Folder already exists");
        }

        if(folder.mkdir()) {
            log.info("Folder created: {}", folder.getAbsolutePath());
            return FileDetails.fromFile(folder);
        }
        else {
            throw new IllegalArgumentException("Failed to create folder");
        }
    }
}
