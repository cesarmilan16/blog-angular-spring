package com.blog.blog_api.service;

import com.blog.blog_api.dto.PostDTO;
import com.blog.blog_api.entity.Posts;
import com.blog.blog_api.mapper.PostMapper;
import com.blog.blog_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository repo;

    public List<PostDTO> servQuery() {
        return repo.findAll().stream().map(PostMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PostDTO servQueryById(Long id) {
        Optional<Posts> exists = repo.findById(id);
        return exists.map(PostMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Post no encontrado con id: " + id));
    }

    // Nuevo función para la búsqueda por término
    public List<PostDTO> servQueryByTerm(String term) {
        // 💡 La función requiere que le pases el término tres veces, una por cada campo de búsqueda.
        // Usamos el mismo término para todos los campos (título, contenido, categoría).
        return repo.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                        term, term, term
                ).stream()
                .map(PostMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PostDTO servInsert(PostDTO dto) {
        Posts post = PostMapper.toEntity(dto);
        Posts insert = repo.save(post);
        return PostMapper.toDTO(insert);
    }

    public PostDTO servUpdate(Long id, PostDTO dto) {
        Optional<Posts> exists = repo.findById(id);

        if(exists.isPresent()) {
            Posts post = exists.get();

            post.setTitle(dto.getTitle());
            post.setContent(dto.getContent());
            post.setCategory(dto.getCategory());
            post.setTags(dto.getTags());

            Posts update = repo.save(post);

            return PostMapper.toDTO(update);
        } else {
            throw new RuntimeException("Post no encontrado con id: " + id);
        }
    }

    public String servDelete(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Post eliminado con exito";
        } else {
            return "Post no encontrado con id: " + id;
        }
    }

}
