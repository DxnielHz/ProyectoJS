import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'http://localhost:4000/servicios/tiendas/tiendas/';

  constructor(private http: HttpClient) {}

  getAllTiendas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTienda(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  createTienda(tienda: any): Observable<any> {
    return this.http.post(this.apiUrl, tienda);
  }

  updateTienda(id: string, tienda: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, tienda);
  }

  deleteTienda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
