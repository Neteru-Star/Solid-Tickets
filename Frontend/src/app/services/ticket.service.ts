import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access')}`
    });
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets/`, { headers: this.getHeaders() });
  }

  getTicket(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tickets/${id}/`, { headers: this.getHeaders() });
  }

  crearTicket(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tickets/`, data, { headers: this.getHeaders() });
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/tickets/${id}/estado/`, { estado }, { headers: this.getHeaders() });
  }

  asignarAgente(id: number, agente_id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/tickets/${id}/asignar/`, { agente_id }, { headers: this.getHeaders() });
  }

  agregarComentario(id: number, contenido: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tickets/${id}/comentarios/`, { contenido }, { headers: this.getHeaders() });
  }

  getComentarios(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets/${id}/comentarios/lista/`, { headers: this.getHeaders() });
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets/categorias/`, { headers: this.getHeaders() });
  }

  subirEvidencia(id: number, archivo: File, descripcion: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('descripcion', descripcion);
    return this.http.post<any>(
      `${this.apiUrl}/tickets/${id}/evidencias/`,
      formData,
      { headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('access')}` }) }
    );
  }

  getEvidencias(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets/${id}/evidencias/lista/`, { headers: this.getHeaders() });
  }
}