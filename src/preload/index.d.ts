import { ElectronAPI } from '@electron-toolkit/preload'
import { StoreSchema } from '@main/store'
declare global {
  import('@main/store').StoreSchema
  interface Window {
    electron: ElectronAPI
    api: {
      toBufferBase64String: (str: string) => string
    }
    store: {
      getStore: <Key extends keyof StoreSchema>(key: Key) => StoreSchema[Key]
    }
    lcu: typeof import('./lcu').default
    page: typeof import('./page').default
  }
}
export interface CurrentUserInfo {
  accountId: number
  displayName: string
  internalName: string
  nameChangeFlag: boolean
  percentCompleteForNextLevel: number
  privacy: 'PRIVATE'
  profileIconId: number
  puuid: string
  rerollPoints: {
    currentPoints: number
    maxRolls: number
    numberOfRolls: number
    pointsCostToRoll: number
    pointsToReroll: number
  }
  summonerId: number
  summonerLevel: number
  unnamed: boolean
  xpSinceLastLevel: number
  xpUntilNextLevel: number
}

export interface SummerMatch {
  accountId: number
  games: {
    gameBeginDate: string
    gameCount: number
    gameEndDate: string
    gameIndexBegin: number
    gameIndexEnd: number
    games: [
      {
        gameCreation: number
        gameCreationDate: string
        gameDuration: number
        gameId: number
        gameMode: string
        gameType: string
        gameVersion: string
        mapId: number
        participantIdentities: [
          {
            participantId: number
            player: {
              accountId: number
              currentAccountId: number
              currentPlatformId: string
              matchHistoryUri: string
              platformId: string
              profileIcon: number
              summonerId: number
              summonerName: string
            }
          }
        ]
        participants: [
          {
            championId: number
            highestAchievedSeasonTier: string
            participantId: number
            spell1Id: number
            spell2Id: number
            stats: {
              assists: number
              causedEarlySurrender: boolean
              champLevel: number
              combatPlayerScore: number
              damageDealtToObjectives: number
              damageDealtToTurrets: number
              damageSelfMitigated: number
              deaths: number
              doubleKills: number
              earlySurrenderAccomplice: boolean
              firstBloodAssist: boolean
              firstBloodKill: boolean
              firstInhibitorAssist: boolean
              firstInhibitorKill: boolean
              firstTowerAssist: boolean
              firstTowerKill: boolean
              gameEndedInEarlySurrender: boolean
              gameEndedInSurrender: boolean
              goldEarned: number
              goldSpent: number
              inhibitorKills: number
              itemnumber: number
              item1: number
              item2: number
              item3: number
              item4: number
              item5: number
              item6: number
              killingSprees: number
              kills: number
              largestCriticalStrike: number
              largestKillingSpree: number
              largestMultiKill: number
              longestTimeSpentLiving: number
              magicDamageDealt: number
              magicDamageDealtToChampions: number
              magicalDamageTaken: number
              neutralMinionsKilled: number
              neutralMinionsKilledEnemyJungle: number
              neutralMinionsKilledTeamJungle: number
              objectivePlayerScore: number
              participantId: number
              pentaKills: number
              perknumber: number
              perknumberVar1: number
              perknumberVar2: number
              perknumberVar3: number
              perk1: number
              perk1Var1: number
              perk1Var2: number
              perk1Var3: number
              perk2: number
              perk2Var1: number
              perk2Var2: number
              perk2Var3: number
              perk3: number
              perk3Var1: number
              perk3Var2: number
              perk3Var3: number
              perk4: number
              perk4Var1: number
              perk4Var2: number
              perk4Var3: number
              perk5: number
              perk5Var1: number
              perk5Var2: number
              perk5Var3: number
              perkPrimaryStyle: number
              perkSubStyle: number
              physicalDamageDealt: number
              physicalDamageDealtToChampions: number
              physicalDamageTaken: number
              playerScorenumber: number
              playerScore1: number
              playerScore2: number
              playerScore3: number
              playerScore4: number
              playerScore5: number
              playerScore6: number
              playerScore7: number
              playerScore8: number
              playerScore9: number
              quadraKills: number
              sightWardsBoughtInGame: number
              teamEarlySurrendered: boolean
              timeCCingOthers: number
              totalDamageDealt: number
              totalDamageDealtToChampions: number
              totalDamageTaken: number
              totalHeal: number
              totalMinionsKilled: number
              totalPlayerScore: number
              totalScoreRank: number
              totalTimeCrowdControlDealt: number
              totalUnitsHealed: number
              tripleKills: number
              booleanDamageDealt: number
              booleanDamageDealtToChampions: number
              booleanDamageTaken: number
              turretKills: number
              unrealKills: number
              visionScore: number
              visionWardsBoughtInGame: number
              wardsKilled: number
              wardsPlaced: number
              win: boolean
            }
            teamId: number
            timeline: {
              creepsPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
              csDiffPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
              damageTakenDiffPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
              damageTakenPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
              goldPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
              lane: string
              participantId: number
              role: string
              xpDiffPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
              xpPerMinDeltas: {
                additionalProp1: number
                additionalProp2: number
                additionalProp3: number
              }
            }
          }
        ]
        platformId: string
        queueId: number
        seasonId: number
        teams: [
          {
            bans: [
              {
                championId: number
                pickTurn: number
              }
            ]
            baronKills: number
            dominionVictoryScore: number
            dragonKills: number
            firstBaron: boolean
            firstBlood: boolean
            firstDargon: boolean
            firstInhibitor: boolean
            firstTower: boolean
            inhibitorKills: number
            riftHeraldKills: number
            teamId: number
            towerKills: number
            vilemawKills: number
            win: string
          }
        ]
      }
    ]
  }
  platformId: string
}

