package com.teamone.unitask.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "app_role")
public class AppRole {

    @SequenceGenerator(
            name = "appRole_sequence",
            sequenceName = "appRole_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "appRole_sequence"
    )
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EAppUserRole name;

    public AppRole() {

    }

    public AppRole(EAppUserRole name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EAppUserRole getName() {
        return name;
    }

    public void setName(EAppUserRole name) {
        this.name = name;
    }
}
