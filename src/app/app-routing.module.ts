import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guards/session.guard';
import { HomeComponent } from './pages/home/home.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled'
}

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then( module => module.AuthModule)
  },
  {
    path: 'products',
    canLoad: [SessionGuard],
    canActivate:[SessionGuard],
    loadChildren: ()=> import('./products/products.module').then( module => module.ProductsModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
