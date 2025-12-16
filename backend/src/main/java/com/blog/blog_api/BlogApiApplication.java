package com.blog.blog_api;

import com.blog.blog_api.entity.Posts;
import com.blog.blog_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BlogApiApplication implements CommandLineRunner {

    @Autowired
    private PostRepository postRepo;

	public static void main(String[] args) {
		SpringApplication.run(BlogApiApplication.class, args);
	}

    /*
     *Con CommandLineRunner podemos hacer que justo después de iniciar el servidor
     * corra el código que pongamos en el siguiente metodo
     */
    @Override
    public void run(String... args) throws Exception {
        System.out.println("Aplicación iniciada correctamente");
        List<Posts>posts = postRepo.findAll();
        posts.forEach(System.out::println);
    }
}
