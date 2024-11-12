import videojs from 'video.js';
import 'video.js/dist/video-js.min.css'
import type Player from 'video.js/dist/types/player';
/**
 * 媒体输入和展示
 * 1 图片 视频
 * 2 采集设备:摄像头 音频输入 音频输出
 *  <video ref="videoDom" absolute z-1 w-300px h-200px bg-deep-3></video>
 */
class Media {
    videoDom: HTMLVideoElement;
    audioinputList: MediaDeviceInfo[] = [];
    audiooutputList: MediaDeviceInfo[] = [];
    videoinputList: MediaDeviceInfo[] = [];
    mediaStream: MediaStream | null = null
    videoPalyer: Player | null = null;
    isPlaying = false;
    constructor(videoDom: HTMLVideoElement) {
        this.videoDom = videoDom;
    }

    /**
     * 获取当前支持媒体
     * @returns 
     */
    async getMediaDevices() {
        // 初始化设备列表
        this.audioinputList = [];
        this.audiooutputList = [];
        this.videoinputList = [];
        const constraints = {
            audio: true,
            video: true,
            // video: {
            //     facingMode: 'user',
            //     width: width,
            //     height: height
            //   }
        };
        // 获取视频和麦克风权限
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!mediaStream) return;
        // 收集视频和麦克风
        const devices = await navigator.mediaDevices.enumerateDevices();
        devices.forEach((device: MediaDeviceInfo) => {
            // audioinput麦克风|话筒 audiooutput 扬声器|音响 videoinput 摄像头|相机
            switch (device?.kind) {
                case 'audioinput':
                    this.audioinputList.push(device);
                    break;
                case 'audiooutput':
                    this.audiooutputList.push(device);
                    break;
                case 'videoinput':
                    this.videoinputList.push(device);
                    break;
                default:
                    // console.log('当前可用的媒体设备: ', device);
                    break;
            }
        });
    };


    /**
     * 根据设备id获取流
     * @param audioSourceId this.videoinputList[0].deviceId
     * @param videoSourceId 
     */
    async getMediaByDeviceId(audioSourceId?: string | null, videoSourceId?: string | null) {
        this.mediaClose()
        if (!audioSourceId && !videoSourceId) return
        // 0为禁止
        const displayMediaOptions: DisplayMediaStreamOptions = {
            audio: false,
            video: false
        };
        if (audioSourceId) displayMediaOptions.audio = {
            deviceId: audioSourceId,
            // 音频采样率
            sampleRate: 44100,
            // 音频声道数
            channelCount: 2,
            // 回声消除
            echoCancellation: true,
            // 降噪
            noiseSuppression: true,
        } as MediaTrackConstraints

        if (videoSourceId) displayMediaOptions.video = {
            // 摄像头id
            deviceId: videoSourceId,
            // 摄像头宽高
            width: this.videoDom.clientWidth,
            height: this.videoDom.clientHeight,
            // acingMode: 'environment', // 调用前置摄像头  'user',//后置pc默认两个都是
        } as MediaTrackConstraints
        // this.videoinputList[0].deviceId
        this.mediaStream = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
        this.videoDom.srcObject = this.mediaStream

        // this.videoPalyer!.src({ type: 'video/webm;codecs=vp8,opus', srcObject: this.mediaStream });
        return this.mediaStream
    }

    async getMediaByVideoFile(type?: string, src?: string) {
        this.videoPalyer = videojs(
            this.videoDom,
            {
                width: 10,
                height: 10,
                controls: true,
                playsinline: true,
                bigPlayButton: true,
                controlBar: true
            }
        )
        this.videoPalyer!.src({ type: type || "video/mp4", src: src || '/data/jntm_new1.mp4' });


        this.videoPalyer.on('loadedmetadata', () => {
            const duration = this.videoPalyer!.duration() as number // 获取视频的完全时间（单位：秒）
            // 取整帧 30fps
            // timeAllF.value = Math.floor(duration * f2s)
            // alert(duration)
            //  console.log(duration) // 输出到控制台
        })
        this.videoPalyer.on('play', () => {
            this.isPlaying = true;
        })
        this.videoPalyer.on('pause', () => {
            this.isPlaying = false;
        })
        this.videoPalyer.on('ended', () => {
            this.isPlaying = false;
        })
    }


    mediaClose() {
        if (this.mediaStream) {
            // 获取媒体流中的音视频track
            const tracks = this.mediaStream.getTracks();
            // 遍历音视频track，停止播放
            tracks.forEach((track) => track.stop());
        }

        // // 设置视频元素的srcObject为空
        // dom!.srcObject = null;
    };

    /**
     * 关联dom和媒体流
     * @param videoDom 
     */
    connectMedia2Dom() {
        return new Promise<void>((resolve) => {
            // this.videoDom.srcObject = this.mediaStream

            // oncanplaythrough
            this.videoDom.onloadedmetadata = () => {
                resolve();
            }
            this.videoDom.onplay = () => {
                this.isPlaying = true;
            }
            this.videoDom.onpause = () => {
                this.isPlaying = false;
            }
            this.videoDom.onended = () => {
                this.isPlaying = false;
            }
        })
    }




    /**
     * websocket流
     * @param stream this.mediaStream
     */
    wsStream(stream: MediaStream, ws: WebSocket) {
        const format = 'video/webm;codecs=h264';
        const allChunks = [] as any;
        let recorderCamera = null as null | MediaRecorder;
        if (recorderCamera) {
            recorderCamera.stop();
            recorderCamera = null;
        }
        // 创建录制器
        recorderCamera = new MediaRecorder(stream, {
            mimeType: format,
        });
        recorderCamera.ondataavailable = (e) => {
            allChunks.push(e.data);
            if (!ws) {
                console.log('ws 未连接');
                return;
            }
            ws.send(e.data);

            // 暂不考虑固定块大小
            {
                // let SLICE_SIZE = 1024;
                // const fileSize = e.data.size;
                // // 判断文件大小是否超过分片大小
                // if (fileSize > SLICE_SIZE) {
                //   // 计算需要分几份
                //   let sliceCount = Math.ceil(fileSize / SLICE_SIZE);
                //   for (let i = 0; i < sliceCount; ++i) {
                //     // 计算分片起始位置
                //     let start = i * SLICE_SIZE;
                //     // 计算分片结束位置
                //     let end = start + SLICE_SIZE;
                //     // 最后一片特殊处理
                //     if (end > fileSize) {
                //       end = fileSize;
                //     }
                //     let newBlob = e.data.slice(start + 1, end);
                //     // balabala 业务代码
                //     // allChunks.push(e.data);
                //     userSetting.ws.send(newBlob);
                //     console.log('数据子批次', temp2++, sliceCount);
                //   }
                //   console.log('数据批次', temp1++);
                // }
            }
        };
        recorderCamera.start(500);
        // return allChunks;
    };


    referesh() {

    }
    destroy() {

    }
}

export { Media };