package com.examplecorp.demo;

public class NoteModel {
    private Integer id;
    private String title;
    private String content;
    private String status;
    private Long createdTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Long createdTime) {
        this.createdTime = createdTime;
    }

    public NoteEntity toEntity() {
        NoteEntity noteEntity = new NoteEntity();
        noteEntity.setId(this.id);
        noteEntity.setTitle(this.title);
        noteEntity.setContent(this.content);
        noteEntity.setStatus(this.status);
        noteEntity.setCreatedTime(this.createdTime);
        return noteEntity;
    }

    public static NoteModel fromEntity(NoteEntity noteEntity) {
        NoteModel noteModel = new NoteModel();
        noteModel.setId(noteEntity.getId());
        noteModel.setTitle(noteEntity.getTitle());
        noteModel.setContent(noteEntity.getContent());
        noteModel.setStatus(noteEntity.getStatus());
        noteModel.setCreatedTime(noteEntity.getCreatedTime());
        return noteModel;
    }
}
