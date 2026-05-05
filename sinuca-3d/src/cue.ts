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
    const geometry = new CylinderGeometry(0.04, 0.055, 2.2, 32, 8, false);
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

  update(t: number): void {
    const swing = Math.sin(t * 1.6);
    const push = Math.sin(t * 1.1);

    this.mesh.rotation.z = swing * 0.12;
    this.mesh.position.z = -1.15 + push * 0.08;
  }

  addToScene(scene: Scene): void {
    scene.add(this.mesh);
  }
}