package com.teamone.unitask.onboard.userrepos;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    User getByEmail(String email);

    User getByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    void deleteById(Long id);

    List<User> findUserByProjects(Project project);
}
