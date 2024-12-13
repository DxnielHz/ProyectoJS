import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:4000/servicios/productos/productos/';

  constructor(private http: HttpClient) {}

  getAllProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  updateProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
