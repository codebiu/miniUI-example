import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'


/**
 * 模型初始化更新
 */
class ModelGLTF {
    loader: GLTFLoader | FBXLoader;
    morphTargetMeshes: any;
    actions: Map<string, THREE.AnimationAction>;
    url: string;
    scene: THREE.Scene;
    model: any;
    root: any;
    mixer: THREE.AnimationMixer | null
    constructor(scene: THREE.Scene) {

        this.morphTargetMeshes = [];
        this.actions = new Map();
        this.url = '';
        this.scene = scene;
        this.mixer = null
    }
    loadModel(url: string, Callback: any) {
        this.url = url;

        this.loader = new GLTFLoader();
        this.loader.load(
            // URL of the model you want to load
            url,
            // Callback when the resource is loaded
            (model) => {
                // 刷新模型
                if (this.model) {
                    this.model.scene.remove();
                    this.morphTargetMeshes = [];
                }
                this.model = model;
                this.scene.add(model.scene);
                this.addFace(model);
                // 回调
                Callback()
            },

            (progress) =>
                console.log("Loading model...", 100.0 * (progress.loaded / progress.total), "%"),
            (error) => console.error(error)
        );

    }
    addFace(model: GLTF) {
        // model.scene.position.set(0, 0, 0); //定位
        // model.scene.scale.set(0.5, 0.5, 0.5);
        model.scene.traverse((mesh: any) => {
            // Register first bone found as the root
            if (mesh.isBone && !this.root) this.root = mesh;
            // Return early if no mesh is found.
            if (!mesh.isMesh) return;
            mesh.castShadow = true
            // 防止镜头穿模 改变中心?
            mesh.frustumCulled = false;
            // 法线贴图
            const normalMaps = {
                'hair': '/model/sourceimages/hair_low_hair_Normal.png',
                'head.001': '/model/sourceimages/head_n_normal.png',
                'coat': '/model/sourceimages/Outfit-m-backtoschool-01-top-N.png',
                'pants': '/model/sourceimages/overall-bottom-01-03-N.png',
                'shoes_a': '/model/sourceimages/Upper_Normal_OpenGL.png',
                'shoes_b': '/model/sourceimages/Sole_Normal_OpenGL.png',
                'shoes_c': '/model/sourceimages/Outsole_Normal_OpenGL.png',
                'teeth_up': '/model/sourceimages/Teeth_Normal.png',
                'teeth_down': '/model/sourceimages/Teeth_Normal.png',
                'tongue': '/model/sourceimages/Tongue_Normal.png',
            }
            if (normalMaps[mesh.userData.name] != null) {
                const textureLoader = new THREE.TextureLoader();
                const normalMap = textureLoader.load(normalMaps[mesh.userData.name]);
                normalMap.flipY = false;
                normalMap.colorSpace = THREE.LinearSRGBColorSpace;
                mesh.material.normalMap = normalMap
                mesh.material.shininess = 10;
                // mesh.material.normalScale = new THREE.Vector2(30, 30)
            }


            // Return early if mesh doesn't include morphable targets
            if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return;
            this.morphTargetMeshes.push(mesh);
        });
    }

    /**
     * 面部活动
     * @param {*} blendshapesObj
     */
    updateBlendshapes(blendshapesObj: any) {
        for (const mesh of this.morphTargetMeshes) {
            if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
                // console.warn(`Mesh ${mesh.name} does not have morphable targets`);
                continue;
            }
            // 使用 Object.entries() 将对象转换为键值对数组
            const blendshapes = Object.entries(blendshapesObj) as any;
            for (const [name, value] of blendshapes) {
                if (!Object.keys(mesh.morphTargetDictionary).includes(name)) {
                    // console.warn(`Model morphable target ${name} not found`);
                    continue;
                }
                const idx = mesh.morphTargetDictionary[name];
                if (name == "eyeBlinkLeft" || name == "eyeBlinkRight" || name == "eyeLookDownLeft" || name == "eyeLookDownRight") {
                    if (value > 0.5) {
                        mesh.morphTargetInfluences[idx] = value * 0.7;
                    } else {
                        mesh.morphTargetInfluences[idx] = value * 0.1;
                    }
                    // 临时解决嘴鼻闭不上的问题
                } else {
                    mesh.morphTargetInfluences[idx] = value;

                }
            }
        }
    }

    /**
     * 位置角度变换
     * @param matrix
     * @param matrixRetargetOptions
     * @returns
     */
    applyMatrix(matrix: any) {
        if (!this.model) return
        // model scene 场景坐标系行列互换   xyz   对应 12 13 14
        matrix[12] -= 0.5;
        matrix[13] -= 1.4;
        matrix[14] += 2;
        matrix = new THREE.Matrix4().fromArray(matrix);
        this.model.scene.matrixAutoUpdate = false;
        this.model.scene.matrix.copy(matrix);
    }

    /**
     * 动作集合
     * @param actionGlbUrls 
     * @returns 
     */
    addActions(actionGlbUrls?: string[]) {
        if (!this.model) return
        if (!this.mixer) this.mixer = new THREE.AnimationMixer(this.model.scene)
        // 模型本身动作
        const animations = this.model.animations
        for (let index = 0; index < animations.length; index++) {
            const action = this.mixer.clipAction(animations[index])
            this.actions.set(action.getClip().name, action)
        }
        // 外部单个动作glb
        if (!actionGlbUrls) return
        const gltfLoader = new GLTFLoader()
        for (let index = 0; index < actionGlbUrls.length; index++) {
            const actionGlbUrl = actionGlbUrls[index];
            gltfLoader.load(actionGlbUrl, (gltfThis) => {
                const action = this.mixer?.clipAction(gltfThis.animations[0]) as THREE.AnimationAction
                this.actions.set(actionGlbUrl, action)
            })
        }
    }
}


