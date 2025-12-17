package com.blog.blog_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PostDTO {

    private Long id;
    @NotBlank(message = "El contenido no puede estar vacío.")
    private String title;
    @NotBlank(message = "El contenido no puede estar vacío.")
    @Size(max = 20000, message = "El contenido del post no puede exceder los 20,000 caracteres.")
    private String content;
    @NotBlank(message = "El contenido no puede estar vacío.")
    private String category;
    @NotBlank(message = "El contenido no puede estar vacío.")
    private String tags;

    public PostDTO(Long id, String title, String content, String category, String tags) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "PostDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", category='" + category + '\'' +
                ", tags='" + tags + '\'' +
                '}';
    }
}
