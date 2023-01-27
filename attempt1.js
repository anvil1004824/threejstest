import * as THREE from "three";

// Initialize variables.
var scene, camera, renderer, WIDTH, HEIGHT;
var PI = Math.PI;
var t = 0;
var a = 10;
var legup;
var cos = Math.cos;
var sin = Math.sin;

function init(event) {
  var container = document.getElementById("world");

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 2000);
  camera.position.z = 50;
  camera.lookAt(0, 0, 0);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  container.appendChild(renderer.domElement);

  var geom = new THREE.BoxGeometry(4, a, 4);
  var material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    flatShading: true,
  });
  legup = new THREE.Mesh(geom, material);
  scene.add(legup);

  var globalLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(globalLight);

  window.addEventListener("resize", handleWindowResize, false);
  loop();
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function loop() {
  update();

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

window.addEventListener("load", init, false);

function update() {
  t += 0.1;

  //legup.position.x = (sin(t) * a) / 4;
  //legup.position.y = (((-cos(2 * t) + 1) * 0.5 * a) / 2) * (1 - Math.sqrt(3) * 0.5);
  legup.rotation.z = (sin(t) * PI) / 6;
}
