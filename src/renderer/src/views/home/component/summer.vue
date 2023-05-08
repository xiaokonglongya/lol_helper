<template>
  <div class="summer">
    <h1>Summer</h1>
    <!-- {{ games }} -->
    <!-- {{ opgg_store.heros }} -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CurrentUserInfo, SummerMatch } from '@preload/index.d'
import { computed } from 'vue'
import { opggStore } from '@renderer/src/store'
const user_info = window.store.getStore('user_info') as CurrentUserInfo
const summer_info = ref<SummerMatch>()
const opgg_store = opggStore()
// const getSummer = async (): Promise<void> => {
//   const result = (await window.lcu.getSummonerMatchHistory(user_info.puuid)) as SummerMatch
//   console.log('🚀 ~ file: summer.vue:15 ~ getSummer ~ result:', result)
//   summer_info.value = result
// }
// getSummer()

const games = computed(() => summer_info.value?.games?.games)

const formatGameInfo = (data) => {
  const champImg = `/lol-game-data/assets/v1/champion-icons/`
}
</script>
