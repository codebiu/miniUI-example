<template>
    <div flex>
      <!-- 对话 -->
      <div h-full w-300 bg-deep-2>
        <!-- 聊天窗口内 -->
        <div h-full mx-5 mt-10 rounded-5 relative>
          <!-- 单句 -->
          <div p-4 class="h-23/24" overflow-hidden>
            <div w-full h-full overflow-y-auto>
              <div ref="chatRef" p-5>
                <!-- 显示动画 -->
                <TransitionGroup name="list">
                  <!-- 循环 audio2Face.userSetting.chatInfos 生成对应 -->
                  <div v-for="item in chatInfos" :key="item.url" flex items-start gap-2.5 mt-1 mb-5
                    :class="item.id == 0 && 'flex-row-reverse w-full'">
                    <img class="w-8 h-8 rounded-full" v-if="item.id == 1" :src="aiSvg" alt="Jese image" />
                    <div flex flex-col :class="item.id == 0 ? 'bg-deep-3' : 'bg-deep-1 flex-row-reverse w-full'" max-w-full
                      leading-1.5 p-4 border-gray-200 rounded-xl>
                      <!-- 文字 -->
                      <p text-sm font-normal py-2.5 v-if="item.textMessage">{{
                        item.textMessage }}</p>
                    </div>
  
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>
          <!-- 输入 -->
          <div w-200 absolute bottom-15 left-0 right-0 m-auto flex items-center justify-center pointer-default>
            <div class="flex" w-full h-10>
              <input chatType="text" id="website-admin" w-full text-sm p-2.5 bg-deep-1 hover:border-blue-4 rounded-l-lg
                placeholder="文字输入" v-model="keyboardInputValue" />
  
              <!-- 发送 -->
              <span pointer-default w-15 inline-flex items-center justify-center px-3 hover:border-blue-4 active:bg-deep-2
                bg-deep-3 @click="sendMessage">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke-gray-400 fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18L5 21L12 3L19 21L12 18ZM12 18V13" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
              <!-- 回退清空 文字和语言-->
              <span pointer-default w-15 inline-flex items-center justify-center px-3 hover:border-blue-4 active:bg-deep-2
                bg-deep-3 rounded-r-lg @click="clearMessage">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke-gray-400 fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 9L9 15M9 9L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>tttttttttttttttttest</div>
    </div>
  </template>
  <script setup lang="ts">
  import aiSvg from '@/assets/img/person.svg';
  const chatInfos = ref([
    {
      id: 1,
      textMessage: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 1,
      chatType: '',
      textMessage: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
  
    },
    {
      id: 0,
      chatType: '',
      textMessage: '噢噢噢噢噢噢噢噢噢噢噢噢噢',
    },
  
  ]) as any;
  /**
   * @description: RAG QA
   */
  // 发送消息
  const keyboardInputValue = ref(''); //
  
  //清空消息
  const clearMessage = () => {
    keyboardInputValue.value = '';
  };
  
  /**
    * 提交文字和语音
    */
  const sendMessage = () => {
    if (keyboardInputValue.value) {
      // 发送消息
      chatInfos.value.push(
        {
          id: 0,
          chatType: '',
          textMessage: keyboardInputValue.value,
        })
      gotoChat();
      // 清空输入框
      keyboardInputValue.value = '';
    }
  }
  
  
  ////////////////////////////////////工具类
  // 聊天框  输入和读取时自动下拉 滚动
  const chatRef = ref<HTMLElement>();
  /**
   * 下拉到最新信息
   */
  const gotoChat = () => {
    setTimeout(() => {
      if (!chatRef.value) return;
      chatRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 10);
  };
  
  
  </script>
  <style scoped></style>