import * as THREE from "three";

var scene, camera, renderer, WIDTH, HEIGHT;
var PI = Math.PI;
var t = 0;
var a = 10;
var body, bodypart;
var rleg, lleg, rleg2, lleg2;
var rlegup, rlegdown, llegup, llegdown;
var rarm, larm, rarm2, larm2;
var rarmup, rarmdown, larmup, larmdown;
var cos = Math.cos;
var sin = Math.sin;

function init(event) {
  var container = document.getElementById("world");

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 2000);
  camera.position.x = 50;
  camera.position.y = 10;
  camera.position.z = 50;
  camera.lookAt(0, 0, 0);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  container.appendChild(renderer.domElement);

  body = new THREE.Group();
  rleg = new THREE.Group();
  rleg2 = new THREE.Group();
  lleg = new THREE.Group();
  lleg2 = new THREE.Group();
  rarm = new THREE.Group();
  larm = new THREE.Group();
  rarm2 = new THREE.Group();
  larm2 = new THREE.Group();
  var legGeom = new THREE.BoxGeometry(4, a, 4);
  var bodyGeom = new THREE.BoxGeometry(a / 2, 2 * a, a);
  var armGeom = new THREE.BoxGeometry(3, a, 3);
  var material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    flatShading: true,
  });
  rlegup = new THREE.Mesh(legGeom, material);
  rlegdown = new THREE.Mesh(legGeom, material);
  llegup = new THREE.Mesh(legGeom, material);
  llegdown = new THREE.Mesh(legGeom, material);
  rleg2.add(rlegdown);
  rleg.add(rlegup, rleg2);
  lleg2.add(llegdown);
  lleg.add(llegup, lleg2);

  rarmup = new THREE.Mesh(armGeom, material);
  rarmdown = new THREE.Mesh(armGeom, material);
  larmup = new THREE.Mesh(armGeom, material);
  larmdown = new THREE.Mesh(armGeom, material);
  rarm2.add(rarmdown);
  rarm.add(rarmup, rarm2);
  larm2.add(larmdown);
  larm.add(larmup, larm2);

  bodypart = new THREE.Mesh(bodyGeom, material);
  body.add(rleg, lleg, rarm, larm, bodypart);
  scene.add(body);

  body.position.y = 10;
  rleg.position.y = -a;
  lleg.position.y = -a;
  rleg.position.z = 3;
  lleg.position.z = -3;
  rarm.position.y = a;
  larm.position.y = a;
  rarm.position.z = 1.5 + 0.5 * a;
  larm.position.z = -1.5 - 0.5 * a;

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

  rlegup.position.y = -0.5 * a;
  rleg2.position.y = -a;
  rlegdown.position.y = -0.5 * a;
  rleg.rotation.z = (sin(t) * PI) / 6;
  rleg2.rotation.z = ((sin(t) - 1) * PI) / 12;

  llegup.position.y = -0.5 * a;
  lleg2.position.y = -a;
  llegdown.position.y = -0.5 * a;
  lleg.rotation.z = (sin(t + PI) * PI) / 6;
  lleg2.rotation.z = ((sin(t + PI) - 1) * PI) / 12;

  rarmup.position.y = -0.5 * a;
  rarm2.position.y = -a;
  rarmdown.position.y = -0.5 * a;
  rarm2.rotation.z = (PI / 4) * 1;
  rarm.rotation.z = (sin(t + PI) * PI) / 4;

  larmup.position.y = -0.5 * a;
  larm2.position.y = -a;
  larmdown.position.y = -0.5 * a;
  larm2.rotation.z = (PI / 4) * 1;
  larm.rotation.z = (sin(t) * PI) / 4;

  body.rotation.y = (-sin(t) * PI) / 12;
}
