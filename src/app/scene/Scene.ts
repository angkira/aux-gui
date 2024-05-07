import THREE from 'three';
import {
  CameraConfig,
  DEFAULT_SCENE_CONFIG,
  LightConfig,
  SceneConfig,
} from './DefaultScene.config';

export class Scene {
  private scene: THREE.Scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  constructor(
    private container: HTMLElement,
    private config: SceneConfig = DEFAULT_SCENE_CONFIG,
  ) {}

  init() {
    const light = this.config.light.map((lightConfig) =>
      this.initLight(lightConfig),
    );
    light.forEach((light) => this.scene.add(light));

    const camera = this.initCamera(this.config.camera);
    this.scene.add(camera);

    const controls = this.initControls(this.config.controls, camera);
    this.scene.add(controls);

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );

    this.container.appendChild(this.renderer.domElement);
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

    camera.position.set(0, 0, 5);

    return camera;
  }

  initControls(controlsConfig: any, camera: THREE.Camera) {
    const controls = new controlsConfig.type(camera, this.container);

    controls.enableDamping = controlsConfig.enableDamping;
    controls.dampingFactor = controlsConfig.dampingFactor;
    controls.enableZoom = controlsConfig.enableZoom;

    return controls;
  }
}
