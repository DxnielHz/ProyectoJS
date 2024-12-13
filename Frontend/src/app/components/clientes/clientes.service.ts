import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiUrl = 'http://localhost:4000/servicios/clientes/clientes/';

  constructor(private http: HttpClient) {}

  getAllClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCliente(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  updateCliente(id: string, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, cliente);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
