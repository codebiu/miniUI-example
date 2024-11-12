
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
class Test {
    
    static peopleHelp(scene: THREE.Scene) {
        const geometry = new THREE.BoxGeometry(0.6, 1.8, 0.2)
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff})
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        cube.position.x = 1
        cube.position.y = 0
        cube.position.z = 0
    }
}


export {
    Test
}