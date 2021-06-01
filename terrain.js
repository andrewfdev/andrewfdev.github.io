import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';
class Terrain {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
        this.camera.position.set(-900, -200, -900);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.controls = new THREE.OrbitControls(camera);
        this.controls.addEventListener('change', renderer);
        this.controls.minDistance = 500;
        this.controls.maxDistance = 1500;

        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('arid2_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load('arid2_bk.jpg');
        let texture_up = new THREE.TextureLoader().load('arid2_up.jpg');
        let texture_dn = new THREE.TextureLoader().load('arid2_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load('arid2_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load('arid2_lf.jpg');

        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

        for (let i = 0; i < 6; i++)
            materialArray[i].side = THREE.BackSide;
        skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
        skybox = new THREE.Mesh(skyboxGeo, materialArray);
        this.scene.add(skybox);
        animate();
    }

    animate() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(animate);
    }
}
export { App };