import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './scene.component';

const routes: Routes = [
  {
    path: '',
    component: SceneComponent,
  },
];

export const SceneRoutes = RouterModule.forChild(routes);
