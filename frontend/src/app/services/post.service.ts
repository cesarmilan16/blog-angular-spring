import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PostDTO } from '../models/post';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private apiUrl = `${environment.apiUrl}/api/posts`;

  private refreshNeeded$ = new Subject<void>();
  get refresh$() { return this.refreshNeeded$.asObservable(); }

  constructor(private http: HttpClient) { }

  getPosts(term?: string): Observable<PostDTO[]> {
    let params = new HttpParams(); // Inicializar parámetros

    // 3. CONSTRUIR los parámetros
    if (term && term.trim() !== '') {
      // Si hay un término, añade '?term=valor' a la petición
      params = params.set('term', term.trim());
    }

    // Pasar el objeto params en la petición GET
    return this.http.get<PostDTO[]>(this.apiUrl, { params: params });
  }

  getPostById(id: string) {
    return this.http.get<PostDTO>(`${this.apiUrl}/${id}`);
  }

  createPost(post: PostDTO): Observable<PostDTO> {
    return this.http.post<PostDTO>(this.apiUrl, post).pipe(
      // Notificar que se necesita refrescar
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  updatePost(id: number, post: PostDTO): Observable<PostDTO> {
    return this.http.put<PostDTO>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
