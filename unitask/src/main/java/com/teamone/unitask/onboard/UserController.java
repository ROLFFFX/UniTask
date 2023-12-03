package com.teamone.unitask.onboard;

import com.teamone.unitask.onboard.usermodels.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Controller class for managing User entities.
 */
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping(path = "users")
public class UserController {

    @Autowired
    UserService userService;


    /**
     * Retrieves the username associated with the provided JWT token.
     *
     * @param header The Authorization header containing the JWT token.
     * @return ResponseEntity containing the username if successful, otherwise an HTTP error status.
     */
    @GetMapping(path = "/getUsername")
    public ResponseEntity<String> getUsernameByJWT(@RequestHeader("Authorization") String header) {

        User cur_user = userService.getUserEmailFromToken(header);

        String username = cur_user.getUsername();

        return new ResponseEntity<>(username, HttpStatus.OK);
    }
}
