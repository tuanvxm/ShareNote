package com.examplecorp.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {
    @Autowired
    private NoteBusiness noteBusiness;

    @GetMapping("/hello")
    public String hello() {
        return "Hi there from " + System.getProperty("os.name") + "!";
    }

    @GetMapping("/note")
    public List<NoteModel> getNotes() {
        return noteBusiness.getNotes();
    }

    @GetMapping("/note/{id}")
    public NoteModel getNote(@PathVariable("id") int id) {
        return noteBusiness.getNote(id);
    }

    @PostMapping("/note")
    public NoteModel addNote(@RequestBody NoteModel noteModel) {
        return noteBusiness.addNote(noteModel);
    }

    @DeleteMapping("/note/{id}")
    public void deleteNote(@PathVariable("id") int id) {
        noteBusiness.deleteNote(id);
    }
}
