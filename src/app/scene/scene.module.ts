import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene.component';
import { FileLoaderService } from './FileLoader/FileLoader.service';

@NgModule({
  imports: [CommonModule],
  providers: [FileLoaderService],
  declarations: [SceneComponent],
})
export class SceneModule {}
