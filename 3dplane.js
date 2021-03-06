import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class ThreeDPlane {

    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.PLANESIZE = 20;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        var planeGeom = new THREE.PlaneGeometry(this.PLANESIZE, this.PLANESIZE);
        var planeMat = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
        this.planeOb = new THREE.Mesh(planeGeom, planeMat);

        this.planeOb.position.set(0, 0, 0);
        this.planeOb.rotation.set(0, 0.6, 0);
        this.scene.add(this.planeOb);

        var cubeGeom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        var cubeMat = new THREE.MeshLambertMaterial({ color: 0xe83610 });
        this.cubeOb = new THREE.Mesh(cubeGeom, cubeMat);

        this.cubeOb.position.set(0, 0, 0);
        this.scene.add(this.cubeOb);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        this.camera.position.y = 16;
        this.camera.position.z = 40;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


        var gridXZ = new THREE.GridHelper(100, 10, new THREE.Color(0xff0000), new THREE.Color(0xffffff));

        this.scene.add(gridXZ);

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 10, 50);
        this.scene.add(pointLight);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.animate();
    }

    onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        //put here instead of init to have planeOb.matrix defined, after render
        var texcoord = new THREE.Vector2(0.8, 0.65);
        var newpos = this.texturePosToPlaneWorld(this.planeOb, texcoord);
        this.cubeOb.position.copy(newpos);

        this.controls.update();
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    texturePosToPlaneWorld(planeOb, texcoord) {
        var pos = new THREE.Vector3();
        pos.x = (texcoord.x - 0.5) * this.PLANESIZE;
        pos.y = (texcoord.y - 0.5) * this.PLANESIZE;

        pos.applyMatrix4(this.planeOb.matrix);
        return pos;
    }

}

export { ThreeDPlane }