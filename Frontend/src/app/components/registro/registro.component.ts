import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  datos = { username: '', email: '', password: '', rol: 'SOLICITANTE' };
  error = '';
  exito = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router) {}

  registro() {
    this.cargando = true;
    this.error = '';
    this.auth.registro(this.datos).subscribe({
      next: () => {
        this.exito = '¡Cuenta creada! Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.error = 'Error al registrar. Verifica los datos.';
        this.cargando = false;
      }
    });
  }
}