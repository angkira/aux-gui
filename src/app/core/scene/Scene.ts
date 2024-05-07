import * as THREE from 'three';
import {
  CameraConfig,
  DEFAULT_SCENE_CONFIG,
  LightConfig,
  SceneConfig,
  SceneEnvironmentConfig,
} from './DefaultScene.config';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Scene {
  private scene: THREE.Scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  constructor(
    private container: HTMLElement,
    private config: SceneEnvironmentConfig = DEFAULT_SCENE_CONFIG,
  ) {}

  configurateScene(config: SceneConfig) {
    this.scene.background = config.background;
  }

  init() {
    this.configurateScene(this.config.scene);

    const light = this.config.light.map((lightConfig) =>
      this.initLight(lightConfig),
    );
    light.forEach((light) => this.scene.add(light));

    const camera = this.initCamera(this.config.camera);
    this.scene.add(camera);

    const controls = this.initControls(this.config.controls, camera);
    controls.update();

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );

    this.container.appendChild(this.renderer.domElement);

    this.initAnimation(this.renderer, this.scene, camera, controls);
  }

  initLight(lightConfig: LightConfig) {
    const light = new lightConfig.type(
      lightConfig.color,
      lightConfig.intensity,
    );

    return light;
  }

  initCamera(cameraConfig: CameraConfig) {
    const { fov, near, far } = cameraConfig;
    const aspect = this.container.clientWidth / this.container.clientHeight;

    const camera = new cameraConfig.type(fov, aspect, near, far);

    camera.position.set(500, 300, 100);

    return camera;
  }

  initControls(controlsConfig: any, camera: THREE.Camera) {
    const controls = new controlsConfig.type(camera, this.container);

    controls.enableDamping = controlsConfig.enableDamping;
    controls.dampingFactor = controlsConfig.dampingFactor;
    controls.enableZoom = controlsConfig.enableZoom;

    return controls;
  }

  initAnimation(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    controls: OrbitControls,
  ) {
    const animate = () => {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    };

    animate();
  }

  addObject(object: THREE.Object3D) {
    this.scene.add(object);
  }
}






