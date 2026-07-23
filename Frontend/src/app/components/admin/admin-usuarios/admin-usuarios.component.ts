import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  cargando = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsuarios().subscribe({
      next: (data) => { this.usuarios = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  getRolClass(rol: string): string {
    const clases: any = {
      'ADMIN': 'rol-admin',
      'AGENTE': 'rol-agente',
      'SOLICITANTE': 'rol-solicitante'
    };
    return clases[rol] || '';
  }

  getRolAvatarClass(rol: string): string {
    const clases: any = {
      'ADMIN': 'avatar-admin',
      'AGENTE': 'avatar-agente',
      'SOLICITANTE': 'avatar-solicitante'
    };
    return clases[rol] || '';
  }
}
