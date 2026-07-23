import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  rol = localStorage.getItem('rol');

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }
}
