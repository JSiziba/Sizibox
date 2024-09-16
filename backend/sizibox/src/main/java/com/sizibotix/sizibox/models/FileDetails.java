package com.sizibotix.sizibox.models;

import com.sizibotix.sizibox.services.FileTypeUtils;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FileDetails {
    private String name;
    private String path;
    private String type;
    private String size;
    private String lastModified;

    public static FileDetails fromFile(java.io.File file) {
        String name = file.getName();
        String path = file.getAbsolutePath();
        String type;
        if (file.isDirectory()) {
            type = "Folder";
        } else {
            String extension = "";
            int i = file.getName().lastIndexOf('.');
            if (i > 0) {
                extension = file.getName().substring(i + 1).toLowerCase();
            }
            type = FileTypeUtils.getFileType(extension);
        }
        String size = file.isFile() ? humanReadableByteCount(file.length()) : "-";
        String lastModified = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(file.lastModified()));

        return FileDetails.builder()
                .name(name)
                .path(path)
                .type(type)
                .size(size)
                .lastModified(lastModified)
                .build();
    }

    public static String humanReadableByteCount(long bytes) {
        int unit = 1024;
        if (bytes < unit) return bytes + " Bytes";
        int exp = (int) (Math.log(bytes) / Math.log(unit));
        String[] units = {"KB", "MB", "GB", "TB", "PB", "EB"};
        return String.format("%.1f %s", bytes / Math.pow(unit, exp), units[exp - 1]);
    }
}
