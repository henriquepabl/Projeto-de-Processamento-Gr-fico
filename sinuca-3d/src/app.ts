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

/** camera 2: visão de cima (tática) */
const topCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
topCamera.position.set(0, 8, 0); // Posicionada no alto, bem no centro
topCamera.lookAt(new Vector3(0, 0, 0)); // Olhando direto para o centro da mesa

/** Variável que diz qual câmera está passando na tela agora */
let activeCamera = camera; // Começa na câmera 1

/** se redimensionar a janela as câmeras e o canvas acompanham */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  topCamera.aspect = window.innerWidth / window.innerHeight;
  topCamera.updateProjectionMatrix();
  
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

/* BOLA BRANCA */
const cueBall = new BilliardBall(0xffffff, "Bola_Branca");

// Posiciona a bola no lado oposto ao triângulo
cueBall.setPosition(-1.5, BALL_RADIUS, 0);

// Adiciona a bola branca na cena para ela ser renderizada
scene.add(cueBall.mesh);

// Variável para controlar se a bola já levou a tacada
let isMoving = false;

// Escuta o teclado para acionar o movimento e trocar a câmera
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    isMoving = true;
  }
  // Se apertar a tecla C, alterna entre a camera normal e a topCamera
  if (event.code === "KeyC") {
    activeCamera = activeCamera === camera ? topCamera : camera;
  }
});

/** loop c novo frame e desenha td de novo */
function animate(): void {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  cue.setTime(t);
  cue.update(t);

  // Se a tacada foi dada
  if (isMoving) {
    if (cue.mesh.position.x < -1.6) {
      cue.mesh.position.x += 0.10; 
    }

    if (cueBall.mesh.position.x < 1.26) {
      cueBall.mesh.position.x += 0.04; 
      cueBall.mesh.rotation.z -= 0.15;

      // 3. BÔNUS: A câmera acompanha a bola (apenas se for a câmera 1)
      if (activeCamera === camera) {
        camera.position.x = cueBall.mesh.position.x + 3; 
        camera.lookAt(cueBall.mesh.position); 
      }
    } else {
      isMoving = false; 
    }
  }

  // Desenha a cena usando a câmera que estiver ativa no momento!
  renderer.render(scene, activeCamera);
}

animate();
