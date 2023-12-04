package com.teamone.unitask.onboard.userrepos;


import com.teamone.unitask.onboard.usermodels.ERole;
import com.teamone.unitask.onboard.usermodels.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Repository interface for managing Role entities.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Finds a role by its name.
     *
     * @param name The name of the role to find.
     * @return An optional containing the found role or empty if not found.
     */
    Optional<Role> findByName(ERole name);

}
