<template>
  <div class="match">
    <div class="header">
      <div class="header-title">历史对局</div>
      <div class="right">
        <n-pagination v-model:page="page" size="small" :page-count="10" @update-page="hadnlePage" />
        <n-icon size="24" @click="close">
          <CloseCircleOutline />
        </n-icon>
      </div>
    </div>
    <n-spin :show="loading">
      <div class="match-list">
        <n-scrollbar height="500px">
          <div
            v-for="item in match_list"
            :key="item.game_id"
            class="match-list-item"
            :class="{
              current: current_match?.game_id == item.game_id
            }"
            @click="setCurrentMatch(item)"
          >
            <div class="affix" :class="item.is_win ? 'win' : 'fail'">
              {{ item.is_win ? '胜利' : '失败' }}
            </div>
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
              <n-space align="end" justify="space-between">
                <div class="score">
                  <n-tag :bordered="false" size="small" :type="item.is_win ? 'success' : 'error'">
                    {{ item.kills }}/{{ item.deaths }}/{{ item.assists }}
                  </n-tag>
                </div>
                <div class="summon">
                  <img :src="item.summon_1" />
                  <img :src="item.summon_2" />
                </div>
              </n-space>
            </div>
          </div>
        </n-scrollbar>
      </div>
    </n-spin>
    <div class="details">
      <Dateils :game-id="current_match?.game_id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { CurrentUserInfo, SummerMatch } from '@preload/index.d'
import { riotSotre } from '@renderer/src/store'
import { formatGameModel } from '@renderer/src/utils/format'
import { mathKDA } from '@renderer/src/utils/math'
import Dateils from './detaile.vue'
import dayjs from 'dayjs'
const user_info = window.store.getStore('user_info') as CurrentUserInfo
const summer_info = ref<SummerMatch>()
const riot_sotre = riotSotre()
const page = ref<number>(1)
const loading = ref<boolean>(false)
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
  summon_1?: string
  summon_2?: string
  game_id: number
}
const current_match = ref<MatchList>()
const match_list = ref<MatchList[]>([])
const formatData = (data: SummerMatch['games']['games']): MatchList[] => {
  console.log(data)
  return data?.map((game) => {
    const item = {
      hero_avatar: riot_sotre.getHeroAvatar(game.participants[0].championId),
      game_type: formatGameModel(game.queueId),
      is_win: game.participants[0].stats.win,
      kills: game.participants[0].stats.kills, // 击杀
      deaths: game.participants[0].stats.deaths, // 死亡
      assists: game.participants[0].stats.assists, // 助攻
      matchTime: dayjs(game.gameCreation).format('MM-DD'), // 对局时长
      kda: '',
      summon_1: riot_sotre.getSummonerIcon(game.participants[0].spell1Id)?.icon_src,
      summon_2: riot_sotre.getSummonerIcon(game.participants[0].spell2Id)?.icon_src,
      game_id: game.gameId
    }
    item['kda'] = mathKDA(item.kills, item.deaths, item.assists)
    return item
  })
}

const getSummer = async (): Promise<void> => {
  riot_sotre.heros.length == 0 && (await riot_sotre.initRiotData())
  try {
    loading.value = true
    const begIndex = (page.value - 1) * 9
    const endIndex = page.value * 9
    const result = (await window.lcu.getSummonerMatchHistory(user_info.puuid, {
      begIndex,
      endIndex
    })) as SummerMatch
    summer_info.value = result
    match_list.value = formatData(result.games.games)
    current_match.value = match_list.value[0]
  } catch (error) {
    console.log('🚀 ~ file: index.vue:25 ~ getSummer ~ error:', error)
  } finally {
    loading.value = false
  }
}
getSummer()

const hadnlePage = (): void => {
  getSummer()
}
const setCurrentMatch = (item: MatchList): void => {
  current_match.value = item
}
</script>
<style scoped lang="less">
.match {
  display: flex;
  height: 400px;
  position: relative;
  padding-top: 50px;
  .header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    .header-title {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      -webkit-app-region: drag;
      -webkit-user-select: none;
    }
    .right {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
  .details {
    flex: 1;
  }
}
.match-list {
  height: 500px;
}
.match-list-item {
  padding: 8px 6px 8px 16px;
  width: 220px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .affix {
    position: absolute;
    z-index: 99;
    left: 5px;
    top: 10px;
    padding: 2px 0;
    transform: rotate(-45deg);
    background-color: red;
    width: 30px;
    text-align: center;
    font-size: 8px;
    color: #fff;
    border-radius: 3px;
    &.win {
      background-color: #5383e8;
    }
    &.fail {
      background-color: #e84057;
    }
  }

  &.current {
    background-color: #eee;
  }
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
      display: flex;
      justify-content: space-between;
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
    .summon {
      display: flex;
      justify-content: space-between;
      img {
        margin-left: 4px;
        width: 18px;
        border-radius: 2px;
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
