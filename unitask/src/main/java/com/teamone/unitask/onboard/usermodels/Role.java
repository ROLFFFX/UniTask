package com.teamone.unitask.onboard.usermodels;

import javax.persistence.*;


/**
 * The Role entity class representing user roles stored in the database.
 */
@Entity
@Table(name = "roles")
public class Role {

    /**
     * The unique identifier for the role.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * The role name, represented by the ERole enumeration.
     */
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    /**
     * Default constructor.
     */
    public Role() {

    }

    /**
     * Constructor with the role name parameter.
     *
     * @param name The role name.
     */
    public Role(ERole name) {
        this.name = name;
    }

    /**
     * Get the unique identifier for the role.
     *
     * @return The role id.
     */
    public Integer getId() {
        return id;
    }

    /**
     * Set the unique identifier for the role.
     *
     * @param id The role id to set.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Get the role name.
     *
     * @return The role name.
     */
    public ERole getName() {
        return name;
    }

    /**
     * Set the role name.
     *
     * @param name The role name to set.
     */
    public void setName(ERole name) {
        this.name = name;
    }
}
