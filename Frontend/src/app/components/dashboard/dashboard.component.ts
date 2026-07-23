import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  rol = localStorage.getItem('rol');

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }
}