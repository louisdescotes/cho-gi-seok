import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const cards = [
  {
    image: "/test.jpg",
    title: "Process Of Love",
    korean: "사랑의 과정",
  },
  {
    image: "/test2.jpg",
    title: "Not Alone",
    korean: "혼자가 아니다",
  },
  {
    image: "/test3.jpg",
    title: "Nostalgia",
    korean: "노스탤지어",
  },
  {
    image: "/test4.jpg",
    title: "Flower Study",
    korean: "꽃 연구",
  },
  {
    image: "/test5.png",
    title: "Love & Hate",
    korean: "사랑과 증오",
  },
  {
    image: "/test6.png",
    title: "These days",
    korean: "요즘에는",
  },
];
export function collectionCanvas(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  //   const controls = new OrbitControls(camera, canvas);
  //   controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const fontLoader = new FontLoader();
  const cardSpacing = 16;

  for (let i = 0; i < cards.length; i++) {
    const geometry = new THREE.PlaneGeometry(13, 14);
    const texture = new THREE.TextureLoader().load(cards[i].image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const card = new THREE.Mesh(geometry, material);

    card.position.x = (i - cards.length / cards.length + 1) * cardSpacing;
    card.position.y = 0;

    scene.add(card);

    camera.position.z = 20;

    fontLoader.load("/font/helvetiker_regular.typeface.json", (font) => {
      const titleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const titleGeometry = new TextGeometry(cards[i].title, {
        font: font,
        size: 1,
        depth: 0,
        bevelOffset: 0,
      });
      const koreanMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const koreanGeometry = new TextGeometry(cards[i].korean, {
        font: font,
        size: 1,
        depth: 0,
        bevelOffset: 0,
      });

      const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
      titleMesh.position.y = -8.5;
      titleMesh.position.x =
        (i - cards.length / cards.length + 1) * cardSpacing - 6.5;
      scene.add(titleMesh);

      const koreanMesh = new THREE.Mesh(koreanGeometry, koreanMaterial);
      koreanMesh.position.x =
        (i - cards.length / cards.length + 1) * cardSpacing - 7.5;
      scene.add(koreanMesh);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }
}
