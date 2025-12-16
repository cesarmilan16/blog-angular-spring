import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostDTO } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './post-detail.html',
})
export class PostDetail implements OnInit {

  postId: string | null = null;
  // 🆕 Usamos tu interfaz Post para tipar la propiedad
  post: PostDTO | null = null;
  isLoading: boolean = true;

  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');

      if (this.postId) {
        this.loadPost(this.postId);
      } else {
        this.isLoading = false;
      }
    });
  }

  getTagsArray(tagsString: string | string[]): string[] {
    if (!tagsString) return [];

    // Si ya es un array, devuélvelo. Si no, divídelo y limpia.
    if (Array.isArray(tagsString)) {
      return tagsString.filter(tag => tag.trim() !== '');
    }

    return tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }

  // Función para obtener y manejar el post
  loadPost(id: string): void {
    this.isLoading = true;
    this.post = null;

    // Llamada al servicio, tipificando la respuesta como Post
    this.postService.getPostById(id).subscribe({
      next: (data: PostDTO) => {
        this.post = data; // Almacena el objeto Post completo
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error("Error al cargar el post:", e);
        this.isLoading = false;
        this.cdr.detectChanges();
        // Manejo de errores
      }

    });
  }
}
