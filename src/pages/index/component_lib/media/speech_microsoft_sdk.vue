<template>
  <div class="container">
    <!-- 右侧文本框显示ASR结果 -->
    <div class="right-panel">
      <textarea readonly v-model="asrOutput" placeholder="ASR results will appear here"></textarea>
      <div class="settings">
        <label for="silenceTimeout">间隔时间（ms）：</label>
        <input
          type="number"
          id="silenceTimeout"
          v-model.number="silenceTimeout"
          min="0"
          placeholder="输入间隔时间"
        />
      </div>
      <button @click="startListening">{{ isListening ? 'Stop Listening' : 'Start Listening' }}</button>
    </div>
  </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :speech_microsoft_sdk.vue
 * @Time         :2025/02/24 11:15:19
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :media
 * @summary      :微软asr sdk
 * @description  :标准模板
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref, onMounted, onUnmounted } from 'vue';
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
////////////////////2_type_________////////////////////

////////////////////4_obj__________////////////////////
// 存储TTS文本
const ttsText = ref(
  `随着Transformer在人工智能领域掀起了一轮技术革命，
越来越多的领域开始使用基于Transformer的网络结构。目前在语音识别领域中，Tranformer已经取代了传统ASR建模方式。
近几年关于ASR的研究工作很多都是基于Transformer的改进，本文将介绍其中应用较为广泛的几个former架构。`
);
const asrOutput = ref(''); // 存储ASR结果
const isListening = ref(false); // 是否正在监听语音
let silenceTimeout = ref(2000); // 静音检测计时器
let silenceTimer: string | number | NodeJS.Timeout | null | undefined = null; // 静音检测计时器
let recognizer = null as any;
////////////////////5_vue__________////////////////////
onMounted(() => {
  startListening();
});

onUnmounted(() => {
  stopListening();
});

////////////////////7_fuc__________////////////////////
// 初始化语音识别
const startListening = () => {
  isListening.value = true;
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "33ce2cd2893c4328afdee24cfeba051b", // 替换为你的订阅密钥
    "eastasia" // 替换为你的服务区域
  );
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizeOnceAsync(
    (result: { reason: SpeechSDK.ResultReason; text: string; errorDetails: string; }) => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        asrOutput.value = result.text;
      } else {
        console.error("识别失败: " + result.errorDetails);
      }
      stopListening();
    },
    (err: string) => {
      console.error("发生错误: " + err);
      stopListening();
    }
  );
};


// 停止语音识别
const stopListening = () => {
  isListening.value = false;
  recognizer.close();
};


</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.left-panel,
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>