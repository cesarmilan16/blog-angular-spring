package com.blog.blog_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "category")
    private String category;

    @Column(name = "tags")
    private String tags;

    @Override
    public String toString() {
        return "Post{" +
                "id: " + id +
                ", Titulo: '" + title + '\'' +
                ", Contenido: " + content +
                ", Categoria: " + category +
                "}";
    }

}
