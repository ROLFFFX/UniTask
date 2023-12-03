package com.teamone.unitask.timeslots;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for TimeSlot entities.
 * This interface extends JpaRepository, enabling standard CRUD operations for TimeSlot objects.
 * It serves as the data access layer for TimeSlot entities, facilitating interaction with the database.
 */
@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    // Since JpaRepository provides standard CRUD operations, no additional methods are required here.
    // Custom query methods can be defined in this interface if needed for specific requirements.
}