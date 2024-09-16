package com.sizibotix.sizibox.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FolderPath {
    @Id
    @GeneratedValue
    private UUID id;

    private String path;
    private String name;

    @CreationTimestamp
    private java.sql.Timestamp createdOn;

    @UpdateTimestamp
    private java.sql.Timestamp updatedOn;
}
