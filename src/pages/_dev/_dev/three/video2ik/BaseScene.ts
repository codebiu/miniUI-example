
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';

class BaseScene {
    canvas!: HTMLCanvasElement;// 场景容器
    scene!: THREE.Scene;//场景
    // camera!: THREE.Camera;//镜头
    camera!: THREE.PerspectiveCamera;//镜头
    canvasWidth!: number;//画布宽度
    canvasHeight!: number;//画布高度
    renderer!: THREE.WebGLRenderer; // 渲染器
    controls!: OrbitControls;// 控制器
    clock!: null;
    stats!: null;
    ambientLight!: null;
    directionalLight!: null;
    pointLight!: null;
    gridHelper!: null;
    constructor() {
    }

    /**
     * 场景初始化
     *  <div id="container" class="container"></div>
     * .container {
            width: 100%;
            height: 100%;
        }
     * @param dom 
     */
    public init(dom: string): void {
        // 初始化场景容器
        this.canvas = document.getElementById(dom) as unknown as HTMLCanvasElement
        this.canvasWidth = this.canvas!.clientWidth;
        this.canvasHeight = this.canvas!.clientHeight;
        this._setScene()
        this._setLight()
        this._setCamera()
        this._setRender()
        this._setControl()
        this._setGround()
        this.setHelper()
        // this._setGroundByHdr()
        window.addEventListener("resize", this._resize.bind(this));
    }


    // 场景的更新方法
    public update(): void {
        this.controls.update();
        // 更新场景的逻辑
        this.renderer.render(this.scene, this.camera);

    }

    private _setScene(): void {
        this.scene = new THREE.Scene();
        // //设置背景
        this.scene.background = new THREE.Color(0xa0a0a0);
        // this.scene.background = new THREE.Color('black');
        // //设置颜色渐变
        // this.scene.fog = new THREE.Fog( 0xa0a0a0, 100, 200 );
        // this.scene.fog = new THREE.Fog('black', 100, 200);
    }

    /**
     * 
     */
    private _setCamera(): void {
        // 透视相机
        // fov	相机视锥体竖直方向视野角度
        // aspect	相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height
        // near	相机视锥体近裁截面相对相机距离
        // far	相机视锥体远裁截面相对相机距离，far-near构成了视锥体高度方向

        // 视场角 考虑读取摄像头
        const fov = 45;
        this.camera = new THREE.PerspectiveCamera(fov, this.canvasWidth / this.canvasHeight, 0.1, 1000);

        // 正交相机 测试mediapipe已经做了透视处理
        // this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 100);

        // 相机方位参数
        this.camera.position.set(0, 3, 3); //设置相机位置
    }

    /**
     * THREE.PointLight（点光源）
     * THREE.AmbientLight（环境光）会将场景中的所有物体渲染为相同的颜色 无阴影
     * THREE.HemisphereLight（半球 环境光）可以创建更加贴近自然的户外光照效果。 无阴影
     * THREE.LensFlare（镜头光晕）
     * THREE.DirectionalLight （平行光）可以创建太阳光效果，可以产生阴影
     */
    private _setLight() {
        // 环境光
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
        hemiLight.position.set(0, 100, 0);
        this.scene!.add(hemiLight);

        // 方向光
        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(50, 50, -50);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 80;
        dirLight.shadow.camera.bottom = - 80;
        dirLight.shadow.camera.left = - 80;
        dirLight.shadow.camera.right = 80;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 150;
        // 阴影扩散 模糊
        // dirLight.shadow.radius  = 10;
        // 设置阴影贴图的分辨率
        dirLight.shadow.mapSize.set(2048, 2048)
        this.scene!.add(dirLight);

        // 辅助
        // this.scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );
    }



    /**
     * 设置渲染器
     */
    private _setRender() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            logarithmicDepthBuffer: true,
            alpha: true,
        });
        this.renderer.setClearAlpha(0);
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.renderer.render(this.scene, this.camera);
        //设置渲染器的输出抗锯齿（antialias）
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //设置阴影贴图的分辨率
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //允许在场景中使用阴影贴图
        this.renderer.shadowMap.enabled = true;
    }


    _resize() {
        this.camera.aspect = this.canvasWidth / this.canvasHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * 设置地面
     */
    private _setGround() {
        // 100*100地面
        // const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 'black', depthWrite: false }));
        // 绕x轴旋转-90    水平地表 
        mesh.rotation.x = -Math.PI / 2;
        // 开启地表阴影
        mesh.receiveShadow = true;
        this.scene!.add(mesh);
    }
    /**
     * 设置Hdr地面和天空
     */
    private async _setGroundByHdr() {
        const hdrLoader = new RGBELoader();
        const envMap = await hdrLoader.loadAsync('textures/equirectangular/blouberg_sunrise_2_1k.hdr');
        envMap.mapping = THREE.EquirectangularReflectionMapping;
        const params = {
            height: 15,
            radius: 100,
            enabled: true,
        };
        // 半圆天空盒
        const skybox = new GroundedSkybox(envMap, params.height, params.radius);
        skybox.position.y = params.height - 0.01;
        this.scene.add(skybox);
        this.scene.environment = envMap;
    }

    private _setControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement as unknown as HTMLElement)
        // this.controls.listenToKeyEvents(window) // optional
        // this.controls.maxPolarAngle = Math.PI / 2
    }

    setHelper() {
        // AxesHelper：辅助观察的坐标系
        const axesHelper = new THREE.AxesHelper(2);
        this.scene.add(axesHelper);
    }


}

/**
 * A ground-projected skybox. The height is how far the camera that took the photo was above the ground - 
 * a larger value will magnify the downward part of the image. By default the object is centered at the camera, 
 * so it is often helpful to set skybox.position.y = height to put the ground at the origin. Set the radius 
 * large enough to ensure your user's camera stays inside.
 */

class GroundedSkybox extends Mesh {
    constructor(map: any, height: any, radius: any, resolution = 128) {
        if (height <= 0 || radius <= 0 || resolution <= 0) {
            throw new Error('GroundedSkybox height, radius, and resolution must be positive.');
        }
        const geometry = new SphereGeometry(radius, 2 * resolution, resolution);
        geometry.scale(1, 1, -1);
        const pos = geometry.getAttribute('position');
        const tmp = new Vector3();
        for (let i = 0; i < pos.count; ++i) {
            tmp.fromBufferAttribute(pos, i);
            if (tmp.y < 0) {
                // Smooth out the transition from flat floor to sphere:
                const y1 = - height * 3 / 2;
                const f =
                    tmp.y < y1 ? - height / tmp.y : (1 - tmp.y * tmp.y / (3 * y1 * y1));
                tmp.multiplyScalar(f);
                tmp.toArray(pos.array, 3 * i);

            }
        }
        pos.needsUpdate = true;
        super(geometry, new MeshBasicMaterial({ map, depthWrite: false }));
    }
}


export { BaseScene }