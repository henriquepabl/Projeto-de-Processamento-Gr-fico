import {
  Color,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  type Object3D,
} from "three";

/** Raio padrão da bola . */
export const BALL_RADIUS = 0.12;

/**
Representa uma bola de sinuca.
 */
export class BilliardBall {
  readonly mesh: Mesh<SphereGeometry, MeshStandardMaterial>;

  constructor(color: Color | number, name: string) {
    const geometry = new SphereGeometry(BALL_RADIUS, 48, 48);
    const material = new MeshStandardMaterial({
        color: typeof color === "number" ? color : color.getHex(),
        metalness: 0.25,
        roughness: 0.35,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.name = name;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }

  setScale(sx: number, sy: number, sz: number): void {
    this.mesh.scale.set(sx, sy, sz);
  }

  get object(): Object3D {
    return this.mesh;
  }
}
