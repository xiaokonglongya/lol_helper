<template>
  <div class="match-details">
    <div v-for="item in teams" :key="item.teamId" class="team">
      <div v-for="player in item.players" :key="player.championId" class="player-info">
        <div class="avatar">
          <n-avatar :size="34" :src="player.hero_avatar" />
        </div>
        <div class="info">
          <div class="player-info-title">
            {{ player.details.summonerName }}
          </div>
          <div class="kda">
            {{ player.stats.kills }}/{{ player.stats.deaths }}/{{ player.stats.assists }}
          </div>
          <div class="summon">
            <template v-for="item in 2">
              <img
                v-if="player[`spell${item}Id`]"
                :key="item"
                :src="riot_store.getSummonerIcon(player[`spell${item}Id`])?.icon_src"
              />
            </template>
          </div>
          <div class="equips">
            <div v-for="equip in 6" :key="equip" class="equip">
              <div class="image-box">
                <img
                  v-if="player.stats['item' + equip]"
                  :src="riot_store.getEquipmentIcon(player.stats['item' + equip]).icon_src"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'
import { SummerDetails } from '@preload/index.d'
import { riotSotre } from '@renderer/src/store'
const riot_store = riotSotre()
const props = defineProps<{
  gameId?: number
}>()
watch(
  () => props.gameId,
  () => {
    console.log('获取游戏详情')
    getData()
  }
)

const teams = ref<MatchTeam[]>([])
const getData = async (): Promise<void> => {
  if (!props.gameId) return
  const result = await window.lcu.getMatchDateilsByGameId(props.gameId)
  teams.value = formatTeam(result)
  console.log('🚀 ~ file: detaile.vue:19 ~ getData ~ result:', result)
}
type MatchTeam = {
  teamId: number
  players: Array<
    {
      details: SummerDetails['participantIdentities'][0]['player']
      hero_avatar: string
    } & SummerDetails['participants'][0]
  >
  win: 'Win' | 'Fail' | undefined
}
const formatTeam = (matchs: SummerDetails): MatchTeam[] => {
  const teamIds = [...new Set(matchs.participants.map((item) => item.teamId))]
  const teams = teamIds.map((id) => {
    const item: MatchTeam = {
      teamId: id,
      players: matchs.participants
        .filter((item) => {
          return item.teamId == id
        })
        .map((item) => {
          return {
            ...item,
            hero_avatar: riot_store.getHeroAvatar(item.championId),
            details: matchs.participantIdentities.find(
              (player) => player.participantId == item.participantId
            )!.player
          }
        }),
      win: matchs.teams.find((item) => item.teamId == id)?.win
    }
    return item
  })
  console.log(teams)
  return teams
}
</script>
<style lang="less" scoped>
.match-details {
  padding: 10px 20px;
  height: 100%;
  display: flex;
  gap: 20px;
  .team {
    flex: 1;
  }
  .player-info {
    display: flex;
    .info {
      margin-left: 10px;
      .player-info-title {
        font-size: 12px;
        color: #999;
      }
      .equips {
        display: flex;
        gap: 3px;
        .image-box {
          width: 22px;
          height: 22px;
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid #eee;
        }
        img {
          display: block;
          width: 100%;
          border-radius: 3px;
          overflow: hidden;
        }
      }

      .summon {
        display: flex;
        gap: 3px;
        img {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
