package com.examplecorp.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class NoteBusiness {
    @Autowired
    private NoteRepository noteRepository;

    public List<NoteModel> getNotes() {
        return StreamSupport.stream(noteRepository.findAll().spliterator(), false)
                .map(NoteModel::fromEntity)
                .collect(Collectors.toList());
    }

    public NoteModel getNote(@PathVariable("id") int id) {
        return NoteModel.fromEntity(noteRepository.findById(id).get());
    }

    public NoteModel addNote(@RequestBody NoteModel noteModel) {
        return NoteModel.fromEntity(noteRepository.save(noteModel.toEntity()));
    }

    public void deleteNote(@PathVariable("id") int id) {
        noteRepository.delete(noteRepository.findById(id).get());
    }
}
