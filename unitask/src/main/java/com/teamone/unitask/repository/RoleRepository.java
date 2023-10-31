package com.teamone.unitask.repository;

import com.teamone.unitask.model.AppRole;
import com.teamone.unitask.model.EAppUserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<AppRole, Long> {
    Optional<EAppUserRole> findByName(EAppUserRole name);
}
