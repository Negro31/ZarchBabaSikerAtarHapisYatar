import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10,10,10);
scene.add(light);

// Ay Modeli
const loader = new THREE.TextureLoader();
const moonTexture = loader.load('moon_diffuse.jpg');
const moonNormal = loader.load('moon_normal.jpg');

const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal
});
const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// Furkuşkom Yazısı
const fontLoader = new THREE.FontLoader();
fontLoader.load('helvetiker_bold.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('FURKUŞKOM', {
        font: font,
        size: 0.2,
        height: 0.05,
        curveSegments: 12,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffff00 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-1,1,0);
    scene.add(textMesh);

    // Yazıyı ayın etrafında döndürme
    function animateText() {
        requestAnimationFrame(animateText);
        textMesh.rotation.y += 0.01;
    }
    animateText();
});

// Ayın kendi etrafında dönmesi
function animate() {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.001; 
    renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
