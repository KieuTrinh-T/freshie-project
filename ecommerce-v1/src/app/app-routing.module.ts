import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule)
  },
  {
    path: "admin",
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: "lib",
    loadChildren: () => import('./pages/libraries/libraries.module').then((m) => m.LibrariesModule),
  },
  {
    path: "**",
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
