import {
    Scene,
    Engine,
    Vector3,
    HemisphericLight,
    ArcRotateCamera,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Color4,
    InstancedMesh,
    VertexData,
    LinesMesh,
    Mesh,
    DynamicTexture
} from 'babylonjs';

class GraphScene {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: ArcRotateCamera | undefined;

    // 节点和边的数据
    private nodes: any[] = [];
    private edges: any[] = [];



    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        // 初始化引擎
        this.engine = new Engine(this.canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true,
            deterministicLockstep: true,
            lockstepMaxSteps: 4
        });

        // 创建场景
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1);

        // 初始化相机、灯光等
        this.initCamera();
        this.initLights();

        // 生成测试数据
        this.generateTestData(10000, 10000);

        // 创建图可视化
        this.createGraphVisualization();

        // 启动渲染循环
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // 添加性能监控
        // this.setupPerformanceMonitoring();
    }

    private initCamera() {
        this.camera = new ArcRotateCamera(
            "Camera",
            -Math.PI / 2,
            Math.PI / 2,
            150,
            Vector3.Zero(),
            this.scene
        );
        this.camera.attachControl(this.canvas, true);
        this.camera.lowerRadiusLimit = 20;
        this.camera.upperRadiusLimit = 500;
        this.camera.wheelDeltaPercentage = 0.01;
        this.camera.panningSensibility = 50;
    }

    private initLights() {
        new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        new HemisphericLight("light2", new Vector3(0, -1, 0), this.scene);
    }

    private generateTestData(nodeCount: number, edgeCount: number) {
        // 生成节点
        this.nodes = Array.from({ length: nodeCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            z: Math.random() * 100 - 50,
            size: Math.random() * 0.5 + 0.5,
            color: new Color3(Math.random(), Math.random(), Math.random())
        }));

        // 生成边
        this.edges = Array.from({ length: edgeCount }, (_, i) => ({
            id: i,
            source: Math.floor(Math.random() * nodeCount),
            target: Math.floor(Math.random() * nodeCount),
            width: Math.random() * 0.2 + 0.1
        }));
    }

    private createGraphVisualization() {
        // 创建节点原型（使用实例化渲染）
        const nodePrototype = MeshBuilder.CreateSphere(
            "nodePrototype",
            { diameter: 1, segments: 8 },
            this.scene
        );

        const nodeMaterial = new StandardMaterial("nodeMaterial", this.scene);
        nodeMaterial.diffuseColor = new Color3(0.5, 0.5, 1);
        nodeMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        nodePrototype.material = nodeMaterial;
        nodePrototype.setEnabled(false); // 隐藏原型

        // 创建节点实例
        this.nodes.forEach((node, i) => {
            const instance = nodePrototype.createInstance(`node_${i}`);
            instance.position = new Vector3(node.x, node.y, node.z);
            instance.scaling = new Vector3(node.size, node.size, node.size);

            // 为每个实例创建独立材质以支持不同颜色
            const instanceMaterial = nodeMaterial.clone(`nodeMat_${i}`);
            instanceMaterial.diffuseColor = node.color;
            instance.material = instanceMaterial;
        });

        // 批量创建边（性能优化）
        this.createBatchedEdges();

        // 性能优化设置
        this.scene.freezeMaterials();
        this.scene.freezeActiveMeshes();
    }

    private createBatchedEdges() {
        const points: Vector3[] = [];
        const colors: Color4[] = [];
    
        this.edges.forEach(edge => {
            const source = this.nodes[edge.source];
            const target = this.nodes[edge.target];
    
            if (source && target) {
                // 起点位置和颜色
                points.push(new Vector3(source.x, source.y, source.z));
                colors.push(new Color4(source.color.r, source.color.g, source.color.b, 0.7));
    
                // 终点位置和颜色
                points.push(new Vector3(target.x, target.y, target.z));
                colors.push(new Color4(target.color.r, target.color.g, target.color.b, 0.7));
            }
        });
    
        // 使用 MeshBuilder 创建线条
        const lines = MeshBuilder.CreateLines("batchedEdges", {
            points: points,
            colors: colors
        }, this.scene);
    
        // 设置线宽（需要启用EdgesRenderer）
        lines.edgesWidth = 1.0;
    }

    public resize() {
        this.engine.resize();
    }

    public dispose() {
        this.scene.dispose();
        this.engine.dispose();
    }

    /**
 * 初始化监听
 */
    observeInit(dom: string) {
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
}

export { GraphScene };