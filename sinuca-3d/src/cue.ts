import {
  CylinderGeometry,
  DoubleSide,
  Mesh,
  ShaderMaterial,
  type Scene,
} from "three";

import vertexShader from "./shaders/poolCue.vert.glsl";
import fragmentShader from "./shaders/poolCue.frag.glsl";

export class PoolCue {
  readonly mesh: Mesh<CylinderGeometry, ShaderMaterial>;

  constructor() {
    const geometry = new CylinderGeometry( 0.012, 0.045, 3.4, 64, 16, false );
    geometry.rotateZ(Math.PI / 2);

    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },

        uWaveFrequency: { value: 20.0 },
        uWaveSpeed: { value: 2.0 },
        uPulseSpeed: { value: 3.0 },
      },
      vertexShader,
      fragmentShader,
      side: DoubleSide,
    });

    this.mesh = new Mesh(geometry, material);
    this.mesh.name = "TacoSinuca";

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  setTime(t: number): void {
    const uniforms = this.mesh.material.uniforms;
    if (uniforms.uTime) {
      uniforms.uTime.value = t;
    }
  }

  addToScene(scene: Scene): void {
    scene.add(this.mesh);
  }
}