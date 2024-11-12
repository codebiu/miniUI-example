<template>
  <div>setTimeoutSync 放在异步队列里执行</div>
</template>

<script setup lang="ts">
const seTimeoutSync = (fn: Function, ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
      resolve(ms)
    }, ms)
  })
}
const main = async () => {
  console.log('Starting...')
  await seTimeoutSync(() => {
    console.log('Done waiting 3s')
  }, 3000)
  for (var i = 0, len = 2; i < len; i++) {
    console.log('loop ' + i)
    await seTimeoutSync(() => {
      console.log('Done waiting ' + (i + 1) + 's')
    }, 1000)
  }
}
main()

console.log('主线程end')
</script>
<style scoped></style>
