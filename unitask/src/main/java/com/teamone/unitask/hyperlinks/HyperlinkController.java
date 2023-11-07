package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.onboard.payload.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "", maxAge = 3600)
@RestController
@RequestMapping("/hyperlinks")
public class HyperlinkController {

    @Autowired
    HyperlinkRepository hyperlinkRepository;

    @PostMapping("/createHyperlink")
    public ResponseEntity<?> createHyperlink(@RequestBody Hyperlink hyperlink) {
        try {
            hyperlinkRepository.save(hyperlink);
            return ResponseEntity.ok(new MessageResponse("New hyperlink created!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot create hyperlink."));
        }
    }

    @GetMapping("/getAllHyperlinks")
    public List<Hyperlink> getAllHyperlinks() {
        return hyperlinkRepository.findAll();
    }

    @DeleteMapping("/deleteHyperlink/{id}")
    public ResponseEntity<?> deleteHyperlink(@PathVariable("id") Long id) {
        try {
            hyperlinkRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Hyperlink has been deleted."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot delete the hyperlink."));
        }
    }

//    @PutMapping("/editHyperlink/{id}")
//    public ResponseEntity<?> editHyperlink(@PathVariable("id") Long id, @RequestBody Hyperlink hyperlink) {
//
//    }

}
