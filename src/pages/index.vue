<template>
  <div full-flex flex-col>
    <SysHeader h-14 bg-deep-1 z-11 shadow />
    <main grow bg-deep-1 px-1 py-2>
      <router-view></router-view>
    </main>
    <SysFooter mx-auto w-full p-2 lg:py-2 bg-deep-0 z-11 />
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped></style>
