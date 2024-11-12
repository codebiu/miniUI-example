<template>
  <div>
    <!-- 基础页面纸张 -->
    <!-- 混合仿纸质 1-->
    <ul grid grid-cols-1 md:grid-cols-6>
      <li>
        <div w-full class="aspect-[9/5] md:aspect-[9/16]">
          <div w-full h-full class="layer11"></div>
        </div>
        <p>
          <span>.layer1</span>
        </p>
      </li>
      <li>
        <div class="w-full aspect-[9/5] md:aspect-[9/16]">
          <div w-full h-full class="layer12"></div>
        </div>
        <p>
          <span>.layer1无混合</span>
        </p>
      </li>
      <li>
        <div w-full relative class="aspect-[9/5] md:aspect-[9/16]">
          <div w-full h-full absolute class="layer11"></div>
          <div w-full h-full mix-blend-overlay class="layer12"></div>
        </div>
        <p>
          <span>.layer1混合仿纸</span>
        </p>
      </li>
      <li>
        <div w-full relative class="aspect-[9/5] md:aspect-[9/16]">
          <div w-full h-full absolute class="layer21"></div>
          <div
            w-full
            h-full
            mix-blend-overlay
            bg-no-repeat
            bg-center
            bg-contain
            class="layer22"
          ></div>
        </div>
        <p>
          <span>.layer2混合仿纸</span>
        </p>
      </li>

      <li>
        <div w-full relative class="aspect-[9/5] md:aspect-[9/16]">
          <div w-full h-full absolute class="layer11-bg"></div>
          <div w-full h-full mix-blend-overlay class="layer12-bg"></div>
        </div>
        <p>
          <span>.layer1混合仿纸 颜色磨砂测试</span>
        </p>
      </li>
    </ul>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
// vue
onMounted(() => {})
onBeforeUnmount(() => {})
</script>

<style scoped>
.layer11 {
  background: hsl(40, 35%, 76%);
  /* background: hsl(68, 35%, 76%); */
}
.layer12 {
  box-shadow: inset 0 0 40px 10px hsla(0, 0%, 0%, 0.8);
  background: url('@/assets/lib/_dev/beauty/noise.webp'),
    linear-gradient(to bottom right, hsla(0, 0%, 0%, 0) 40%, hsla(0, 0%, 0%, 1));
}
/* 画混合 */

.layer21 {
  background: hsl(40, 35%, 76%);
}

.layer22 {
  box-shadow: inset 0 0 40px 10px hsla(0, 0%, 0%, 0.8);
  background-image: url('@/assets/lib/_dev/beauty/waves.webp'),
    linear-gradient(to bottom right, hsla(0, 0%, 0%, 0) 40%, hsla(0, 0%, 0%, 1));
}

/* 
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.layer1 {
  --img: url(https://garden.bradwoods.io/images/waves.webp);

  width: 100%;
  aspect-ratio: 1;

  filter: brightness(2) invert(1) grayscale(1);

  background-image: var(--img), var(--img), var(--img);
  background-size: cover;
  background-position: calc(50% - 1px) calc(50% - 1px),
    calc(50% + 1px) calc(50% + 1px), center;
  background-blend-mode: difference, screen;
} */
/* https://garden.bradwoods.io/notes/css/blend-modes */
/* background-repeat: repeat; */


.layer11-bg {
  background: rgb(18, 40, 106);
  /* background: hsl(68, 35%, 76%); */
}
.layer12-bg {
  box-shadow: inset 0 0 40px 10px hsla(0, 0%, 0%, 0.8);
  background: url('@/assets/lib/_dev/beauty/noise.webp'),
    linear-gradient(to bottom right, hsla(0, 0%, 0%, 0) 40%, hsla(0, 0%, 0%, 1));
}
</style>
