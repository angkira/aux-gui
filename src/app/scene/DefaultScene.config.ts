import {
  AmbientLight,
  Camera,
  Light,
  PerspectiveCamera,
  SpotLight,
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
  camera: CameraConfig;
  light: LightConfig[];
  controls: ControlsConfig[];
};

export const DEFAULT_SCENE_CONFIG: SceneConfig = {
  camera: {
    type: PerspectiveCamera,
    fov: 75,
    near: 0.1,
    far: 1000,
  },
  light: [
    {
      type: AmbientLight,
      color: 0xffffff,
      intensity: 0.5,
    },
    {
      type: SpotLight,
      color: 0xffffff,
      intensity: 0.5,
      distance: 100,
      angle: Math.PI / 4,
      penumbra: 0.05,
      decay: 2,
    },
  ],
  controls: [
    {
      type: OrbitControls,
      enableDamping: true,
      dampingFactor: 0.25,
      enableZoom: true,
    },
  ],
};
