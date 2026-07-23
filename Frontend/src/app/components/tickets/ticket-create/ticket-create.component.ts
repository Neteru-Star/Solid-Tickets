import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  categorias: any[] = [];
  datos = { titulo: '', descripcion: '', prioridad: 'MEDIA', categoria: null };
  error = '';
  cargando = false;

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit() {
    this.ticketService.getCategorias().subscribe({
      next: (data) => this.categorias = data
    });
  }

  crear() {
    this.cargando = true;
    this.error = '';
    this.ticketService.crearTicket(this.datos).subscribe({
      next: () => this.router.navigate(['/dashboard/tickets']),
      error: () => { this.error = 'Error al crear el ticket'; this.cargando = false; }
    });
  }
}