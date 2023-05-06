<template>
  <div class="timer-container">
    <div class="timer-drag"></div>
    <div class="timer-values">数值</div>
  </div>
</template>
<script lang="ts" setup></script>
<style>
.timer-container {
}
.timer-drag {
  height: 30px;
  background-color: red;
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
.timer-values {
  height: 100%;
  color: #fff;
}
</style>
