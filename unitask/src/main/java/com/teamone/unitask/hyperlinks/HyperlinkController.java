package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.onboard.payload.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "", maxAge = 3600)
@RestController
@RequestMapping("/hyperlinks")
public class HyperlinkController {

    @Autowired
    HyperlinkService hyperlinkService;

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

    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping("/editHyperlink/{id}")
    public ResponseEntity<Hyperlink> updateHyperlink(@PathVariable("id") Long hyperlinkId, @RequestBody Hyperlink hyperlink) {

        Hyperlink hyperlinkToEdit = hyperlinkService.editHyperlinkByHyperlinkId(hyperlinkId, hyperlink);

        return new ResponseEntity<>(hyperlinkToEdit, HttpStatus.OK);
    }

    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @DeleteMapping("/deleteHyperlink/{id}")
    public ResponseEntity<Hyperlink> deleteHyperlink(@PathVariable("id") Long hyperlinkId) {

        Hyperlink hyperlinkToDelete = hyperlinkService.deleteHyperlinkByHyperlinkId(hyperlinkId);

        return new ResponseEntity<>(hyperlinkToDelete, HttpStatus.OK);
    }

}
