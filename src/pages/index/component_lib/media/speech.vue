<template>
  <div class="container">
    <!-- 左侧文本框和播放按钮 -->
    <div class="left-panel">
      <textarea v-model="ttsText" placeholder="Enter text to play TTS"></textarea>
      <button @click="playTTS">Play TTS</button>
    </div>

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
 * @File         :speech.vue
 * @Time         :2025/02/24 11:15:19
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :media
 * @summary      :语音输入打断
 * @description  :标准模板
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref, onMounted, onUnmounted } from 'vue';

////////////////////2_type_________////////////////////
type SpeechRecognitionType = typeof SpeechRecognition | typeof webkitSpeechRecognition;

////////////////////4_obj__________////////////////////
// 存储TTS文本
const ttsText = ref(
  `随着Transformer在人工智能领域掀起了一轮技术革命，
越来越多的领域开始使用基于Transformer的网络结构。目前在语音识别领域中，Tranformer已经取代了传统ASR建模方式。
近几年关于ASR的研究工作很多都是基于Transformer的改进，本文将介绍其中应用较为广泛的几个former架构。`
);
const asrOutput = ref(''); // 存储ASR结果
const isListening = ref(false); // 是否正在监听语音
let recognition: SpeechRecognitionType | null = null; // 语音识别对象
let utterance: SpeechSynthesisUtterance | null = null; // 语音合成对象
let silenceTimeout = ref(2000); // 静音检测计时器
let silenceTimer: string | number | NodeJS.Timeout | null | undefined = null; // 静音检测计时器
////////////////////5_vue__________////////////////////
onMounted(() => {
  initSpeechRecognition();
});

onUnmounted(() => {
  stopListening();
});

////////////////////7_fuc__________////////////////////
// 初始化语音识别
const initSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error('Speech Recognition is not supported in this browser.');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true; // 持续监听
  recognition.interimResults = true; // 获取中间结果
  // recognition.lang = 'ja-JP'; // 设置语言为日语

  let transcriptOld = '';
  recognition.onresult = (event: SpeechRecognitionType) => {
    const result = event.results[event.resultIndex]
    const transcript = result[0].transcript;  
    if (result.isFinal) {
      transcriptOld = transcriptOld + transcript
      asrOutput.value= transcriptOld + ' (Final)';
       
    } else {
      asrOutput.value= transcriptOld + transcript + ' (Interim)';
    }

    // 防抖 重置静音检测计时器
    if (silenceTimer) {
      clearTimeout(silenceTimer);
    }
    silenceTimer = setTimeout(() => {
      console.log('静音时间超过设定值，作为当前结果语音识别');
      transcriptOld = '';
      // 当前结果
      // asrOutput.value
    }, silenceTimeout.value);
    stopSpeech(); // 用户说话时停止语音播放
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended.');
    isListening.value = false;
  };
};

// 开始语音识别
const startListening = () => {
  if (!recognition) {
    console.error('Speech recognition is not initialized.');
    return;
  }

  if (isListening.value) {
    stopListening();
    return;
  }

  recognition.start(); // 开始语音识别
  isListening.value = true;
};

// 停止语音识别
const stopListening = () => {
  if (recognition) {
    recognition.stop();
  }
  stopSpeech();
  isListening.value = false;
};

// 播放TTS
const playTTS = () => {
  if (ttsText.value.trim()) {
    utterance = new SpeechSynthesisUtterance(ttsText.value);
    speechSynthesis.speak(utterance);
  }
};

// 停止语音播放
const stopSpeech = () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
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