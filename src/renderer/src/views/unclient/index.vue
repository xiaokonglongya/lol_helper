<template>
  <div class="unline">
    <div class="animation">
      <div class="sk-wave">
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
      </div>
    </div>
    <n-h style="margin-top: 20px">正在检查客户端...</n-h>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
@import url('spinkit/spinkit.css');
body {
  margin: 0;
}
.unline {
  width: 300px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
