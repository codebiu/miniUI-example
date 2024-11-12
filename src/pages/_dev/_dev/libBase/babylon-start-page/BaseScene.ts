import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  PointLight,
  MeshBuilder,
  Color3,
  Color4,
  StandardMaterial,
  Texture,
  ArcRotateCamera,
  Camera
} from 'babylonjs'
import earth_0 from '@/assets/img/earth_0.png'
/**
 * 基础场景
 */
class BaseScene {
  canvas: HTMLCanvasElement
  engine: Engine
  camera: Camera | undefined
  scene: Scene | undefined
  /**
   *
   * @param dom canvas id
   */
  constructor(dom: string) {
    this.canvas = document.getElementById(dom) as HTMLCanvasElement
    // Load the 3D engine // 初始化 BABYLON 3D engine
    this.engine = new Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    })
    //
    // Create a basic BJS Scene object 创建一个场景scene
    this.scene = new Scene(this.engine)
    this.scene.clearColor = new Color4(0, 0, 0, 0) // 背景透明
    // 循环渲染
    this.engine.runRenderLoop(() => {
      this.scene!.render()
    })
    // 场景内渲染
    this._init()
  }

  /**
   *
   */
  private _init() {
    this._cameraInit()
    this._lightInit()
    this._meshInit()
  }

  private _cameraInit() {
    // // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}  添加一个相机，并绑定鼠标事件
    // camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene)
    // // Target the camera to scene origin
    // camera.setTarget(Vector3.Zero())
    // // Attach the camera to the canvas
    // camera.attachControl(canvas, false)
    this.camera = new ArcRotateCamera('Camera', 0, 0, 100, Vector3.Zero(), this.scene)
    this.camera.attachControl(this.canvas, true)
  }

  private _lightInit() {
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky 添加一组灯光到场景
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene)
    // const light2 = newPointLight('light2', newVector3(0, 1, -1), this.scene)
  }

  private _meshInit() {
    //添加一个球体到场景中 todo 真实三角和多边形
    // https://blog.csdn.net/qq_37891961/article/details/134888583

    // 切片
    // https://www.jianshu.com/p/8902431e8f46
    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 50, segments: 32 }, this.scene)

    const myMaterial = new StandardMaterial('myMaterial', this.scene)

    myMaterial.diffuseTexture = new Texture(earth_0, this.scene)
    myMaterial.specularTexture = new Texture(earth_0, this.scene)
    myMaterial.emissiveTexture = new Texture(earth_0, this.scene)
    // myMaterial.ambientTexture = newTexture(earth_0, this.scene);

    sphere.material = myMaterial
  }

  /**
   * 初始化监听
   */
  observeInit(dom:string) {
    // the canvas/window resize event handler 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
    // window.addEventListener('resize', function () {
    //   engine.resize()
    // })

    // 监听元素变化
    let tempSetTime: any
    const resizeObserver = new ResizeObserver(() => {
      tempSetTime && clearTimeout(tempSetTime)
      tempSetTime = setTimeout(() => {
        this.engine.resize()
      }, 15)
    })
    resizeObserver.observe(document.getElementById(dom) as HTMLElement)
    //// resizeObserver.unobserve(canvasP)// 取消监听元素
  }

  dispose() {}
}

export { BaseScene }
