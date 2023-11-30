package com.teamone.unitask.meetings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Meeting entities.
 * This interface extends JpaRepository, providing CRUD operations for Meeting objects.
 * It manages the persistence layer interactions for Meeting entities.
 */
@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // JpaRepository provides all the basic CRUD operations, so no additional methods are needed here.
    // If specific queries beyond the standard CRUD operations are required, they can be defined here.
}
