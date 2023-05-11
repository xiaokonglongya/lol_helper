<template>
  <div class="match-details">
    <n-scrollbar>
      <div
        v-for="item in teams"
        :key="item.teamId"
        class="team"
        :class="[item.teamId === 100 ? 'bg-blue-100' : 'bg-red-100']"
      >
        <div class="team-header bg-slate-50 px-2.5">
          <div class="name text-xs flex flex-1 items-center">
            {{ item.teamId === 100 ? '蓝队' : '红队' }}
            <span :class="[item.win === 'Win' ? 'text-blue-500' : 'text-red-500']">
              {{ item.win === 'Win' ? '胜利' : '失败' }}
            </span>
          </div>
          <div class="kda text-xs text-gray-600 w-14 flex justify-center">KDA</div>
          <div class="damage text-xs text-gray-600 w-24 flex justify-center">伤害</div>
          <div class="eyes text-xs text-gray-600 w-12 flex justify-center">眼</div>
          <div class="soldier text-xs text-gray-600 w-16 flex justify-center grow-0">补兵数</div>
          <div class="equips flex text-xs text-gray-600 w-40 flex justify-center grow-0">物品</div>
        </div>
        <div class="team-player">
          <div v-for="player in item.players" :key="player.championId" class="player-info">
            <div
              class="player px-2.5 py-1.5 flex items-center"
              :class="[
                isOwn(player.details.puuid)
                  ? item.teamId === 100
                    ? 'bg-blue-400'
                    : 'bg-red-400'
                  : ''
              ]"
            >
              <div class="info flex flex-start flex-auto">
                <div class="avatar flex items-center w-8">
                  <n-avatar round :size="28" :src="player.hero_avatar" />
                </div>
                <div class="summon mx-1 flex flex-col w-4 gap-y-0.5 items-center">
                  <template v-for="item in 2">
                    <img
                      v-if="player[`spell${item}Id`]"
                      :key="item"
                      :src="riot_store.getSummonerIcon(player[`spell${item}Id`])?.icon_src"
                    />
                  </template>
                </div>
                <div class="flex-auto text-gray-600 text-xs">
                  {{ player.details.summonerName }}
                </div>
              </div>
              <div class="kda text-xs text-gray-800 w-14">
                {{ player.stats.kills }}/{{ player.stats.deaths }}/{{ player.stats.assists }}
              </div>
              <div class="damage text-xs w-24 flex justify-center">伤害</div>
              <div class="eyes text-xs w-12 flex justify-center">眼</div>
              <div class="soldier text-xs w-16 flex justify-center">补兵数</div>
              <div class="equips w-40 gap-y-0.5 flex items-center justify-center">
                <div v-for="equip in 6" :key="equip">
                  <n-popover trigger="hover">
                    <template #trigger>
                      <div class="image-box">
                        <img
                          v-if="player.stats['item' + (equip - 1)]"
                          :src="
                            riot_store.getEquipmentIcon(player.stats['item' + (equip - 1)]).icon_src
                          "
                        />
                      </div>
                    </template>
                    <EquipmentCard :id="player.stats['item' + (equip - 1)]" />
                  </n-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'
import { SummerDetails } from '@preload/index.d'
import { riotSotre } from '@renderer/src/store'
import EquipmentCard from '@renderer/src/components/EquipmentCard.vue'
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
  console.log(riot_store.getEquipmentIcon(3072))
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
const isOwn = (puuid: string): boolean => {
  return puuid === window.store.getStore('user_info')?.puuid
}
const formatTeam = (matchs: SummerDetails): MatchTeam[] => {
  const teamIds = [...new Set(matchs.participants.map((item) => item.teamId))].sort(
    (first_team_id): number => {
      const owner = matchs.participantIdentities.find((item) => isOwn(item.player.puuid))
      const owner_team = matchs.participants.find(
        (match) => match.participantId === owner?.participantId
      )
      // 让自己的队伍永远是第一个队伍
      if (owner_team?.teamId == first_team_id) {
        return -1
      }
      return 0
      // return owner_id
    }
  )
  console.log(teamIds)
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
  return teams
}
</script>
<style lang="less" scoped>
.match-details {
  padding: 5px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  gap: 20px;
  .team {
    border-radius: 5px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    .team-header {
      display: flex;
      height: 40px;
      align-items: center;
    }
    .team-player {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex: 1;
      .player-info {
        display: flex;
        flex: 1;
        align-items: center;
        width: 100%;
        .player {
          width: 100%;
        }

        .summon {
          img {
            width: 16px;
            height: 16px;
            border-radius: 3px;
            overflow: hidden;
          }
        }
        .equips {
          gap: 2px;
          .image-box {
            width: 22px;
            height: 22px;
            border-radius: 3px;
            overflow: hidden;
            border: 1px solid #eee;
            cursor: pointer;
          }
          img {
            display: block;
            width: 100%;
            border-radius: 3px;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
