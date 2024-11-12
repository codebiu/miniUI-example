<template>
    <!-- <div w-full h-full> -->
    <!-- threejs 场景-->
    <canvas full-fex id="glDom" bg-deep-1></canvas>
    <!-- muted 静音 -->
    <video ref="videoDom" muted absolute w-300px h-200px class='video-box video-js'></video>
    <!-- </div> -->
    <div ref="echartDom" absolute z-1 bottom-2 w-600px h-200px bg-white></div>
</template>
  
<script setup lang="ts">
// import * as THREE from 'three'
import { Media } from "./Media";
import { LandMarkManager } from "./LandMarkManager";
import { BaseScene } from "./BaseScene";
import { StatsManager } from "./StatsManager";
import { CubeHelp } from "./CubeHelp";
import { DataShowEchart } from "./DataShowEchart";
import { Test } from "./Test";

const echartDom = ref<HTMLElement>()
let dataShowEchart: DataShowEchart

const videoDom = ref<HTMLVideoElement>()
let landmarkManager: LandMarkManager
const statsManager = new StatsManager();
const baseScene = new BaseScene();
let statsPose: any
let statsThree: any
let cubeHelp: CubeHelp
let loopAnimate: number
let loopPose: number
let media: Media


/********************** vues*******************
 * 
 */
onMounted(() => {
    init()
})
onBeforeUnmount(() => {

})

const init = async () => {
    await initCamera()
    await initMediaPipe()
    await initScene()
    initEchart()
    loop()
    setStats()
    Test.peopleHelp(baseScene.scene)
}


/***************** 初始化摄像头人体跟踪****************
 * 
 */

/**
 * 初始化摄像头
 */
const initCamera = async () => {
    const video = videoDom.value!
    media = new Media(video)
    // // 摄像头
    // await media.getMediaDevices()
    // // 选择设备
    // const videoinputDeviceId = media.videoinputList[1].deviceId
    // await media.getMediaByDeviceId(null, videoinputDeviceId)
    // await media.connectMedia2Dom()
    // videoDom.value!.play()

    // 视频
    await media.getMediaByVideoFile()
}

/**
 * 初始化mediapipe landmark
 */
const initMediaPipe = () => {
    landmarkManager = new LandMarkManager()
    landmarkManager.getLandMarkerPose()
}

/**
 * 初始化场景
 */
const initScene = async () => {
    baseScene.init('glDom');
    cubeHelp = new CubeHelp(baseScene.scene, baseScene.canvas, baseScene.camera)
}

const initEchart = () => {
    dataShowEchart = new DataShowEchart(echartDom.value!);
    dataShowEchart.initDynamicData()

}


/***************** loop  ****************
 * 
 */

/**
 * 开始循环
 * 分频率
 */
const loop = () => {
    // 监测身体姿态
    loopPose = videoDom.value!.requestVideoFrameCallback(onVideoFrame)
    loopAnimate = requestAnimationFrame(onAnimate)
}

/**
 * 视频单帧处理
 * @param time
 */
const onVideoFrame = (time: any) => {
    // 脸特征提取
    const landmark = landmarkManager!.detectPose(videoDom.value!, time) as []
    if (media.isPlaying) {
        landmark && dataShowEchart && dataShowEchart.updateDynamicData(landmark[0].x)
    }
    landmark && showCubes(landmark)
    statsPose && statsPose.update()
    videoDom.value!.requestVideoFrameCallback(onVideoFrame)
}

const showCubes = (landmark: any) => {
    if (!cubeHelp || !landmark || landmark.length == 0) return
    if (cubeHelp.cubes.length == 0) {
        cubeHelp.addCubeWithLabel(landmark, []);
        return
    }
    cubeHelp.updateCubeWithLabel(landmark);

}


/**
 * 动画循环
 * @param time
 */
const onAnimate = () => {
    baseScene.update()
    statsThree && statsThree.update()
    requestAnimationFrame(onAnimate)
}


/**
  * 设置stats监测帧率
  */
const setStats = () => {
    statsPose = statsManager.add('glDom');
    statsThree = statsManager.add('glDom');
    statsThree.dom.style.top = '50px';
};



</script>
  
<style scoped></style>
  