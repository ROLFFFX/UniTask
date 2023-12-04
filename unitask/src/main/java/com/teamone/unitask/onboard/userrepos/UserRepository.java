package com.teamone.unitask.onboard.userrepos;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Repository interface for managing User entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by username.
     *
     * @param username The username of the user to find.
     * @return An optional containing the found user or empty if not found.
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by ID.
     *
     * @param id The ID of the user to find.
     * @return An optional containing the found user or empty if not found.
     */
    Optional<User> findById(Long id);

    /**
     * Finds a user by email.
     *
     * @param email The email of the user to find.
     * @return An optional containing the found user or empty if not found.
     */
    Optional<User> findByEmail(String email);

    /**
     * Gets a user by email.
     *
     * @param email The email of the user to get.
     * @return The user with the specified email.
     */
    User getByEmail(String email);

    /**
     * Gets a user by username.
     *
     * @param username The username of the user to get.
     * @return The user with the specified username.
     */
    User getByUsername(String username);

    /**
     * Checks if a user with the given username exists.
     *
     * @param username The username to check.
     * @return True if a user with the username exists; otherwise, false.
     */
    Boolean existsByUsername(String username);

    /**
     * Checks if a user with the given email exists.
     *
     * @param email The email to check.
     * @return True if a user with the email exists; otherwise, false.
     */
    Boolean existsByEmail(String email);

    /**
     * Deletes a user by ID.
     *
     * @param id The ID of the user to delete.
     */
    void deleteById(Long id);

    /**
     * Finds users associated with a specific project.
     *
     * @param project The project to find users for.
     * @return A list of users associated with the specified project.
     */
    List<User> findUserByProjects(Project project);
}
