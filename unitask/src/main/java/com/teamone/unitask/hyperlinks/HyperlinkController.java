package com.teamone.unitask.hyperlinks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controller class for the Hyperlink page.
 */
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/hyperlinks")
public class HyperlinkController {

    @Autowired
    HyperlinkService hyperlinkService;


    /**
     * POST method that takes a Hyperlink object and the project title as input.
     * If the project title is valid, save the Hyperlink object to the database and return the Hyperlink object with
     * HttpStatus.CREATED. Otherwise, return null and HttpStatus.BAD_REQUEST.
     */
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

    /**
     * GET method that takes the project title as input.
     * Returns all the Hyperlinks of the given project and HttpStatus.OK if the given project title is valid.
     * Otherwise, return null and HttpStatus.BAD_REQUEST.
     */
    @GetMapping("/getAllHyperlinks/{projectTitle}")
    public ResponseEntity<List<Hyperlink>> getAllHyperlinks(@PathVariable("projectTitle") String projectTitle) {

        List<Hyperlink> requestListHyperLink = hyperlinkService.getHyperlinksByProjectTitle(projectTitle);

        if (requestListHyperLink == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(requestListHyperLink, HttpStatus.OK);
        }
    }

    /**
     * PUT method that takes the hyperlinkId and a new hyperlink object as input.
     * Modifies the existing hyperlink in the database. If successfully modified, return the modified hyperlink object and
     * HttpStatus.OK. Otherwise, throw the ResourceNotFoundException.
     */
    @PutMapping("/editHyperlink/{id}")
    public ResponseEntity<Hyperlink> updateHyperlink(@PathVariable("id") Long hyperlinkId, @RequestBody Hyperlink hyperlink) {

        Hyperlink hyperlinkToEdit = hyperlinkService.editHyperlinkByHyperlinkId(hyperlinkId, hyperlink);

        return new ResponseEntity<>(hyperlinkToEdit, HttpStatus.OK);
    }

    /**
     * DELETE method that takes a hyperlink id as the input and removes it from the database.
     * If the given hyperlink id is invalid, throw the ResourceNotFoundException.
     */
    @DeleteMapping("/deleteHyperlink/{id}")
    public ResponseEntity<Hyperlink> deleteHyperlink(@PathVariable("id") Long hyperlinkId) {

        Hyperlink hyperlinkToDelete = hyperlinkService.deleteHyperlinkByHyperlinkId(hyperlinkId);

        return new ResponseEntity<>(hyperlinkToDelete, HttpStatus.OK);
    }

}
