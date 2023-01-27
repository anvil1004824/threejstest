//Three.js 라이브러리 import
import * as THREE from "three";

//기본 변수 설정
let scene, camera, renderer, WIDTH, HEIGHT;
const PI = Math.PI;
let t = 0;
const a = 10;
let legup;
const cos = Math.cos;
const sin = Math.sin;

//기본 설정
function init(event) {
  //HTML 요소 불러오기
  const container = document.getElementById("world");

  //캔버스의 높이와 너비 지정
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  //장면과 카메라 설정
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 2000);
  camera.position.z = 50;
  camera.lookAt(0, 0, 0);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  container.appendChild(renderer.domElement);

  //legup 설정
  const geom = new THREE.BoxGeometry(4, a, 4);
  const material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    flatShading: true,
  });
  legup = new THREE.Mesh(geom, material);

  //장면에 legup 추가
  scene.add(legup);

  //글로벌 라이트 추가
  const globalLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(globalLight);

  loop();

  window.addEventListener("resize", handleWindowResize, false);
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

//애니메이팅
function loop() {
  update();

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

window.addEventListener("load", init, false);

function update() {
  t += 0.1;

  legup.rotation.z = (sin(t) * PI) / 6;
}
