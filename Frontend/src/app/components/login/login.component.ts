import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  this.cargando = true;
  this.error = '';
  this.auth.login(this.email, this.password).subscribe({
    next: () => {
      const rol = localStorage.getItem('rol');
      if (rol === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (rol === 'AGENTE') {
        this.router.navigate(['/agente']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
    error: () => {
      this.error = 'Credenciales incorrectas';
      this.cargando = false;
    }
  });
}
}