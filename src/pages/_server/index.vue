<template>
    <div>
        <SimpleHeader >{{admin}}</SimpleHeader>
    </div>
</template>

<script setup lang="ts">
import { i18n } from '@/i18n/language'


const admin = computed(() => i18n.global.t('admin'));
</script>

<style scoped>

</style>