import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-agente-dashboard',
  templateUrl: './agente-dashboard.component.html',
  styleUrls: ['./agente-dashboard.component.css']
})
export class AgenteDashboardComponent {
  rol = localStorage.getItem('rol');

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }
}