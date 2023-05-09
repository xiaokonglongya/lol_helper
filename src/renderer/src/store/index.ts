import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
interface Hero {
  /**  介绍*/
  blurb: string
  /**名称ID */
  id: string
  image: {
    full: string
    sprite: string
    group: string
  }
  /**id key */
  key: string
  name: string
  partype: string
  tags: string[]
  title: string
}
interface Summoner {
  id: string
  description: string
  name: string
  key: string
  image: {
    full: string
    sprite: string
    group: string
  }
  icon_src?: string
}

interface Equipment {
  name: string

  plaintext: string
  into: number[]
  image: {
    full: string
    sprite: string
    group: string
  }
  gold: {
    base: number
    purchasable: boolean
    total: number
    sell: number
  }
  tags: string[]
  maps: {
    [key: string]: boolean
  }
  stats: {
    FlatMovementSpeedMod: number
  }
}

const version = '13.9.1'
const language = 'zh_CN'
export const riotSotre = defineStore('opgg-stroe', () => {
  const heros = ref<Hero[]>([])
  const summoner = ref<Summoner[]>([])
  const equipments = ref<{ [key: number]: Equipment }>({})
  /**所有的英雄 */
  const getHeros = async (): Promise<void> => {
    const result = await axios(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`
    )
    heros.value = Object.values(result?.data?.data || {}) || []
  }
  const getSummoner = async (): Promise<void> => {
    const result = await axios(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/summoner.json`
    )
    summoner.value = Object.values(result?.data?.data || {}) || []
  }
  const getEquipments = async (): Promise<void> => {
    const result = await axios(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/item.json`
    )
    equipments.value = result?.data?.data || {}
  }

  const initRiotData = async (): Promise<void> => {
    await getHeros()
    await getSummoner()
    await getEquipments()
  }

  /**获取英雄头像 */
  const getHeroAvatar = (id: number): string => {
    const hero = heros.value.find((item) => item.key === id.toString())
    // https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/Aatrox.png
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${hero?.id}.png`
    return url
  }
  /**
   * 获取召唤师技能图标
   * @param id
   */
  const getSummonerIcon = (id: number): Summoner | null => {
    const _summon = summoner.value.find((item) => item.key === id.toString())
    _summon &&
      (_summon[
        'icon_src'
      ] = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${_summon?.id}.png`)
    return _summon || null
  }
  /**
   * 获取装备图标
   * @param id
   * @returns
   * @description https://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/1001.png
   * @description https://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/1001.png
   */
  const getEquipmentIcon = (id: number): { icon_src: string } & Equipment => {
    const _equipment = equipments.value[id]
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${_equipment?.image.full}`
    return {
      icon_src: url,
      ..._equipment
    }
  }

  const getHeroName = (id: number): string => {
    const hero = heros.value.find((item) => item.key === id.toString())
    return hero?.name || ''
  }
  getHeros()
  return {
    heros,
    getHeroAvatar,
    getHeros,
    getHeroName,
    getSummonerIcon,
    getEquipmentIcon,
    initRiotData
  }
})
