import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { PostDTO } from '../../models/post';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-create.html',
})
export class PostCreate {

  private service = inject(PostService);
  // ⬅️ INYECTAR ChangeDetectorRef
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  public newPostTitle: string = '';
  public newPostContent: string = '';
  public newPostCategory: string = '';
  public newPostTags: string = '';

  public isLoading: boolean = false; 
  public successMessage: string | null = null;

  public createPost(): void {
    
    // Limpieza y validación
    this.successMessage = null;
    if (!this.newPostTitle || !this.newPostContent) {
      alert('El título y el contenido no pueden estar vacíos.');
      return;
    }
    
    // Objeto DTO (usamos los nombres de tu interfaz: title, content)
    const newPost: PostDTO = {
      title: this.newPostTitle,
      content: this.newPostContent,
      category: this.newPostCategory || 'General',
      tags: this.newPostTags || '',
    };
    
    this.isLoading = true;

    // Llamada al servicio
    this.service.createPost(newPost).subscribe({
      next: (response) => {
        const postId = response.id; // Obtener el ID del post creado

        this.successMessage = `Post "${response.title}" creado con éxito.`;
        this.isLoading = false;
        
        // Limpiar formulario y variables
        this.newPostTitle = '';
        this.newPostContent = '';
        this.newPostCategory = '';
        this.newPostTags = '';

        this.cdr.detectChanges();

        setTimeout(() => {
        this.successMessage = null;
        this.cdr.detectChanges();
        }, 3000);

        if (postId) {
            this.router.navigate(['/post', postId]);
        }

      },
      error: (e) => {
        alert('Error al crear el post. Revisa la consola del navegador y el servidor de Java.');
        console.error('API Error:', e);
        this.isLoading = false;

      }
    });
  }

}
