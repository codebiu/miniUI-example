<template>
  <div>
    <button @click="startListening">{{ isListening ? 'Stop Listening' : 'Start Listening' }}</button>
    <p>{{ userInput }}</p>
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
 * @summary      :语音输入打断vad
 * @description  :标准模板
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref, onMounted, onUnmounted } from 'vue';

////////////////////2_type_________////////////////////
type SpeechRecognitionType = typeof SpeechRecognition | typeof webkitSpeechRecognition;

////////////////////3_class________////////////////////
// 无需定义类

////////////////////4_obj__________////////////////////
const userInput = ref(''); // 存储用户的语音输入
const isListening = ref(false); // 是否正在监听语音
let recognition: SpeechRecognition | null = null; // 语音识别对象
let utterance: SpeechSynthesisUtterance | null = null; // 语音合成对象

////////////////////5_vue__________////////////////////
onMounted(() => {
  initSpeechRecognition();
});

onUnmounted(() => {
  stopListening();
});

////////////////////6_watch________////////////////////
// 无需 watch

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

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    userInput.value = `User said: ${transcript}`;
    stopSpeech(); // 用户说话时停止语音播放
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    isListening.value = false;
  };
};

// 开始语音识别和语音播放
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
  playSpeech('11111 Hello, how can I help you? 为了使用 Ruby 实现面向对象编程，您需要先学习如何在 Ruby 中创建对象和类。 在 Ruby 中，类总是以关键字 class 开始，后跟类的名称。类名的首字母应该大写。'); // 播放语音
};

// 停止语音识别和语音播放
const stopListening = () => {
  if (recognition) {
    recognition.stop();
  }
  stopSpeech();
  isListening.value = false;
};

// 播放语音
const playSpeech = (text: string) => {
  utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

// 停止语音播放
const stopSpeech = () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
};

////////////////////8_fetch________////////////////////
// 无需 fetch

////////////////////9_code_block___////////////////////
// 无需额外代码块

////////////////////_______________////////////////////
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  color: #333;
}
</style>