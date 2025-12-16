package com.blog.blog_api.controller;

import com.blog.blog_api.dto.PostDTO;
import com.blog.blog_api.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService service;

    @GetMapping
    // Acepta el parámetro 'term'. 'required = false' lo hace opcional.
    public List<PostDTO> queryList(@RequestParam(required = false) String term) {
        if (term != null && !term.trim().isEmpty()) {
            // Si el término existe, llama al nuevo método del servicio para filtrar
            return service.servQueryByTerm(term.trim());
        } else {
            // Si no hay término, devuelve la lista completa como antes
            return service.servQuery();
        }
    }

    @GetMapping("/{id}")
    public PostDTO queryById(@PathVariable Long id) { return service.servQueryById(id); }

    @PostMapping
    public PostDTO insertPost(@Valid @RequestBody PostDTO dto) {
        return service.servInsert(dto);
    }

    @PutMapping("/{id}")
    public PostDTO updatePost(@PathVariable Long id, @RequestBody PostDTO dto) {
        return service.servUpdate(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id) {
        return service.servDelete(id);
    }

}