export interface SummerDetails {
  gameCreation: number
  gameCreationDate: string
  gameDuration: number
  gameId: number
  gameMode: string
  gameType: string
  gameVersion: string
  mapId: number
  participantIdentities: [
    {
      participantId: number
      player: {
        accountId: number
        currentAccountId: number
        currentPlatformId: string
        matchHistoryUri: string
        platformId: string
        profileIcon: number
        puuid: string
        summonerId: number
        summonerName: string
      }
    }
  ]
  participants: [
    {
      championId: number
      highestAchievedSeasonTier: string
      participantId: number
      spell1Id: number
      spell2Id: number
      stats: {
        assists: number
        causedEarlySurrender: boolean
        champLevel: number
        combatPlayerScore: number
        damageDealtToObjectives: number
        damageDealtToTurrets: number
        damageSelfMitigated: number
        deaths: number
        doubleKills: number
        earlySurrenderAccomplice: boolean
        firstBloodAssist: boolean
        firstBloodKill: boolean
        firstInhibitorAssist: boolean
        firstInhibitorKill: boolean
        firstTowerAssist: boolean
        firstTowerKill: boolean
        gameEndedInEarlySurrender: boolean
        gameEndedInSurrender: boolean
        goldEarned: number
        goldSpent: number
        inhibitorKills: number
        item0: number
        item1: number
        item2: number
        item3: number
        item4: number
        item5: number
        item6: number
        killingSprees: number
        kills: number
        largestCriticalStrike: number
        largestKillingSpree: number
        largestMultiKill: number
        longestTimeSpentLiving: number
        magicDamageDealt: number
        magicDamageDealtToChampions: number
        magicalDamageTaken: number
        neutralMinionsKilled: number
        neutralMinionsKilledEnemyJungle: number
        neutralMinionsKilledTeamJungle: number
        objectivePlayerScore: number
        participantId: number
        pentaKills: number
        perk0: number
        perk0Var1: number
        perk0Var2: number
        perk0Var3: number
        perk1: number
        perk1Var1: number
        perk1Var2: number
        perk1Var3: number
        perk2: number
        perk2Var1: number
        perk2Var2: number
        perk2Var3: number
        perk3: number
        perk3Var1: number
        perk3Var2: number
        perk3Var3: number
        perk4: number
        perk4Var1: number
        perk4Var2: number
        perk4Var3: number
        perk5: number
        perk5Var1: number
        perk5Var2: number
        perk5Var3: number
        perkPrimaryStyle: number
        perkSubStyle: number
        physicalDamageDealt: number
        physicalDamageDealtToChampions: number
        physicalDamageTaken: number
        playerScore0: number
        playerScore1: number
        playerScore2: number
        playerScore3: number
        playerScore4: number
        playerScore5: number
        playerScore6: number
        playerScore7: number
        playerScore8: number
        playerScore9: number
        quadraKills: number
        sightWardsBoughtInGame: number
        teamEarlySurrendered: boolean
        timeCCingOthers: number
        /**伤害总额 */
        totalDamageDealt: number
        totalDamageDealtToChampions: number
        /**承受伤害 */
        totalDamageTaken: number
        totalHeal: number
        /**击杀野怪和小兵总数 */
        totalMinionsKilled: number
        totalPlayerScore: number
        totalScoreRank: number
        totalTimeCrowdControlDealt: number
        totalUnitsHealed: number
        tripleKills: number
        trueDamageDealt: number
        trueDamageDealtToChampions: number
        trueDamageTaken: number
        turretKills: number
        unrealKills: number
        visionScore: number
        visionWardsBoughtInGame: number
        wardsKilled: number
        wardsPlaced: number
        win: true
      }
      teamId: number
      timeline: {
        lane: string
        participantId: number
      }
    }
  ]
  platformId: string
  queueId: number
  seasonId: number
  teams: [
    {
      bans: []
      baronKills: number
      dominionVictoryScore: number
      dragonKills: number
      firstBaron: boolean
      firstBlood: boolean
      firstDargon: boolean
      firstInhibitor: boolean
      firstTower: boolean
      inhibitorKills: number
      riftHeraldKills: number
      teamId: number
      towerKills: number
      vilemawKills: number
      win: 'Win' | 'Fail'
    }
  ]
}

