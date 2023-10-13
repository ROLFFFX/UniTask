package com.teamone.unitask.repository;

import com.teamone.unitask.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
