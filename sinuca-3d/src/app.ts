import {
  ACESFilmicToneMapping,
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { createTable } from "./table";
import { PoolCue } from "./cue";
import { BilliardBall, BALL_RADIUS } from "./ball";

/** cena onde tudo aparece na tela */
const scene = new Scene();
scene.background = new Color(0x0a0e14);

/** relógio que fornece o tempo decorrido para animar a cena */
const clock = new Clock();

/** desenha o 3d no canvas, anti alias e sombra ligados */
const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMapping = ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

/** camera de lado pra ver a mesa num angulo bom */
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 6, 6);
camera.lookAt(new Vector3(0, 0, 0));

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

/** mesa de sinuca */
createTable(scene);

/** taco de sinuca */
const cue = new PoolCue();
cue.mesh.position.set(-1.4, 0.35, -1.15);
cue.mesh.scale.setScalar(1.15);
cue.mesh.rotation.set(0, Math.PI * 0.22, 0);

cue.addToScene(scene);
const ballColors = [
  0xffff00, 
  0x0000ff, 0xff0000,
  0x00ff00, 0x000000, 0xffa500,
  0xeeee00, 0x800080, 0x8b0000, 0x00008b,
  0x006400, 0xcc0000, 0xff8c00, 0x4b0082, 0x5d4037
];

const rowSpacing = BALL_RADIUS * 2 * Math.sin(Math.PI / 3); // Altura entre linhas
const startX = 1.5; // Posição onde o triângulo começa
let ballIndex = 0;

for (let i = 0; i < 5; i++) {
  for (let j = 0; j <= i; j++) {
    const ball = new BilliardBall(ballColors[ballIndex]!, `Bola_${ballIndex + 1}`);
    
    // Cálculo do X: centra as bolas da linha atual
    const z = (j - i / 2) * (BALL_RADIUS * 2.05); 
    const x = startX + i * rowSpacing;
    
    ball.setPosition(x, BALL_RADIUS, z);
    scene.add(ball.mesh);
    ballIndex++;
  }
}


/** loop c novo frame e desenha td de novo */
function animate(): void {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  cue.setTime(t);
  cue.update(t);

  renderer.render(scene, camera);
}

animate();
