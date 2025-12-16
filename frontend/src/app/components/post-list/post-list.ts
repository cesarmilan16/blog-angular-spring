import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { debounceTime, Observable, startWith, Subject, switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostDTO } from '../../models/post';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, FormsModule, RouterModule, ConfirmationDialog], // Necesitas importar CommonModule para usar el | async o @for
  templateUrl: './post-list.html',
})
export class Postlist implements OnInit {

  // INYECCIÓN MODERNA
  private service = inject(PostService);
  private cdr = inject(ChangeDetectorRef);

  // NUEVAS PROPIEDADES PARA LA BÚSQUEDA
  public searchTerm: string = ''; // Enlazado con el input HTML
  private searchSubject = new Subject<string>(); // Canal de comunicación

  // DECLARACIÓN DE LA PROPIEDAD
  public postList$!: Observable<PostDTO[]>;

  ngOnInit(): void {
// CONFIGURACIÓN DEL STREAM (FLUJO DE DATOS)
    this.postList$ = this.searchSubject.pipe(
      startWith(''),        // A. Carga inicial (envía cadena vacía)
      debounceTime(300),    // B. Espera 300ms a que dejes de escribir
      switchMap((term) => { // C. Llama al servicio (cancela peticiones anteriores si escribes rápido)
        return this.service.getPosts(term);
      })
    );

    // REFRESCAR LISTA: Cuando se crea/edita un post
    this.service.refresh$.subscribe(() => {
      // Volvemos a emitir el término actual para recargar la lista manteniendo el filtro
      this.searchSubject.next(this.searchTerm);
    });
  }

  // MÉTODO QUE SE LLAMA DESDE EL HTML AL ESCRIBIR
  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  private loadPosts() {
    this.postList$ = this.service.getPosts();
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

  // -------------------------
  //  ELIMINAR
  // -------------------------
  // 🆕 PROPIEDADES PARA EL MODAL
  public isModalVisible: boolean = false;
  public postToDeleteId: number | null = null;
  public confirmationMessage: string = '';

  // -------------------------
  //  1. ABRIR MODAL
  // -------------------------
  promptDelete(id: number): void {
    this.postToDeleteId = id;
    this.confirmationMessage = `¿Estás seguro de que lo quieres eliminar?`;
    this.isModalVisible = true;
  }

  // -------------------------
  //  2. CERRAR MODAL (CANCELAR)
  // -------------------------
  cancelDelete(): void {
    this.isModalVisible = false;
    this.postToDeleteId = null;
  }

  // -------------------------
  //  3. CONFIRMAR Y ELIMINAR
  // -------------------------
  confirmDelete(): void {
    if (this.postToDeleteId === null) return;

    const id = this.postToDeleteId;

    // Cierra el modal primero para que el usuario sepa que está procesando
    this.isModalVisible = false;

    this.service.deletePost(id).subscribe({
      next: () => {
        this.loadPosts(); // recargar lista
        this.cdr.detectChanges();
        this.postToDeleteId = null; // Limpiar el estado
      },
      error: (e) => {
        console.error('Error al eliminar:', e);
        alert('No se ha podido eliminar el post. Revisa la consola.');
        this.postToDeleteId = null;
      }
    });
  }
}
