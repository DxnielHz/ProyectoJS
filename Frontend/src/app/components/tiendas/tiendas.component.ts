import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from '../tiendas/tienda.service';

@Component({
  selector: 'app-tiendas',
  standalone: false,
  
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css'
})
export class TiendasComponent {
  tiendas: any[] = [];
  tiendaForm: FormGroup;
  isEditMode: boolean = false;
  currentTiendaId: string | null = null;

  constructor(private tiendaService: TiendaService, private fb: FormBuilder) {
    this.tiendaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      ciudad: ['', [Validators.required, Validators.maxLength(50)]],
      contacto: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    this.loadTiendas();
  }

  loadTiendas(): void {
    this.tiendaService.getAllTiendas().subscribe({
      next: (data) => this.tiendas = data,
      error: (err) => console.error('Error al cargar tiendas:', err)
    });
  }

  onSubmit(): void {
    if (this.tiendaForm.invalid) return;

    const formData = this.tiendaForm.value;
    if (this.isEditMode && this.currentTiendaId) {
      this.tiendaService.updateTienda(this.currentTiendaId, formData).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al actualizar tienda:', err)
      });
    } else {
      this.tiendaService.createTienda(formData).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al crear tienda:', err)
      });
    }
    this.resetForm();
  }

  onEdit(tienda: any): void {
    this.isEditMode = true;
    this.currentTiendaId = tienda._id;
    this.tiendaForm.patchValue(tienda);
  }

  onDelete(id: string): void {
    this.tiendaService.deleteTienda(id).subscribe({
      next: () => this.refreshData(),
      error: (err) => console.error('Error al eliminar tienda:', err)
    });
  }

  resetForm(): void {
    this.tiendaForm.reset();
    this.isEditMode = false;
    this.currentTiendaId = null;
  }

  refreshData(): void {
    this.loadTiendas();
    this.resetForm();
  }
}
