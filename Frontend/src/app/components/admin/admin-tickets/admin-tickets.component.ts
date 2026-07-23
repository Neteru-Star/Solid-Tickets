import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.css']
})
export class AdminTicketsComponent implements OnInit {
  tickets: any[] = [];
  usuarios: any[] = [];
  cargando = true;
  filtroEstado = '';
  filtroPrioridad = '';
  busqueda = '';

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarTickets();
    this.authService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data.filter((u: any) => u.rol === 'AGENTE')
    });
  }

  cargarTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => { this.tickets = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  get ticketsFiltrados() {
    const term = this.busqueda.trim().toLowerCase();
    return this.tickets.filter(t => {
      const matchEstado    = this.filtroEstado    ? t.estado === this.filtroEstado : true;
      const matchPrioridad = this.filtroPrioridad ? t.prioridad === this.filtroPrioridad : true;
      const matchBusqueda  = !term ? true : (
        (t.titulo || '').toLowerCase().includes(term) ||
        (t.solicitante?.email || '').toLowerCase().includes(term) ||
        String(t.id || '').includes(term)
      );
      return matchEstado && matchPrioridad && matchBusqueda;
    });
  }

  /** Percent of tickets with this estado (for stat bar fill) */
  getPercent(estado: string): number {
    if (!this.tickets.length) return 0;
    const count = this.tickets.filter(t => t.estado === estado).length;
    return Math.round((count / this.tickets.length) * 100);
  }

  cambiarEstado(ticket: any, estado: string) {
    this.ticketService.cambiarEstado(ticket.id, estado).subscribe({
      next: () => ticket.estado = estado
    });
  }

  asignarAgente(ticket: any, agenteId: string) {
    if (!agenteId) return;
    this.ticketService.asignarAgente(ticket.id, Number(agenteId)).subscribe({
      next: () => {
        const agente = this.usuarios.find(u => u.id === Number(agenteId));
        ticket.agente_asignado = agente;
      }
    });
  }

  getBadgeClass(estado: string): string {
    const clases: any = {
      'ABIERTO': 'badge-abierto',
      'EN_PROCESO': 'badge-proceso',
      'RESUELTO': 'badge-resuelto',
      'CERRADO': 'badge-cerrado'
    };
    return clases[estado] || '';
  }

  getPrioridadClass(prioridad: string): string {
    const clases: any = {
      'BAJA': 'prioridad-baja',
      'MEDIA': 'prioridad-media',
      'ALTA': 'prioridad-alta',
      'CRITICA': 'prioridad-critica'
    };
    return clases[prioridad] || '';
  }
}
