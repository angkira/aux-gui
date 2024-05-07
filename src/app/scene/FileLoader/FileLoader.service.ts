import { Injectable } from '@angular/core';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { LoadingManager } from 'three';

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

  async loadObject(path: string) {
    const extention = path.split('.').pop() as MeshFileExtentions;

    if (!extention) {
      throw new UnsupportedFormatError('No extention found');
    }

    try {
      const loader = new LOADERS_MAP[extention](this.loadingManager);

      const mesh = await loader.loadAsync(path);

      return mesh;
    } catch (error) {
      throw new UnsupportedFormatError(`Unsupported format: ${extention}`);
    }
  }
}
