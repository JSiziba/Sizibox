package com.sizibotix.sizibox.models;

import lombok.Data;

import java.util.ArrayList;

@Data
public class SizibotixFile {
    private String name;
    private String path;
    private String type;
    private String size;
    private String lastModified;
    private ArrayList<SizibotixFile> children;
}
