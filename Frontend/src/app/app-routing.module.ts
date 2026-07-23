import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { TicketCreateComponent } from './components/tickets/ticket-create/ticket-create.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTicketsComponent } from './components/admin/admin-tickets/admin-tickets.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { AgenteDashboardComponent } from './components/agente/agente-dashboard/agente-dashboard.component';
import { AgenteTicketsComponent } from './components/agente/agente-tickets/agente-tickets.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'tickets', pathMatch: 'full' },
      { path: 'tickets', component: TicketListComponent },
      { path: 'tickets/nuevo', component: TicketCreateComponent },
      { path: 'tickets/:id', component: TicketDetailComponent },
    ]
  },

  {
  path: 'agente', component: AgenteDashboardComponent, canActivate: [authGuard],
  children: [
    { path: '', redirectTo: 'tickets', pathMatch: 'full' },
    { path: 'tickets', component: AgenteTicketsComponent },
    { path: 'tickets/:id', component: TicketDetailComponent },
  ]
},

  
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'tickets', pathMatch: 'full' },
      { path: 'tickets', component: AdminTicketsComponent },
      { path: 'tickets/:id', component: TicketDetailComponent },
      { path: 'usuarios', component: AdminUsuariosComponent },
      { path: 'categorias', component: AdminCategoriasComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}