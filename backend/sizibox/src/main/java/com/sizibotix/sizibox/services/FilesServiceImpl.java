package com.sizibotix.sizibox.services;


import com.sizibotix.sizibox.models.SizibotixFile;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;

@Service
public class FilesServiceImpl implements FilesService {
//    private static final String MEDIA_SERVER_PATH = "/home/su/Documents/t-1000";
    private static final String MEDIA_SERVER_PATH = "C:\\Users\\JohnsonS\\Desktop";


    @SneakyThrows
    @Override
    public List<SizibotixFile> getFiles(String path) {
        Path startPath = Paths.get(MEDIA_SERVER_PATH);
        List<SizibotixFile> files = new ArrayList<>();
        Files.walkFileTree(startPath, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                files.add(createSizibotixFile(file, attrs));
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
                files.add(createSizibotixFile(dir, attrs));
                return FileVisitResult.CONTINUE;
            }
        });
        return files;
    }

    private SizibotixFile createSizibotixFile(Path path, BasicFileAttributes attrs) {
        SizibotixFile sizibotixFile = new SizibotixFile();
        sizibotixFile.setName(path.getFileName().toString());
        sizibotixFile.setPath(path.toAbsolutePath().toString());
        sizibotixFile.setType(Files.isDirectory(path) ? "directory" : "file");
        sizibotixFile.setSize(String.valueOf(attrs.size()));
        sizibotixFile.setLastModified(String.valueOf(attrs.lastModifiedTime().toMillis()));
        sizibotixFile.setChildren(new ArrayList<>());

        return sizibotixFile;
    }

    private void listFilesRecursive(File dir, List<SizibotixFile> mediaFiles) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    listFilesRecursive(file, mediaFiles);
                } else {
                    SizibotixFile sizibotixFile = new SizibotixFile();
                    sizibotixFile.setName(file.getName());
                    sizibotixFile.setPath(file.getAbsolutePath());
                    sizibotixFile.setType(file.isFile() ? "file" : "directory");
                    sizibotixFile.setSize(String.valueOf(file.length()));
                    sizibotixFile.setLastModified(String.valueOf(file.lastModified()));
                    mediaFiles.add(sizibotixFile);
                }
            }
        }
    }

    @Override
    public SizibotixFile getFile(String path) {
        return null;
    }

    @Override
    public void deleteFile(String path) {

    }

    @Override
    public void createFile(String path) {

    }

    @Override
    public void updateFile(String path) {

    }
}
