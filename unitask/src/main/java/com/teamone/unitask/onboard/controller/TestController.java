package com.teamone.unitask.onboard.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class to test the authentications.
 */
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class TestController {

    /**
     * API to provide public content.
     *
     * @return A string representing public content.
     */
    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    /**
     * API to provide content accessible by users, moderators, and admins.
     *
     * @return A string representing user content.
     */
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    /**
     * API to provide content accessible by moderators only.
     *
     * @return A string representing moderator content.
     */
    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    /**
     * API to provide content accessible by admins only.
     *
     * @return A string representing admin content.
     */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }
}
