import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
type position = {
    x: number
    y: number
    z: number
}

class CubeHelp {
    scene!: THREE.Scene //场景
    cubes: THREE.Mesh[]
    width: number
    height: number
    labelRenderers: CSS2DRenderer[] = []
    camera!: THREE.Camera
    constructor(scene: THREE.Scene, canvas: HTMLCanvasElement, camera: THREE.Camera) {
        this.scene = scene
        this.cubes = []
        this.width = canvas.width
        this.height = canvas.height
        this.camera = camera
    }

    /**
     * 添加标记体
     * @param {*} position
     * @returns
     */
    addCube(position: position, color?: string) {
        // 添加mesh和纹理
        const geometry = new THREE.BoxGeometry(0.007, 0.007, 0.007)
        let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        if (color) material = new THREE.MeshBasicMaterial({ color: color })
        const cube = new THREE.Mesh(geometry, material)
        this.scene.add(cube)
        cube.position.x = position.x
        cube.position.y = -position.y
        cube.position.z = -position.z
        return cube
    }

    /**
     * 绑定label
     * @param cube 
     * @param number 
     * @returns 
     */
    addLabelOnCube(cube: THREE.Mesh, number: number) {
        const labelDiv = document.createElement('div')
        labelDiv.className = 'label'
        labelDiv.textContent = number.toString()
        labelDiv.style.marginTop = '-1em'
        const label = new CSS2DObject(labelDiv)
        label.position.set(0, 0, 0)
        label.layers.set(0)
        const labelRenderer = new CSS2DRenderer()
        labelRenderer.setSize(this.width, this.height)
        labelRenderer.domElement.style.position = 'absolute'
        labelRenderer.domElement.style.top = '0px'
        labelRenderer.domElement.style.color = 'red'
        document.body.appendChild(labelRenderer.domElement)
        cube.add(label)
        labelRenderer.render(this.scene, this.camera)
        return labelRenderer
    }

    /**
     * 添加标记
     * @param {*} positions
     */
    addCubeWithLabel(positions: Array<position>, indexNUbersLabel: Array<number> = []) {
        this.cubes = []
        for (let index = 0; index < positions.length; index++) {
            const position = positions[index]
            const cube = this.addCube(position)
            if (indexNUbersLabel.includes(index)) {
                const labelRenderer = this.addLabelOnCube(cube, index)
                this.labelRenderers.push(labelRenderer)
            }
            this.cubes.push(cube)
        }
    }

    /**
     * 添加标记
     * @param {*} positions
     */
    updateCubeWithLabel(positions: Array<position>) {
        for (let index = 0; index < this.cubes.length; index++) {
            const cube = this.cubes[index]
            const position = positions[index]
            // cube.position.x = -position.x 
            cube.position.x = position.x 
            cube.position.y = -position.y
            cube.position.z = -position.z
        }
        for (let index = 0; index < this.labelRenderers.length; index++) {
            const labelRenderer = this.labelRenderers[index]
            labelRenderer.render(this.scene, this.camera)
        }
    }
}

export { CubeHelp }
