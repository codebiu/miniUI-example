<template>
  <RouterLink :to=fun1Router.url v-for="fun1Router in routerThisArr.fun1" :key="fun1Router.url">
    {{ fun1Router.name }}
  </RouterLink>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const routerThisArr = reactive({
  fun1: [
    {
      ion: '',
      url: '/',
      name: 'first',
    },
    {
      ion: '',
      url: '/',
      name: 'first',
    },
    {
      ion: '',
      url: '/',
      name: 'first',
    },
    {
      ion: '',
      url: '/',
      name: 'first',
    },
    {
      ion: '',
      url: '/',
      name: 'first',
    },
  ]
})
</script>

<style></style>
