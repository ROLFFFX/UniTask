package com.teamone.unitask.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "first_name", nullable = false, length = 30)
    private String firstName;
    @Column(name = "last_name",nullable = false, length = 30)
    private String lastName;
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "is_master", nullable = false)
    private Boolean isMaster = false;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "tbl_timeslot_user", joinColumns = {@JoinColumn(name = "timesolt_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private List<TimeSlot> timeslotsChosen;


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Boolean getMaster() {
        return isMaster;
    }

    public void setMaster(Boolean master) {
        isMaster = master;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<TimeSlot> getTimeslotsChosen() {
        return timeslotsChosen;
    }

    public void setTimeslotsChosen(List<TimeSlot> timeslotsChosen) {
        this.timeslotsChosen = timeslotsChosen;
    }
}
