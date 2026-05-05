import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  type Scene,
} from "three";

/** dimensão da mesa */
export const TABLE_SIZE = { width: 4, thickness: 0.2, depth: 2 } as const;

/** cria a mesa e se n carregou a textura usa um material de fallback */
export function createTable(scene: Scene): Mesh<BoxGeometry, MeshStandardMaterial> {
  const geometry = new BoxGeometry(
    TABLE_SIZE.width,
    TABLE_SIZE.thickness,
    TABLE_SIZE.depth,
  );

  const fallbackMaterial = new MeshStandardMaterial({
    color: 0x1a6b2e,
    roughness: 0.85,
    metalness: 0.05,
  });

  const mesh = new Mesh(geometry, fallbackMaterial);
  mesh.name = "MesaSinuca";
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.position.y = -TABLE_SIZE.thickness / 2;

  const loader = new TextureLoader();
  const url = new URL("../assets/mesa.png", import.meta.url).href;

  loader.load(
    url,
    (texture: Texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(1, 1);
      const felt = new MeshStandardMaterial({
        map: texture,
        roughness: 0.9,
        metalness: 0,
      });
      mesh.material = felt;
      mesh.material.needsUpdate = true;
    },
    undefined,
    () => {
      console.warn(
        "Não consegui carregar a textura da mesa",
      );
    },
  );

  scene.add(mesh);
  return mesh;
}
