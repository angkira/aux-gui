import {
  AmbientLight,
  Camera,
  Color,
  CubeTexture,
  CubeTextureLoader,
  Light,
  PerspectiveCamera,
  PointLight,
  SpotLight,
  Texture,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type Constructor<T> = new (...args: any[]) => T;

export type CameraConfig = {
  type: Constructor<Camera>;
  fov: number;
  near: number;
  far: number;
};

export type LightConfig = {
  type: Constructor<Light<any>>;
  color: number;
  intensity: number;
  distance?: number;
  angle?: number;
  penumbra?: number;
  decay?: number;
};

export type ControlsConfig = {
  type: Constructor<OrbitControls>;
  enableDamping: boolean;
  dampingFactor: number;
  enableZoom: boolean;
};

export type SceneConfig = {
  background: Color | Texture | CubeTexture | null;
};

export type SceneEnvironmentConfig = {
  camera: CameraConfig;
  light: LightConfig[];
  controls: ControlsConfig;
  scene: SceneConfig;
};

const SCENE_BACKGROUND = new CubeTextureLoader().load([
  'assets/scene/wall.png', // px.png',
  'assets/scene/wall.png', // nx.png',
  'assets/scene/wall.png', // py.png',
  'assets/scene/floor.png', // pz.png',
  'assets/scene/wall.png', // ny.png',
  'assets/scene/wall.png', // nz.png',
]);

export const DEFAULT_SCENE_CONFIG: SceneEnvironmentConfig = {
  scene: {
    background: SCENE_BACKGROUND, // new Color(0xa4cde6),
  },
  camera: {
    type: PerspectiveCamera,
    fov: 75,
    near: 0.1,
    far: 3000,
  },
  light: [
    {
      type: AmbientLight,
      color: 0xffffff,
      intensity: 1,
    },
    {
      type: PointLight,
      color: 0xffffff,
      intensity: 1,
      distance: 100,
      angle: Math.PI / 4,
      penumbra: 0.05,
      decay: 2,
    },
  ],
  controls: {
    type: OrbitControls,
    enableDamping: true,
    dampingFactor: 0.25,
    enableZoom: true,
  },
};
