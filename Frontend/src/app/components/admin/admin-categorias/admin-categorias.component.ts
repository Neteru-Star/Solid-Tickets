import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['./admin-categorias.component.css']
})
export class AdminCategoriasComponent implements OnInit {
  categorias: any[] = [];
  nuevaCategoria = '';
  cargando = true;
  mensaje = '';
  error = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => { this.categorias = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  crearCategoria() {
    if (!this.nuevaCategoria.trim()) return;
    this.categoriaService.crearCategoria(this.nuevaCategoria).subscribe({
      next: (data) => {
        this.categorias.push(data);
        this.nuevaCategoria = '';
        this.mensaje = 'Categoría creada correctamente';
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: () => { this.error = 'Error al crear la categoría'; }
    });
  }
}