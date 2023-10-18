package com.backend.unitaskproject.repository;

import com.backend.unitaskproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
