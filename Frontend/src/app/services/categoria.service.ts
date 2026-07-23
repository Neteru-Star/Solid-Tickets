import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access')}`
    });
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets/categorias/`, { headers: this.headers() });
  }

  crearCategoria(nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tickets/categorias/`, { nombre }, { headers: this.headers() });
  }
}