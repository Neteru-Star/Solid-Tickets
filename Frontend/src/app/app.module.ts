import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { TicketCreateComponent } from './components/tickets/ticket-create/ticket-create.component';
import { TicketFilterPipe } from './pipes/ticket-filter.pipe';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTicketsComponent } from './components/admin/admin-tickets/admin-tickets.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { AgenteDashboardComponent } from './components/agente/agente-dashboard/agente-dashboard.component';
import { AgenteTicketsComponent } from './components/agente/agente-tickets/agente-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    TicketListComponent,
    TicketDetailComponent,
    TicketCreateComponent,
    TicketFilterPipe,
    AdminDashboardComponent,
    AdminTicketsComponent,
    AdminUsuariosComponent,
    AdminCategoriasComponent,
    AgenteDashboardComponent,
    AgenteTicketsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}