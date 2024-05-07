import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./scene/scene.module').then((m) => m.SceneModule),
  },
];
