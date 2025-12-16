package com.blog.blog_api.mapper;

import com.blog.blog_api.dto.PostDTO;
import com.blog.blog_api.entity.Posts;

public class PostMapper {

    public static PostDTO toDTO(Posts post) {

        return new PostDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCategory(),
                post.getTags()
        );

    }

    public static Posts toEntity(PostDTO dto) {
        Posts post = new Posts();
        post.setId(dto.getId());
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setCategory(dto.getCategory());
        post.setTags(dto.getTags());
        return post;
    }

}