/**
 * 模型初始化更新
 */
class ModelFBX {
    loader: FBXLoader;
    morphTargetMeshes: any;
    actions: Map<string, THREE.AnimationAction>;
    url: string;
    scene: THREE.Scene;
    model: any;
    root: any;
    mixer: THREE.AnimationMixer | null
    constructor(scene: THREE.Scene) {

        this.morphTargetMeshes = [];
        this.actions = new Map();
        this.url = '';
        this.scene = scene;
        this.mixer = null
    }
    loadModel(url: string, Callback: any) {
        this.url = url;
        if (this.url.endsWith('.fbx')) {
            this.loader = new FBXLoader();
            this.loader.load(
                // URL of the model you want to load
                url,
                // Callback when the resource is loaded
                (model) => {
                    this.morphTargetMeshes = [];
                    this.model = model;
                    this.scene.add(model);
                    this.addFace();
                    // 回调
                    Callback()
                },
                // Called while loading is progressing
                (progress) =>
                    console.log(
                        "Loading model...",
                        100.0 * (progress.loaded / progress.total),
                        "%"
                    ),
                // Called when loading has errors
                (error) => console.error(error)
            );
        }
    }
    addFace() {
        this.model.traverse((mesh: any) => {
            // Register first bone found as the root
            if (mesh.isBone && !this.root) this.root = mesh;
            // Return early if no mesh is found.
            if (!mesh.isMesh) return;
            mesh.castShadow = true
            // 防止镜头穿模 改变中心?
            mesh.frustumCulled = false;
            // 法线贴图
            const normalMaps = {
                'hair': '/model/sourceimages/hair_low_hair_Normal.png',
                'head.001': '/model/sourceimages/head_n_normal.png',
                'coat': '/model/sourceimages/Outfit-m-backtoschool-01-top-N.png',
                'pants': '/model/sourceimages/overall-bottom-01-03-N.png',
                'shoes_a': '/model/sourceimages/Upper_Normal_OpenGL.png',
                'shoes_b': '/model/sourceimages/Sole_Normal_OpenGL.png',
                'shoes_c': '/model/sourceimages/Outsole_Normal_OpenGL.png',
                'teeth_up': '/model/sourceimages/Teeth_Normal.png',
                'teeth_down': '/model/sourceimages/Teeth_Normal.png',
                'tongue': '/model/sourceimages/Tongue_Normal.png',
            } as any
            if (normalMaps[mesh.userData.name] != null) {
                const textureLoader = new THREE.TextureLoader();
                const normalMap = textureLoader.load(normalMaps[mesh.userData.name]);
                normalMap.flipY = false;
                normalMap.colorSpace = THREE.LinearSRGBColorSpace;
                mesh.material.normalMap = normalMap
                mesh.material.shininess = 10;
                // mesh.material.normalScale = new THREE.Vector2(30, 30)
            }


            // Return early if mesh doesn't include morphable targets
            if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return;
            this.morphTargetMeshes.push(mesh);
        });
    }

    /**
     * 面部活动
     * @param {*} blendshapesObj
     */
    updateBlendshapes(blendshapesObj: any) {
        for (const mesh of this.morphTargetMeshes) {
            if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
                // console.warn(`Mesh ${mesh.name} does not have morphable targets`);
                continue;
            }
            // 使用 Object.entries() 将对象转换为键值对数组
            const blendshapes = Object.entries(blendshapesObj) as any;
            for (const [name, value] of blendshapes) {
                if (!Object.keys(mesh.morphTargetDictionary).includes(name)) {
                    // console.warn(`Model morphable target ${name} not found`);
                    continue;
                }
                const idx = mesh.morphTargetDictionary[name];
                if (name == "eyeBlinkLeft" || name == "eyeBlinkRight" || name == "eyeLookDownLeft" || name == "eyeLookDownRight") {
                    if (value > 0.5) {
                        mesh.morphTargetInfluences[idx] = value * 0.7;
                    } else {
                        mesh.morphTargetInfluences[idx] = value * 0.1;
                    }
                    // 临时解决嘴鼻闭不上的问题
                } else {
                    mesh.morphTargetInfluences[idx] = value;

                }
            }
        }
    }

    /**
     * 位置角度变换
     * @param matrix
     * @param matrixRetargetOptions
     * @returns
     */
    applyMatrix(matrix: any) {
        if (!this.model) return
        // model scene 场景坐标系行列互换   xyz   对应 12 13 14
        matrix[12] -= 0.5;
        matrix[13] -= 1.4;
        matrix[14] += 2;
        matrix = new THREE.Matrix4().fromArray(matrix);
        this.model.scene.matrixAutoUpdate = false;
        this.model.scene.matrix.copy(matrix);
    }

    /**
     * 动作集合
     * @param actionGlbUrls 
     * @returns 
     */
    addActions(actionGlbUrls?: string[]) {
        if (!this.model) return
        if (!this.mixer) this.mixer = new THREE.AnimationMixer(this.model)
        // 模型本身动作
        const animations = this.model.animations
        for (let index = 0; index < animations.length; index++) {
            const action = this.mixer.clipAction(animations[index])
            this.actions.set(action.getClip().name, action)
        }
        // 外部单个动作glb
        if (!actionGlbUrls) return
        const fbxLoader = new FBXLoader()
        for (let index = 0; index < actionGlbUrls.length; index++) {
            const actionGlbUrl = actionGlbUrls[index];
            fbxLoader.load(actionGlbUrl, (fbxThis) => {
                const action = this.mixer?.clipAction(fbxThis.animations[0]) as THREE.AnimationAction
                this.actions.set(actionGlbUrl, action)
            })
        }

    }
}


export { ModelGLTF, ModelFBX }