/**
 * 召唤师荣耀等级和里程碑
 */
export interface SummerHonorLevel {
  checkpoint: number
  honorLevel: number
  rewardsLocked: boolean
}

export type Tier =
  | 'NONE'
  | 'NA'
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER'
export type Division = 'I' | 'II' | 'III' | 'IV'
export type QueueType =
  | 'RANKED_SOLO_5x5'
  | 'RANKED_FLEX_SR'
  | 'RANKED_FLEX_TT'
  | 'NORMAL'
  | 'ARAM_UNRANKED_5x5'
interface Rank {
  division: Division
  highestDivision: Division
  highestTier: Tier
  isProvisional: boolean
  leaguePoints: number
  losses: number
  miniSeriesProgress: ''
  previousSeasonAchievedDivision: 'NA'
  previousSeasonAchievedTier: 'NONE'
  previousSeasonEndDivision: 'NA'
  previousSeasonEndTier: 'NONE'
  provisionalGameThreshold: number
  provisionalGamesRemaining: number
  queueType: QueueType
  ratedRating: number
  ratedTier: 'NONE'
  tier: Tier
  warnings: null
  wins: number
}
interface Seasons {
  currentSeasonEnd: number
  currentSeasonId: number
  nextSeasonStart: number
}

export interface RankedInfo {
  earnedRegaliaRewardIds: []
  highestCurrentSeasonReachedTierSR: Tier
  highestPreviousSeasonAchievedDivision: 'NA'
  highestPreviousSeasonAchievedTier: 'NONE'
  highestPreviousSeasonEndDivision: 'NA'
  highestPreviousSeasonEndTier: 'NONE'
  highestRankedEntry: Rank
  highestRankedEntrySR: Rank
  queueMap: {
    RANKED_FLEX_SR: Rank
    RANKED_SOLO_5x5: Rank
    RANKED_TFT: Rank
    RANKED_TFT_DOUBLE_UP: Rank
    RANKED_TFT_PAIRS: Rank
    RANKED_TFT_TURBO: Rank
  }
  queues: Rank[]
  rankedRegaliaLevel: number
  seasons: {
    RANKED_FLEX_SR: Seasons
    RANKED_SOLO_5x5: Seasons
    RANKED_TFT: Seasons
    RANKED_TFT_DOUBLE_UP: Seasons
    RANKED_TFT_PAIRS: Seasons
    RANKED_TFT_TURBO: Seasons
  }
  splitsProgress: {
    '1': number
  }
}

export interface GameChat {
  gameName: string
  gameTag: string
  id: string
  inviterId: string
  isMuted: true
  lastMessage: {
    body: string
    fromId: string
    fromPid: string
    fromSummonerId: 0
    id: string
    isHistorical: true
    timestamp: string
    type: string
  }
  name: string
  password: string
  pid: string
  targetRegion: string
  type: string
  unreadMessageCount: 0
}

export interface ChatMessage {
  body: string
  fromId: string
  fromPid: string
  fromSummonerId: number
  id: string
  isHistorical: true
  timestamp: string
  type: string
}
