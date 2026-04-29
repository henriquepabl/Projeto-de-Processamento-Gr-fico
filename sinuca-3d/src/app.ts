import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { createTable } from "./table";

/** cena onde tudo aparece na tela */
const scene = new Scene();
scene.background = new Color(0x0a0e14);

/** desenha o 3d no canvas, anti alias e sombra ligados */
const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMapping = ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

/** camera de lado pra ver a mesa num angulo bom */
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5.2, 4.1, 5.2);
camera.lookAt(new Vector3(0, 0.2, 0));

/** se redimensionar a janela a camera e o canvas acompanham */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/** luz suave em todo lado */
const ambient = new AmbientLight(0xffffff, 0.45);
scene.add(ambient);

/** luz principal */
const sun = new DirectionalLight(0xfff5e6, 1.35);
sun.position.set(4, 10, 3);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 40;
sun.shadow.camera.left = -6;
sun.shadow.camera.right = 6;
sun.shadow.camera.top = 6;
sun.shadow.camera.bottom = -6;
scene.add(sun);

createTable(scene);

/** loop c novo frame e desenha td de novo */
function animate(): void {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
