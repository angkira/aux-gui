import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Scene } from './Scene';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements OnInit, AfterViewInit {
  private scene!: Scene;

  @ViewChild('#scene-container', { static: true })
  sceneContainer!: ElementRef;

  constructor() {
    this.scene = new Scene(this.sceneContainer.nativeElement);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scene.init();
  }
}
