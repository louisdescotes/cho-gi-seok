import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const cards = [
  {
    image: "/test.jpg",
    title: "Process Of Love",
    korean: "사랑의과정",
    slug: "/collection/ProcessOfLove",
  },
  {
    image: "/test2.jpg",
    title: "Not Alone",
    korean: "혼자가아니다",
    slug: "/collection/NotAlone",
  },
  {
    image: "/test3.jpg",
    title: "Nostalgia",
    korean: "노스탤지어",
    slug: "/collection/Nostalgia",
  },
  {
    image: "/test4.jpg",
    title: "Flower Study",
    korean: "꽃연구",
    slug: "/collection/FlowerStudy",
  },
  {
    image: "/test5.png",
    title: "Love & Hate",
    korean: "사랑과증오",
    slug: "/collection/Love&Hate",
  },
  {
    image: "/test6.png",
    title: "These days",
    korean: "요즘에는",
    slug: "/collection/Thesedays",
  },
];

export function collectionCanvas(canvas, onUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const interactives = [];
  let hovered = null;

  window.addEventListener("pointermove", onPointerMove, false);
  function onPointerMove(e) {
    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;
  }

  window.addEventListener("pointerdown", onPointerDown, false);
  function onPointerDown(e) {
    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactives, true);
    if (hits.length) {
      let o = hits[0].object;
      while (o.parent && !o.userData.slug) o = o.parent;
      if (o.userData.slug) window.location.href = o.userData.slug;
    }
  }

  const fontLoader = new FontLoader();
  const cardSpacing = 16;

  for (let i = 0; i < cards.length; i++) {
    const cardGroup = new THREE.Group();

    cardGroup.userData.slug = cards[i].slug;

    const tex = new THREE.TextureLoader().load(cards[i].image);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(13, 16),
      new THREE.MeshBasicMaterial({ map: tex }),
    );
    plane.position.y = 1;
    cardGroup.add(plane);

    const geometry = new THREE.PlaneGeometry(13, 16);
    const texture = new THREE.TextureLoader().load(cards[i].image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const card = new THREE.Mesh(geometry, material);
    card.position.set(0, 1, 0);
    cardGroup.add(card);

    cardGroup.position.x = (i - cards.length / cards.length + 1) * cardSpacing;
    scene.add(cardGroup);

    interactives.push(cardGroup);

    fontLoader.load("/font/korean.json", (font) => {
      const titleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const titleGeo = new TextGeometry(cards[i].title, {
        font,
        size: 0.4,
        depth: 0,
      });
      const titleMesh = new THREE.Mesh(titleGeo, titleMat);
      titleMesh.position.set(-6.5, -7.8, 0);
      cardGroup.add(titleMesh);

      const koreanMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const group = new THREE.Group();
      const size = 0.8;
      const depth = 0;
      const spacing = 1.5;
      let y = 0;
      for (const ch of [...cards[i].korean]) {
        const g = new TextGeometry(ch, { font, size, depth });
        g.computeBoundingBox();
        const h = g.boundingBox.max.y - g.boundingBox.min.y;
        const m = new THREE.Mesh(g, koreanMat);
        m.position.y = y;
        group.add(m);
        y -= h * spacing;
      }
      group.position.set(
        -7,
        new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3()).y /
          2,
        0,
      );
      cardGroup.add(group);
    });
  }

  camera.position.z = 20;

  function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactives, true);

    if (hits.length > 0) {
      let target = hits[0].object;

      while (target.parent && !target.userData.slug) {
        target = target.parent;
      }

      if (hovered !== target) {
        hovered = target;
        document.body.style.cursor = "pointer";
      }
    } else {
      hovered = null;
      document.body.style.cursor = "default";
    }

    renderer.render(scene, camera);
  }
  animate();

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  if (onUpdate) onUpdate({ moveCamera: (x) => (camera.position.x = x) });
}
