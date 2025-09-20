const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfbeee0);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 10, 20);
camera.lookAt(0, 4, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 20, 10);
pointLight.castShadow = true;
scene.add(pointLight);

const gridHelper = new THREE.GridHelper(40, 40, 0xcccccc, 0xcccccc);
scene.add(gridHelper);

const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xf5deb3 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xfdfdfd, side: THREE.DoubleSide });
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), wallMaterial);
backWall.position.set(0, 7.5, -15);
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-15, 7.5, 0);
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), wallMaterial);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(15, 7.5, 0);
scene.add(rightWall);

const couchMaterial = new THREE.MeshPhongMaterial({ color: 0x4c708d });
const cushionGeom = new THREE.BoxGeometry(3, 1.2, 2);
for (let i = -1; i <= 1; i++) {
  const cushion = new THREE.Mesh(cushionGeom, couchMaterial);
  cushion.position.set(i * 3.1, 1, -10);
  cushion.castShadow = true;
  scene.add(cushion);
}

const backrestGeom = new THREE.BoxGeometry(9.5, 2, 0.5);
const backrest = new THREE.Mesh(backrestGeom, couchMaterial);
backrest.position.set(0, 2.5, -11.2);
scene.add(backrest);

const armGeom = new THREE.BoxGeometry(0.8, 2, 2);
const leftArm = new THREE.Mesh(armGeom, couchMaterial);
leftArm.position.set(-5, 1.5, -10);
scene.add(leftArm);

const rightArm = leftArm.clone();
rightArm.position.set(5, 1.5, -10);
scene.add(rightArm);

function makePillow(x, y, z) {
  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.4, 0.8),
    new THREE.MeshPhongMaterial({ color: 0xf0f8ff })
  );
  pillow.position.set(x, y, z);
  scene.add(pillow);
}
makePillow(-3, 2.2, -10);
makePillow(3, 2.2, -10);
makePillow(0, 0.5, -7); 

const rug = new THREE.Mesh(
  new THREE.CircleGeometry(5, 32),
  new THREE.MeshPhongMaterial({ color: 0xf7d6e0 })
);
rug.rotation.x = -Math.PI / 2;
rug.position.set(0, 0.01, -5);
scene.add(rug);

const tableMaterial = new THREE.MeshPhongMaterial({ color: 0xa0522d });
const coffeeTable = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, 4), tableMaterial);
coffeeTable.position.set(0, 1, -5);
scene.add(coffeeTable);

const legGeom = new THREE.BoxGeometry(0.3, 1, 0.3);
for (let i = -1; i <= 1; i += 2) {
  for (let j = -1; j <= 1; j += 2) {
    const leg = new THREE.Mesh(legGeom, tableMaterial);
    leg.position.set(i * 3.5, 0.5, j * 1.5 - 5);
    scene.add(leg);
  }
}

const bookColors = [0xff0000, 0x0000ff, 0x228b22];
for (let i = 0; i < 3; i++) {
  const book = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.2, 1),
    new THREE.MeshPhongMaterial({ color: bookColors[i] })
  );
  book.position.set(-2 + i * 2, 1.3, -5);
  scene.add(book);
}

const paper = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.5),
  new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
);
paper.rotation.x = -Math.PI / 2;
paper.position.set(2, 1.01, -5);
scene.add(paper);

const desk = new THREE.Mesh(new THREE.BoxGeometry(6, 0.4, 3), new THREE.MeshPhongMaterial({ color: 0xcd853f }));
desk.position.set(-10, 3, -5);
scene.add(desk);

const deskLegGeom = new THREE.BoxGeometry(0.3, 3, 0.3);
for (let i = -1; i <= 1; i += 2) {
  for (let j = -1; j <= 1; j += 2) {
    const leg = new THREE.Mesh(deskLegGeom, desk.material);
    leg.position.set(-10 + i * 2.5, 1.5, -5 + j * 1);
    scene.add(leg);
  }
}

// Monitor + Stand
const monitor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.5, 0.1),
  new THREE.MeshPhongMaterial({ color: 0x000000 })
);
monitor.position.set(-10, 4.5, -5.5);
monitor.rotation.y = Math.PI;
scene.add(monitor);

const monitorStand = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 1, 16),
  new THREE.MeshPhongMaterial({ color: 0x333333 })
);
monitorStand.position.set(-10, 3.8, -6);
scene.add(monitorStand);

// Keyboard
const keyboard = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 0.1, 0.8),
  new THREE.MeshPhongMaterial({ color: 0x222222 })
);
keyboard.position.set(-10, 3.3, -4.5);
scene.add(keyboard);

// Mouse
const mouse = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 0.1, 0.6),
  new THREE.MeshPhongMaterial({ color: 0x111111 })
);
mouse.position.set(-7.5, 3.3, -4.5);
scene.add(mouse);

// Chair facing desk
const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(2, 0.3, 2), new THREE.MeshPhongMaterial({ color: 0x2f4f4f }));
chairSeat.position.set(-10, 1.5, -1);
chairSeat.rotation.y = Math.PI;
scene.add(chairSeat);

const chairBack = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 0.2), chairSeat.material);
chairBack.position.set(-10, 2.5, -0.1);
chairBack.rotation.y = Math.PI;
scene.add(chairBack);

// Chair legs
const chairLegGeom = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
const chairLegPositions = [
  [-11, 0.75, -2], [-9, 0.75, -2],
  [-11, 0.75, 0],  [-9, 0.75, 0]
];
chairLegPositions.forEach(pos => {
  const leg = new THREE.Mesh(chairLegGeom, new THREE.MeshPhongMaterial({ color: 0x333333 }));
  leg.position.set(...pos);
  scene.add(leg);
});

// Chair armrests
const armrestGeom = new THREE.BoxGeometry(0.2, 0.8, 2);
const leftArmrest = new THREE.Mesh(armrestGeom, chairSeat.material);
leftArmrest.position.set(-11, 2, -1);
scene.add(leftArmrest);

const rightArmrest = leftArmrest.clone();
rightArmrest.position.set(-9, 2, -1);
scene.add(rightArmrest);

const fridge = new THREE.Mesh(new THREE.BoxGeometry(3, 7, 2.5), new THREE.MeshPhongMaterial({ color: 0xdcdcdc }));
fridge.position.set(12, 3.5, -5);
scene.add(fridge);

const fridgeDoor = new THREE.Mesh(new THREE.BoxGeometry(3, 3.5, 0.1), new THREE.MeshPhongMaterial({ color: 0xcccccc }));
fridgeDoor.position.set(12, 5.25, -6.3);
scene.add(fridgeDoor);

const windowGlass = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 6),
  new THREE.MeshPhongMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.5 })
);
windowGlass.position.set(0, 6, -14.9);
scene.add(windowGlass);

for (let i = -3; i <= 3; i++) {
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3, 0.1), new THREE.MeshPhongMaterial({ color: 0x333333 }));
  bar.position.set(i, 2.5, -14.8);
  scene.add(bar);
}

function makePlant(x, y, z) {
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 1, 16), new THREE.MeshPhongMaterial({ color: 0x8b4513 }));
  pot.position.set(x, y, z);
  scene.add(pot);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2, 16), new THREE.MeshPhongMaterial({ color: 0x228b22 }));
  stem.position.set(x, y + 1.5, z);
  scene.add(stem);

  const leaves = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshPhongMaterial({ color: 0x32cd32 }));
  leaves.position.set(x, y + 2.5, z);
  scene.add(leaves);
}
makePlant(8, 0.5, -5);
makePlant(-12, 0.5, -2);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
