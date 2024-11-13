<template>
  <div full-fex bg-deep-3>
    <div>
      <video id="videoDom" width="500" height="500"></video>
      <div>fps:{{ fpsAll.base.toFixed(3) }}</div>
      <div>hand:{{ fpsAll.hand }}</div>
      <div>face:{{ fpsAll.face.toFixed(3) }}</div>
      <div>pose:{{ fpsAll.pose.toFixed(3) }}</div>
    </div>
    <div h-100 w-200 flex flex-wrap>
      <div v-for="categorie in categories" :key="categorie.index" w-40>
        <div>{{ categorie.categoryName }}</div>
        <div>{{ categorie.score.toFixed(8) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { FilesetResolver, HolisticLandmarker } from '@mediapipe/tasks-vision'
// vues
onMounted(() => {
  init()
  // window.$ObjLargeTemp.set('scene', scene)
})
onBeforeUnmount(() => {
  // scene && scene.dispose()
  // window.$ObjLargeTemp.delete('scene')
})
let categories = ref([]) as any
// 窗口
const width = 500
const height = 500
let landmarker: HolisticLandmarker
let video: HTMLVideoElement
async function init() {
  // 1加载MediaPipe模型
  landmarker = await loadMediapipeModels()
  // 2开启摄像头视频流加入landmarker
  streamWebcamThroughFaceLandmarker('videoDom')
}


class FpsShow {
  private fps: number
  private startTime: number
  private frameCount: number
  constructor() {
    this.fps = 0
    this.startTime = Date.now()
    this.frameCount = 0
  }
  update() {
    this.frameCount++
    const currentTime = Date.now()
    const elapsedTime = currentTime - this.startTime
    if (elapsedTime >= 1000) {
      this.fps = this.frameCount / (elapsedTime / 1000)
      this.startTime = currentTime
      this.frameCount = 0
    }
  }
  getFps() {
    return this.fps
  }
}

const baseFpsShow = new FpsShow()
const handFpsShow = new FpsShow()
const poseFpsShow = new FpsShow()
const faceFpsShow = new FpsShow()

const fpsAll = ref(
  {
    base: 0,
    hand: '0',
    pose: 0,
    face: 0
  }
)




/**
 * 1加载MediaPipe模型
 */
async function loadMediapipeModels() {
  // https://www.npmjs.com/package/@mediapipe/tasks-vision?activeTab=readme
  const vision = await FilesetResolver.forVisionTasks(
    // 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-16/wasm'
    '/jsLib/mediapipe/tasks-vision-0.10.17/wasm'
  )
  const landmarker = await HolisticLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath: `/jsLib/mediapipe/holistic_landmarker.task`,
        // delegate: "GPU"
      },
      runningMode: "VIDEO",
      // minPoseDetectionConfidence:0.3,
      outputFaceBlendshapes: true,
    });

  console.log('Loaded MediaPipe模型.')
  return landmarker
}

// 2开启摄像头视频流加入landmarker Stream webcam into landmarker loop (and also make video visible)
async function streamWebcamThroughFaceLandmarker(videoDom: string) {
  video = document.getElementById(videoDom) as HTMLVideoElement
  function onAcquiredUserMedia(stream: MediaStream) {
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
    }
  }
  try {
    const evt = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: width,
        height: height
      }
    })
    onAcquiredUserMedia(evt)
    video.requestVideoFrameCallback(onVideoFrame)
  } catch (e) {
    console.error(`Failed to acquire camera feed: ${e}`)
  }
}
/**
 * 单帧处理
 * @param time
 */
function onVideoFrame(time: any) {
  // 脸特征提取
  detectFaceLandmarks(time)
  video.requestVideoFrameCallback(onVideoFrame)
  baseFpsShow.update()
  fpsAll.value.base = baseFpsShow.getFps()
}

/**
 * 当前帧处理
 * @param {*} time
 * @returns
 */
function detectFaceLandmarks(time: any) {
  // 已加载人脸识别模型
  if (!landmarker) return
  // 对提供的视频帧执行人脸特征点检测
  let landmarks = landmarker.detectForVideo(video, time)


  // const faceLandmarks = landmarks.faceLandmarks
  const faceBlendshapes = landmarks.faceBlendshapes
  const leftHandLandmarks = landmarks.leftHandLandmarks
  const rightHandLandmarks = landmarks.rightHandLandmarks
  const poseLandmarks = landmarks.poseLandmarks

  if(faceBlendshapes&&faceBlendshapes.length>0){
    faceFpsShow.update()
    fpsAll.value.face = faceFpsShow.getFps()
  }
  const isL = leftHandLandmarks&&leftHandLandmarks.length>0
  const isR = rightHandLandmarks&&rightHandLandmarks.length>0

  if(isL||isR){
    handFpsShow.update()
    fpsAll.value.hand = handFpsShow.getFps().toFixed(3) +
     '__l:'+isL+'__r:'+isR
  }else{
    fpsAll.value.hand = handFpsShow.getFps().toFixed(3)
  }
  if(poseLandmarks&&poseLandmarks.length>0){
    poseFpsShow.update()
    fpsAll.value.pose = poseFpsShow.getFps()
  }

  //识别表情
  // if (faceBlendshapes && faceBlendshapes[0]) categories.value = faceBlendshapes[0].categories as any

}
</script>

<style scoped>
video {
  transform: scaleX(-1);
}
</style>
