package com.blog.blog_api.repository;

import com.blog.blog_api.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Posts, Long> {

    // Este nombre de método le dice a JPA que busque:
    // 1. Por Title LIKE %term%
    // 2. OR por Content LIKE %term%
    // 3. OR por Category LIKE %term%
    List<Posts> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String term, String term2, String term3
    );

}
