<template>
  <div class="match">
    <div class="match-list">
      <n-scrollbar height="500px">
        <div v-for="item in match_list" :key="item.matchTime" class="match-list-item">
          <div class="avatar">
            <n-avatar :size="44" :src="item.hero_avatar" />
          </div>
          <div class="info">
            <n-space>
              <div class="title">
                {{ item.game_type }}
              </div>
              <n-tag :bordered="false" size="small">
                {{ item.matchTime }}
              </n-tag>
            </n-space>
            <div style="height: 4px"></div>
            <n-space>
              <div class="score">
                <n-tag :bordered="false" size="small" :type="item.is_win ? 'success' : 'error'">
                  {{ item.kills }}/{{ item.deaths }}/{{ item.assists }}
                </n-tag>
              </div>
            </n-space>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CurrentUserInfo, SummerMatch } from '@preload/index.d'
import { opggStore } from '@renderer/src/store'
import { formatGameModel } from '@renderer/src/utils/format'
import { mathKDA } from '@renderer/src/utils/math'
import dayjs from 'dayjs'
const user_info = window.store.getStore('user_info') as CurrentUserInfo
const summer_info = ref<SummerMatch>()
const opgg_store = opggStore()

const close = (): void => {
  window.page.closeMatchWindow()
}
interface MatchList {
  hero_avatar: string
  game_type: string
  is_win: boolean
  kills: number
  deaths: number
  assists: number
  matchTime: string
  kda: string
}
const match_list = ref<MatchList[]>([])
const formatData = (data: SummerMatch['games']['games']): MatchList[] => {
  console.log(data)
  return data?.map((game) => {
    const item = {
      hero_avatar: opgg_store.getHeroAvatar(game.participants[0].championId),
      game_type: formatGameModel(game.queueId),
      is_win: game.participants[0].stats.win,
      kills: game.participants[0].stats.kills, // 击杀
      deaths: game.participants[0].stats.deaths, // 死亡
      assists: game.participants[0].stats.assists, // 助攻
      matchTime: dayjs(game.gameCreation).format('MM-DD'), // 对局时长
      kda: ''
    }
    item['kda'] = mathKDA(item.kills, item.deaths, item.assists)
    return item
  })
}

const getSummer = async (): Promise<void> => {
  opgg_store.heros.length == 0 && (await opgg_store.getHeros())
  try {
    console.log(user_info)
    const result = (await window.lcu.getSummonerMatchHistory(user_info.puuid, {
      begIndex: 0,
      endIndex: 10
    })) as SummerMatch
    summer_info.value = result
    match_list.value = formatData(result.games.games)
  } catch (error) {
    console.log('🚀 ~ file: index.vue:25 ~ getSummer ~ error:', error)
  }
}
getSummer()
</script>
<style scoped lang="less">
.title {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
.match-list-item {
  //   background-color: blue;
  padding: 8px 0;
  width: 190px;
  display: flex;
  align-items: center;
  margin: 0px 13px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  .avatar {
    display: flex;
    align-items: center;
  }
  .info {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .score {
      ::v-deep(.n-tag) {
        width: 60px;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }

    .time {
      ::v-deep(.n-tag) {
        width: 50px;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }
  }
  .title {
    color: #333;
    font-size: 14px;
    width: 70px;
  }
  .kda {
    ::v-deep(.n-tag) {
      width: 60px;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 10px;
      color: #999;
    }
  }
}
</style>
