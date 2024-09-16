package com.sizibotix.sizibox.services;

import java.util.HashMap;
import java.util.Map;

public class FileTypeUtils {

    private static final Map<String, String> FILE_TYPE_MAP = new HashMap<>();

    static {
        // Images
        FILE_TYPE_MAP.put("jpg", "Image");
        FILE_TYPE_MAP.put("jpeg", "Image");
        FILE_TYPE_MAP.put("png", "Image");
        FILE_TYPE_MAP.put("gif", "Image");
        FILE_TYPE_MAP.put("bmp", "Image");

        // Audio
        FILE_TYPE_MAP.put("mp3", "Audio");
        FILE_TYPE_MAP.put("wav", "Audio");
        FILE_TYPE_MAP.put("aac", "Audio");
        FILE_TYPE_MAP.put("flac", "Audio");

        // Video
        FILE_TYPE_MAP.put("mp4", "Video");
        FILE_TYPE_MAP.put("avi", "Video");
        FILE_TYPE_MAP.put("mkv", "Video");
        FILE_TYPE_MAP.put("mov", "Video");

        // Text Files
        FILE_TYPE_MAP.put("txt", "Text File");
        FILE_TYPE_MAP.put("log", "Text File");
        FILE_TYPE_MAP.put("md", "Text File");

        // Documents
        FILE_TYPE_MAP.put("pdf", "Document");
        FILE_TYPE_MAP.put("doc", "Document");
        FILE_TYPE_MAP.put("docx", "Document");
        FILE_TYPE_MAP.put("ppt", "Document");
        FILE_TYPE_MAP.put("pptx", "Document");
        FILE_TYPE_MAP.put("xls", "Document");
        FILE_TYPE_MAP.put("xlsx", "Document");

        // Compressed Files
        FILE_TYPE_MAP.put("zip", "Compressed File");
        FILE_TYPE_MAP.put("rar", "Compressed File");
        FILE_TYPE_MAP.put("7z", "Compressed File");
        FILE_TYPE_MAP.put("tar", "Compressed File");

        // Executables
        FILE_TYPE_MAP.put("exe", "Executable");
        FILE_TYPE_MAP.put("msi", "Executable");

        // Add more file types as needed
    }

    public static String getFileType(String extension) {
        return FILE_TYPE_MAP.getOrDefault(extension.toLowerCase(), "File");
    }
}
