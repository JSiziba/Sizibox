package com.sizibotix.sizibox.repositories;

import com.sizibotix.sizibox.entities.FolderPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FolderPathsRepository extends JpaRepository<FolderPath, UUID> {
}
