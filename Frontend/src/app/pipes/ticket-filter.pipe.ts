import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ticketFilter' })
export class TicketFilterPipe implements PipeTransform {
  transform(tickets: any[], estado: string): number {
    if (!tickets) return 0;
    return tickets.filter(t => t.estado === estado).length;
  }
}
