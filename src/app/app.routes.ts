import { Routes } from '@angular/router';
import { BaseComponent } from './core/base/base.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
];
