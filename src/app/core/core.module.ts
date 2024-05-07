import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIService } from './services/api.service';
import { LayoutModule } from './layout/layout.module';
import { BaseComponent } from './base/base.component';
import { SceneModule } from './scene/scene.module';
import { CoreRountingModule } from './core.routes';

@NgModule({
  declarations: [BaseComponent],
  providers: [APIService],
  imports: [CommonModule, CoreRountingModule, LayoutModule, SceneModule],
})
export class CoreModule {}
