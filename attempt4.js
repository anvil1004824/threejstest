import * as THREE from "three";

// Initialize variables.
var scene, camera, renderer, WIDTH, HEIGHT;
var PI = Math.PI;
var t = 0;
var a = 10;
var leg, leg2;
var legup, legdown;
var cos = Math.cos;
var sin = Math.sin;

function init(event) {
  // Get the container that will hold the animation.
  var container = document.getElementById("world");

  // Get window size.
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  // Create a three.js scene; set up the camera and the renderer.
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 2000);
  camera.position.z = 50;
  camera.lookAt(0, 0, 0);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  container.appendChild(renderer.domElement);

  leg = new THREE.Group();
  leg2 = new THREE.Group();
  var geom = new THREE.BoxGeometry(4, a, 4);
  var material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    flatShading: true,
  });
  legup = new THREE.Mesh(geom, material);
  legdown = new THREE.Mesh(geom, material);
  leg2.add(legdown);
  leg.add(legup, leg2);
  scene.add(leg);

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

  leg.rotation.z = (sin(t) * PI) / 6;
  legup.position.y = -0.5 * a;
  leg2.position.y = -a;
  legdown.position.y = -0.5 * a;
  leg2.rotation.z = ((sin(t) - 1) * PI) / 12;
}
