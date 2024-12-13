import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../productos/producto.service';
import { TiendaService } from '../tiendas/tienda.service';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  tiendas: any[] = [];
  productoForm: FormGroup;
  isEditMode: boolean = false;
  currentProductoId: string | null = null;

  constructor(
    private productoService: ProductoService,
    private tiendaService: TiendaService,
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      cantidad_vendida: [0, [Validators.min(0)]],
      img: ['', [Validators.required]],
      tienda_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
    this.loadTiendas();
  }

  loadProductos(): void {
    this.productoService.getAllProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  loadTiendas(): void {
    this.tiendaService.getAllTiendas().subscribe({
      next: (data) => (this.tiendas = data),
      error: (err) => console.error('Error al cargar tiendas:', err)
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) return;

    const formData = this.productoForm.value;
    if (this.isEditMode && this.currentProductoId) {
      this.productoService.updateProducto(this.currentProductoId, formData).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al actualizar producto:', err)
      });
    } else {
      this.productoService.createProducto(formData).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al crear producto:', err)
      });
    }
    this.resetForm();
  }

  onEdit(producto: any): void {
    console.log('Editar producto:', producto);
    this.isEditMode = true;
    this.currentProductoId = producto._id;
    this.productoForm.patchValue(producto);
  }

  onDelete(id: string): void {
    console.log('Eliminar producto con ID:', id);
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }

  resetForm(): void {
    this.productoForm.reset();
    this.isEditMode = false;
    this.currentProductoId = null;
  }

  refreshData(): void {
    this.loadProductos();
    this.resetForm();
  }
}

