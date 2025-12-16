import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostDTO } from '../../models/post';

@Component({
  selector: 'app-post-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-edit.html',
})
export class PostEdit {
  private route = inject(ActivatedRoute);
    private router = inject(Router);
    private postService = inject(PostService);
    private cdr = inject(ChangeDetectorRef);

    postId: string | null = null;
    postData: PostDTO | null = null; // Usaremos esto para cargar y enviar datos
    
    // Variables de estado del formulario
    isLoading: boolean = true;
    successMessage: string | null = null;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.postId = params.get('id');
            if (this.postId) {
                this.loadPostForEditing(this.postId);
            } else {
                // Si no hay ID, redirigir al inicio o mostrar error
                this.router.navigate(['/']); 
            }
        });
    }

    // 1. Cargar el post existente en el formulario
    loadPostForEditing(id: string): void {
        this.isLoading = true;
        this.postService.getPostById(id).subscribe({
            next: (data: PostDTO) => {
                this.postData = data; // Carga todos los campos (title, content, etc.)
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (e) => {
                console.error("Error al cargar el post para edición:", e);
                this.isLoading = false;
                // Redirigir si no se encuentra el post
                this.router.navigate(['/']); 
                this.cdr.detectChanges();
            }
        });
    }

    // 2. Enviar los cambios del formulario
    updatePost(): void {
        if (!this.postData || !this.postId) return;

        this.isLoading = true;
        this.successMessage = null;

        const idNumber = parseInt(this.postId, 10); 
        
        // Llamar al servicio de actualización
        this.postService.updatePost(idNumber, this.postData).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.successMessage = `Post "${response.title}" actualizado con éxito.`;
                this.cdr.detectChanges();
                
                // Redirigir al detalle del post después de 1 segundo
                setTimeout(() => {
                    this.router.navigate(['/post', this.postId]);
                }, 1000);
            },
            error: (e) => {
                this.isLoading = false;
                this.successMessage = 'Error al actualizar el post.';
                console.error('API Error:', e);
                this.cdr.detectChanges();
            }
        });
    }
}
