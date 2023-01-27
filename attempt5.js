import * as THREE from "three";

var scene, camera, renderer, WIDTH, HEIGHT;
var PI = Math.PI;
var t = 0;
var a = 10;
var rleg, lleg, rleg2, lleg2;
var rlegup, rlegdown, llegup, llegdown;
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

  rleg = new THREE.Group();
  rleg2 = new THREE.Group();
  lleg = new THREE.Group();
  lleg2 = new THREE.Group();
  var geom = new THREE.BoxGeometry(4, a, 4);
  var bodyGeom = new THREE.BoxGeometry(5, 20, 10);
  var material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    flatShading: true,
  });
  body = new THREE.Mesh(bodyGeom, material);
  rlegup = new THREE.Mesh(geom, material);
  rlegdown = new THREE.Mesh(geom, material);
  llegup = new THREE.Mesh(geom, material);
  llegdown = new THREE.Mesh(geom, material);
  rleg2.add(rlegdown);
  rleg.add(rlegup, rleg2);
  lleg2.add(llegdown);
  lleg.add(llegup, lleg2);
  scene.add(rleg, lleg);
  rleg.position.z = 3;
  lleg.position.z = -3;

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

  // Render the scene in each frame.
  renderer.render(scene, camera);

  // Call the loop function in next frame.
  requestAnimationFrame(loop);
}

// Initialize the demo when the page is loaded.
window.addEventListener("load", init, false);

function update() {
  t += 0.1;

  rleg.rotation.z = (sin(t) * PI) / 6;
  rlegup.position.y = -0.5 * a;
  rleg2.position.y = -a;
  rlegdown.position.y = -0.5 * a;
  rleg2.rotation.z = ((sin(t) - 1) * PI) / 12;

  lleg.rotation.z = (sin(t + PI) * PI) / 6;
  llegup.position.y = -0.5 * a;
  lleg2.position.y = -a;
  llegdown.position.y = -0.5 * a;
  lleg2.rotation.z = ((sin(t + PI) - 1) * PI) / 12;
}
