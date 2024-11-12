<template>
  <div full-fex bg-deep-3>
    <div>
      <video id="videoDom" width="500" height="500"></video>
      <div>fps:{{ fps.toFixed(3) }}</div>
    </div>
    <div h-100 w-200 flex flex-wrap>
      <div w-full>x y z visibility</div>
      <ul v-for="categorie in categories" :key="categorie.index" w-40>
        <li>{{ categorie.x.toFixed(4) }}</li>
        <li>{{ categorie.y.toFixed(4) }}</li>
        <li>{{ categorie.z.toFixed(4) }}</li>
        <li>{{ categorie.visibility.toFixed(4) }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision'
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
let landmarker: PoseLandmarker
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

const fpsShow = new FpsShow()

const fps = ref(0)


/**
 * 1加载MediaPipe模型
 */
async function loadMediapipeModels() {
  // https://www.npmjs.com/package/@mediapipe/tasks-vision?activeTab=readme
  const vision = await FilesetResolver.forVisionTasks(
    // 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-16/wasm'
    '/jsLib/mediapipe/tasks-vision-0.10.17/wasm'
  )
  const landmarker = await PoseLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        // modelAssetPath: `/jsLib/mediapipe/pose_landmarker_lite.task`,
        modelAssetPath: `/jsLib/mediapipe/pose_landmarker_heavy.task`,
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numPoses: 1,
      minPoseDetectionConfidence: 0.5,
      minPosePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5
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
  fpsShow.update()
  fps.value = fpsShow.getFps()
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
  const landmarks = landmarker.detectForVideo(video, time)

  // 身体特征点
  const landmarks_local = landmarks.landmarks
  // const worldLandmarks = landmarks.worldLandmarks
  if (landmarks_local && landmarks_local[0]) categories.value = landmarks_local[0] as any

  // console.log(blendshapes)
}
</script>

<style scoped>
video {
  transform: scaleX(-1);
}
</style>
