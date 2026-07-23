import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  private rolSubject: BehaviorSubject<string | null>;
  rol$: Observable<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.rolSubject = new BehaviorSubject<string | null>(localStorage.getItem('rol'));
    this.rol$ = this.rolSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login/`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        const payload = JSON.parse(atob(res.access.split('.')[1]));
        localStorage.setItem('rol', payload.rol || '');
        localStorage.setItem('user_id', payload.user_id);
        this.rolSubject.next(payload.rol);
      })
    );
  }
  
  getUsuarios(): Observable<any[]> {
  return this.http.get<any[]>('http://127.0.0.1:8000/api/usuarios/lista/', {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access')}`
    })
  });
}

  registro(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/registro/`, datos);
  }

  logout(): void {
    localStorage.clear();
    this.rolSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}

