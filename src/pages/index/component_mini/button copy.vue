<template>
    
    <div flex flex-col>
        <ButtonSwitch p-2 />
        <button w-20 h-20 bg-deep-09 class="button-svg"></button>
    </div>
</template>
  
<script lang="ts" setup>

</script>

<style scoped>
/* 坐标的数目变形前后必须一致。 */
.button-svg {
  border-radius: 0.1rem 0.5rem 0.1rem 4rem;
  clip-path: polygon(0% 0%,
      100% 0%,
      100% 100%,
      90% 90%,
      80% 80%,
      70% 70%,
      60% 60%,
      50% 50%,
      40% 40%,
      30% 30%,
      20% 20%,
      10% 10%);
  transition: clip-path 0.5s ease-in-out;
}

/* hover */
.button-svg:hover {
  clip-path: polygon(0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      80% 60%,
      0% 70%,
      0% 60%,
      0% 50%,
      0% 40%,
      0% 30%,
      0% 20%,
      0% 10%);
}


</style>