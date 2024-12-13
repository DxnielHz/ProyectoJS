import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  clienteForm: FormGroup;
  isEditMode: boolean = false;
  currentClienteId: string | null = null;

  constructor(private clientesService: ClientesService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clientesService.getAllClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Error al cargar clientes:', err),
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) return;

    const formData = this.clienteForm.value;
    if (this.isEditMode && this.currentClienteId) {
      this.clientesService.updateCliente(this.currentClienteId, formData).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al actualizar cliente:', err),
      });
    } else {
      this.clientesService.createCliente(formData).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error('Error al crear cliente:', err),
      });
    }
    this.resetForm();
  }

  onEdit(cliente: any): void {
    this.isEditMode = true;
    this.currentClienteId = cliente._id;
    this.clienteForm.patchValue(cliente);
  }

  onDelete(id: string): void {
    this.clientesService.deleteCliente(id).subscribe({
      next: () => this.refreshData(),
      error: (err) => console.error('Error al eliminar cliente:', err),
    });
  }

  resetForm(): void {
    this.clienteForm.reset();
    this.isEditMode = false;
    this.currentClienteId = null;
  }

  refreshData(): void {
    this.loadClientes();
    this.resetForm();
  }
}

