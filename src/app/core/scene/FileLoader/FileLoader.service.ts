import { Injectable } from '@angular/core';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {
  Color,
  DoubleSide,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

type MeshFileExtentions = 'obj';

const LOADERS_MAP = {
  obj: OBJLoader,
};

export class UnsupportedFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedFormatError';
  }
}

@Injectable({
  providedIn: 'root',
})
export class FileLoaderService {
  loadingManager: LoadingManager = new LoadingManager();

  constructor() {}

  async loadMaterial(path: string) {
    const extention = path.split('.').pop() as MeshFileExtentions;

    if (!extention) {
      throw new UnsupportedFormatError('No extention found');
    }

    try {
      const loader = new MTLLoader(this.loadingManager);

      const material = await loader.loadAsync(path);

      return material;
    } catch (error) {
      throw new UnsupportedFormatError(`Unsupported format: ${extention}`);
    }
  }

  async loadObject(path: string) {
    const extention = path.split('.').pop() as MeshFileExtentions;

    if (!extention) {
      throw new UnsupportedFormatError('No extention found');
    }

    const loader = new LOADERS_MAP[extention](this.loadingManager);

    try {
      try {
        const material = await this.loadMaterial(path.replace('.obj', '.mtl'));

        material.preload();

        material.side = DoubleSide;

        loader.setMaterials(material);

        console.log('Material loaded', material);
      } catch (error) {
        console.warn('No material found');
      }
      const mesh = await loader.loadAsync(path);

      console.log(loader, mesh);

      if (!loader.materials) {
        console.log('No materials found');
        const material = new MeshPhongMaterial({ color: 0xa4cde6 });

        mesh.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = material;
          }
        });
      } else {
        const material = Object.entries(
          loader.materials.materials,
        )[0][1] as MeshPhongMaterial;

        try {
          const texture = await new TextureLoader().loadAsync(
            path.replace('.obj', '.jpg'),
          );

          texture.colorSpace = SRGBColorSpace;

          material.map = texture;
        } catch (error) {
          console.warn('No texture found');
        }

        material.color = new Color(0xffffff);
        material.needsUpdate = true;

        mesh.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = material;
            child.geometry.computeVertexNormals();
          }
        });
      }
      // const mesh = await loader.loadAsync(path);

      // const texture = await new TextureLoader().loadAsync(
      //   path.replace('.obj', '.jpg'),
      // );

      // texture.colorSpace = SRGBColorSpace;

      // const material = new MeshBasicMaterial({ map: texture, color: 0x607b8d });

      // mesh.traverse((child) => {
      //   if (child instanceof Mesh) {
      //     child.material = material;
      //   }
      // });

      return mesh;
    } catch (error) {
      throw new UnsupportedFormatError(`Unsupported format: ${extention}`);
    }
  }
}
