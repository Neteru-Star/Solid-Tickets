import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: any = null;
  comentario = '';
  nuevoEstado = '';
  rol = localStorage.getItem('rol');
  cargando = true;
  mensaje = '';
  error = '';

  // Evidencias
  archivoSeleccionado: File | null = null;
  descripcionEvidencia = '';
  subiendoEvidencia = false;

  estados = ['ABIERTO', 'EN_PROCESO', 'RESUELTO', 'CERRADO'];

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarTicket(Number(id));
  }

  cargarTicket(id: number) {
    this.ticketService.getTicket(id).subscribe({
      next: (data) => { this.ticket = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  cambiarEstado() {
    if (!this.nuevoEstado) return;
    this.ticketService.cambiarEstado(this.ticket.id, this.nuevoEstado).subscribe({
      next: () => {
        // Agregar al historial local
        this.ticket.historial.push({
          estado_anterior: this.ticket.estado,
          estado_nuevo: this.nuevoEstado,
          cambiado_por: { email: localStorage.getItem('email') || 'Tú' },
          fecha_cambio: new Date().toISOString()
        });
        this.ticket.estado = this.nuevoEstado;
        this.mensaje = 'Estado actualizado correctamente';
        setTimeout(() => this.mensaje = '', 3000);
      }
    });
  }

  enviarComentario() {
    if (!this.comentario.trim()) return;
    this.ticketService.agregarComentario(this.ticket.id, this.comentario).subscribe({
      next: (data) => {
        this.ticket.comentarios.push(data);
        this.comentario = '';
        this.mensaje = 'Comentario agregado';
        setTimeout(() => this.mensaje = '', 3000);
      }
    });
  }

  onArchivoSeleccionado(event: any) {
    const file = event.target.files[0];
    if (file) this.archivoSeleccionado = file;
  }

  subirEvidencia() {
    if (!this.archivoSeleccionado) return;
    this.subiendoEvidencia = true;
    this.ticketService.subirEvidencia(
      this.ticket.id,
      this.archivoSeleccionado,
      this.descripcionEvidencia
    ).subscribe({
      next: (data) => {
        if (!this.ticket.evidencias) this.ticket.evidencias = [];
        this.ticket.evidencias.push(data);
        this.archivoSeleccionado = null;
        this.descripcionEvidencia = '';
        this.subiendoEvidencia = false;
        this.mensaje = 'Evidencia subida correctamente';
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: () => {
        this.error = 'Error al subir la evidencia';
        this.subiendoEvidencia = false;
      }
    });
  }

  getIconoArchivo(nombre: string): string {
    if (!nombre) return 'file';
    const ext = nombre.split('.').pop()?.toLowerCase();
    const tipos: any = {
      'pdf': 'pdf',
      'png': 'image', 'jpg': 'image', 'jpeg': 'image', 'gif': 'image', 'webp': 'image', 'svg': 'image',
      'doc': 'doc', 'docx': 'doc',
      'xls': 'sheet', 'xlsx': 'sheet', 'csv': 'sheet',
      'zip': 'zip', 'rar': 'zip', '7z': 'zip',
      'mp4': 'video', 'mov': 'video', 'avi': 'video',
      'mp3': 'audio', 'wav': 'audio'
    };
    return tipos[ext || ''] || 'file';
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
