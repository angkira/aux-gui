import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Scene } from './Scene';
import { FileLoaderService } from './FileLoader/FileLoader.service';
import { Group, Object3DEventMap } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements OnInit, AfterViewInit {
  private scene!: Scene;

  @ViewChild('scene', { static: true })
  sceneContainer!: ElementRef;

  constructor(private fileLoader: FileLoaderService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scene = new Scene(this.sceneContainer.nativeElement);
    this.scene.init();

    this.loadRobot();
    this.loadDesk();
  }

  async loadRobot(): Promise<void> {
    const robot = await this.loadObject('assets/mesh/aux.obj');

    robot.position.set(0, -800, 0);
    robot.rotateX(-0.5 * Math.PI);

    this.scene.addObject(robot);
  }

  async loadDesk(): Promise<void> {
    const desk = await this.loadObject('assets/desk/desk.obj');

    desk.position.set(0, -1000, 0);
    desk.scale.set(5, 5, 5);

    this.scene.addObject(desk);
  }

  async loadObject(path: string): Promise<Group<Object3DEventMap>> {
    const object = await this.fileLoader.loadObject(path);

    return object;
  }
}









