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
          <div class="name flex flex-1 items-center text-xs">
            {{ item.teamId === 100 ? '蓝队' : '红队' }}
            <span :class="[item.win === 'Win' ? 'text-blue-500' : 'text-red-500']">
              {{ item.win === 'Win' ? '胜利' : '失败' }}
            </span>
          </div>
          <div class="kda flex w-14 justify-center text-xs text-gray-600">KDA</div>
          <div class="damage flex w-24 justify-center text-xs text-gray-600">伤害</div>
          <div class="eyes flex w-12 justify-center text-xs text-gray-600">视野</div>
          <div class="soldier flex w-12 grow-0 justify-center text-xs text-gray-600">补兵数</div>
          <div class="equips flex w-40 grow-0 justify-center text-xs text-gray-600">物品</div>
        </div>
        <div class="team-player">
          <div v-for="player in item.players" :key="player.championId" class="player-info">
            <div
              class="player flex items-center px-2.5 py-1.5"
              :class="[
                isOwn(player.details.puuid)
                  ? item.teamId === 100
                    ? 'bg-blue-400'
                    : 'bg-red-400'
                  : ''
              ]"
            >
              <div class="info flex-start flex flex-auto items-center">
                <div class="avatar mx-0.5 flex items-center">
                  <img class="w-8 rounded-sm" :src="player.hero_avatar" />
                </div>
                <div class="summon mx-0.5 flex flex-col items-center gap-y-0.5">
                  <template v-for="spellId in [1, 2]">
                    <img
                      v-if="player[`spell${spellId}Id`]"
                      :key="spellId"
                      :src="riot_store.getSummonerIcon(player[`spell${spellId}Id`])?.icon_src"
                    />
                  </template>
                </div>
                <div class="perk mx-0.5 flex flex-col items-center gap-y-0.5">
                  <img
                    class="w-5"
                    :src="riot_store.getRuneIcon(player['stats']['perk0'])?.icon_src"
                  />
                  <img
                    class="w-3"
                    :src="riot_store.getRuneStyleIcon(player['stats']['perkSubStyle'])?.icon_src"
                    alt=""
                  />
                </div>
                <div class="flex flex-auto flex-col text-gray-600">
                  <div class="text-[11px]">
                    {{ player.details.summonerName }}
                  </div>
                  <div class="rank_level flex items-center text-[10px] text-gray-700">
                    <template v-if="player.ranked">
                      {{ getRankLevel(player.ranked) }}
                    </template>
                  </div>
                </div>
              </div>
              <div class="kda flex w-14 items-center justify-center text-[10px] text-gray-800">
                {{ player.stats.kills }}/{{ player.stats.deaths }}/{{ player.stats.assists }}
              </div>
              <div class="damage flex w-24 justify-center gap-1 text-xs">
                <div class="flex flex-1 flex-col items-end">
                  <span class="text-[10px] text-red-500">{{ player.stats.totalDamageDealt }}</span>
                </div>
                <div class="flex flex-1 flex-col items-start">
                  <span class="text-[10px] text-blue-500">{{ player.stats.totalDamageTaken }}</span>
                </div>
              </div>
              <div class="eyes flex w-12 justify-center text-[10px]">
                {{ player.stats.wardsKilled }} / {{ player.stats.wardsPlaced }}
              </div>
              <div class="soldier flex w-12 justify-center text-[10px]">
                {{ player.stats.totalMinionsKilled }}
              </div>
              <div class="equips flex w-40 items-center justify-center gap-y-0.5">
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
import { SummerDetails, RankedInfo } from '@preload/index.d'
import { riotSotre } from '@renderer/src/store'
import EquipmentCard from '@renderer/src/components/EquipmentCard.vue'
import { formatLevel } from '@renderer/src/utils/format'
const riot_store = riotSotre()
const props = defineProps<{
  gameId?: number
}>()

watch(
  () => props.gameId,
  () => {
    getData()
  }
)
type MatchTeam = {
  teamId: number
  players: Array<
    {
      details: SummerDetails['participantIdentities'][0]['player']
      hero_avatar: string
      ranked?: RankedInfo
    } & SummerDetails['participants'][0]
  >
  win: 'Win' | 'Fail' | undefined
}
const teams = ref<MatchTeam[]>([])
const getDatail = ref<SummerDetails>()
const getData = async (): Promise<void> => {
  if (!props.gameId) return
  const result = await window.lcu.getMatchDateilsByGameId(props.gameId)
  console.log(result, '2')
  getDatail.value = result
  const _teams = formatTeam(result)
  for (let i = 0; i < _teams.length; i++) {
    const team = _teams[i]
    const players = team.players
    for (let j = 0; j < players.length; j++) {
      try {
        const summoner_renked = await window.lcu.getRankInfoById(players[j].details.puuid)
        players[j]['ranked'] = summoner_renked ? summoner_renked : undefined
      } catch (error) {
        players[j]['ranked'] = undefined
      }
    }
  }
  teams.value = _teams
}

const isOwn = (puuid: string): boolean => {
  return puuid === window.store.getStore('user_info')?.puuid
}

const getRankLevel = (ranked: RankedInfo): string => {
  const queues = ranked.queues
  const game = queues.find((item) => item.queueType === 'RANKED_SOLO_5x5')
  if (!game) return '未查到排位信息'
  const level = formatLevel(game?.tier) + (game?.tier == 'NONE' ? '' : game?.division)
  return level
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
    }
  )

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
  height: 500px;
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
