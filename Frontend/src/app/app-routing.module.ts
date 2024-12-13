import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'tiendas', pathMatch: 'full' },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'graficos', component: GraficosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
