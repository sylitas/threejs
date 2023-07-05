import * as Three from 'three';

const container = document.querySelector('.three');

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new Three.WebGL1Renderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

const getMesh = (type) => {
  let geometry;
  switch (type) {
    case 'circle':
      geometry = new Three.DodecahedronGeometry(2, 6);
      break;
    case 'square':
      geometry = new Three.PlaneGeometry(3.5, 3.5);
      break;
  }

  const material = new Three.MeshBasicMaterial({
    color: '#00FF00',
    wireframe: true,
  });
  return { geometry, material };
};
const type = 'circle';
const { geometry, material } = getMesh(type);
const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 5;

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeigh;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const count = geometry.attributes.position.count;
const clock = new Three.Clock();

/**
 * Execute animate
 */
const animate = () => {
  if (type === 'square') {
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const x = geometry.attributes.position.getX(i);
      const y = geometry.attributes.position.getY(i);

      geometry.attributes.position.setZ(i, -y * time * 2);
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
    }
  } else {
    // mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
