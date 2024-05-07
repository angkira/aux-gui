import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
  },
];

export const CoreRountingModule = RouterModule.forChild(routes);
