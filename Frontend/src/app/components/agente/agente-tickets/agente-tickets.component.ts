import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-agente-tickets',
  templateUrl: './agente-tickets.component.html',
  styleUrls: ['./agente-tickets.component.css']
})
export class AgenteTicketsComponent implements OnInit {
  tickets: any[] = [];
  cargando = true;
  filtroEstado = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe({
      next: (data) => { this.tickets = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  get ticketsFiltrados() {
    return this.tickets.filter(t =>
      this.filtroEstado ? t.estado === this.filtroEstado : true
    );
  }

  cambiarEstado(ticket: any, estado: string) {
    this.ticketService.cambiarEstado(ticket.id, estado).subscribe({
      next: () => ticket.estado = estado
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