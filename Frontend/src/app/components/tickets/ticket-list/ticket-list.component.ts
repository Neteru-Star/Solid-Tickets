import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  cargando = true;

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe({
      next: (data) => { this.tickets = data; this.cargando = false; },
      error: () => { this.cargando = false; }
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

  getPercent(estado: string): number {
    if (!this.tickets.length) return 0;
    const count = this.tickets.filter(t => t.estado === estado).length;
    return Math.round((count / this.tickets.length) * 100);
  }
}
