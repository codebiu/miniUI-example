import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision'

class LandMarkManager {
    landmarker: PoseLandmarker | null = null;
    constructor() {
    }

    /**
     * 加载MediaPipe模型
     */
    async getLandMarkerPose() {
        // https://www.npmjs.com/package/@mediapipe/tasks-vision?activeTab=readme
        const vision = await FilesetResolver.forVisionTasks(
            // 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-16/wasm'
            '/jsLib/mediapipe/tasks-vision-0.10.17/wasm'
        )
        this.landmarker = await PoseLandmarker.createFromOptions(
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
    }

    /**
     * 当前帧处理
     * @param {*} time
     * @returns
     */
    detectPose(video: HTMLVideoElement,time: any) {
        // 已加载人脸识别模型
        if (!this.landmarker) return
        // 对提供的视频帧执行人脸特征点检测
        const landmarks = this.landmarker.detectForVideo(video, time)
        // 身体特征点
        // const landmarks_local = landmarks.landmarks[0]
        const landmarks_local = landmarks.worldLandmarks[0]
        return landmarks_local
    }


}

export {LandMarkManager}