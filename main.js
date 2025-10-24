const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202030);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 6, 10);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  roughness: 0.8,
  metalness: 0.1
});
const wallMaterial = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  shininess: 60
});
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x88aaff,
  transparent: true,
  opacity: 0.4,
  roughness: 0.1,
  metalness: 0.3,
  reflectivity: 0.9
});

const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
backWall.position.z = -10;
backWall.position.y = 5;
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
leftWall.position.x = -10;
leftWall.position.y = 5;
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const glassTable = new THREE.Mesh(
  new THREE.BoxGeometry(4, 0.2, 2),
  glassMaterial
);
glassTable.position.y = 1.1;
glassTable.castShadow = true;
scene.add(glassTable);

for (let x of [-1.8, 1.8]) {
  for (let z of [-0.8, 0.8]) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1, 16),
      floorMaterial
    );
    leg.position.set(x, 0.5, z);
    scene.add(leg);
  }
}

const chairSeat = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.2, 1),
  new THREE.MeshStandardMaterial({ color: 0x4444ff })
);
chairSeat.position.set(0, 0.6, 2);
chairSeat.castShadow = true;
scene.add(chairSeat);

const chairBack = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x3333aa })
);
chairBack.position.set(0, 1.1, 2.45);
scene.add(chairBack);

for (let side of [-0.5, 0.5]) {
  const armrest = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.4, 1),
    new THREE.MeshStandardMaterial({ color: 0x333399 })
  );
  armrest.position.set(side, 0.8, 2);
  scene.add(armrest);
}

const lampBase = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16),
  floorMaterial
);
lampBase.position.set(-3, 0.05, -3);
scene.add(lampBase);

const lampBody = new THREE.Mesh(
  new THREE.CylinderGeometry(0.05, 0.05, 3, 16),
  wallMaterial
);
lampBody.position.set(-3, 1.6, -3);
scene.add(lampBody);

const lampHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 32, 32),
  new THREE.MeshStandardMaterial({ emissive: 0xffcc88, emissiveIntensity: 1 })
);
lampHead.position.set(-3, 3, -3);
scene.add(lampHead);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffeecc, 1.2, 20);
pointLight.position.set(-3, 3, -3);
pointLight.castShadow = true;
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(8, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
