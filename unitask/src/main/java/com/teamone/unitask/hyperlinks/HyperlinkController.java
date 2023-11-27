package com.teamone.unitask.hyperlinks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * The Controller class for the Hyperlink page;
 */
@CrossOrigin(origins = "", maxAge = 3600)
@RestController
@RequestMapping("/hyperlinks")
public class HyperlinkController {

    @Autowired
    HyperlinkService hyperlinkService;


    /*
     * Post method that take a Hyperlink object and the project title as input; if the project title is valid;
     * save the Hyperlink object to the database and return the Hyperlink object with HttpStatus.CREATED, else,
     * return null and HttpStatus.BAD_REQUEST;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/createHyperlink/{projectTitle}")
    public ResponseEntity<Hyperlink> createHyperlink(@RequestBody Hyperlink hyperlink,
                                             @PathVariable("projectTitle") String projectTitle) {

        Hyperlink requestHyperlink = hyperlinkService.createHyperlink(hyperlink, projectTitle);

        if (requestHyperlink == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(requestHyperlink, HttpStatus.CREATED);
        }
    }

    /*
     * Get method that takes the project title as input, return all the Hyperlinks of the given project and
     * HttpStatus.OK if the given project title is valid; else, return null and HttpStatus.BAD_REQUEST;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getAllHyperlinks/{projectTitle}")
    public ResponseEntity<List<Hyperlink>> getAllHyperlinks(@PathVariable("projectTitle") String projectTitle) {

        List<Hyperlink> requestListHyperLink = hyperlinkService.getHyperlinksByProjectTitle(projectTitle);

        if (requestListHyperLink == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(requestListHyperLink, HttpStatus.OK);
        }
    }

    /*
     * Put method that take the hyperlinkId and new hyperlink object as input, modify the existing hyperlink in the
     * database; if successfully modified, return the modified hyperlink object and HttpStatus.OK; else, throw the
     * ResourceNotFoundException;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping("/editHyperlink/{id}")
    public ResponseEntity<Hyperlink> updateHyperlink(@PathVariable("id") Long hyperlinkId, @RequestBody Hyperlink hyperlink) {

        Hyperlink hyperlinkToEdit = hyperlinkService.editHyperlinkByHyperlinkId(hyperlinkId, hyperlink);

        return new ResponseEntity<>(hyperlinkToEdit, HttpStatus.OK);
    }

    /*
     * Delete method that take a hyperlink id as the input, and remove it from the database; if the given hyperlink id
     * in invalid, throw the ResourceNotFound exception;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @DeleteMapping("/deleteHyperlink/{id}")
    public ResponseEntity<Hyperlink> deleteHyperlink(@PathVariable("id") Long hyperlinkId) {

        Hyperlink hyperlinkToDelete = hyperlinkService.deleteHyperlinkByHyperlinkId(hyperlinkId);

        return new ResponseEntity<>(hyperlinkToDelete, HttpStatus.OK);
    }

}
