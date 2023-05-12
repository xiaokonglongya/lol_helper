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

export interface Equipment {
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
  description: string
}

export interface Rune {
  id: number
  key: string
  icon: string
  name: string
  slots: [
    {
      runes: [
        {
          id: number
          key: string
          icon: string
          name: string
          shortDesc: string
          longDesc: string
        }
      ]
    }
  ]
}
const version = '13.9.1'
const language = 'zh_CN'
export const riotSotre = defineStore('opgg-stroe', () => {
  const heros = ref<Hero[]>([])
  const summoner = ref<Summoner[]>([])
  const equipments = ref<{ [key: number]: Equipment }>({})
  const runes = ref<Rune[]>()
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
    console.log('🚀 ~ file: index.ts:84 ~ getEquipments ~   equipments.value:', equipments.value)
  }
  const getRunes = async (): Promise<void> => {
    const result = await axios(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/runesReforged.json`
    )
    runes.value = result?.data || []
  }

  const initRiotData = async (): Promise<void> => {
    await getHeros()
    await getSummoner()
    await getEquipments()
    await getRunes()
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
   */
  const getEquipmentIcon = (id: number): { icon_src: string } & Equipment => {
    const _equipment = equipments.value[id]
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${_equipment?.image.full}`
    return {
      icon_src: url,
      ..._equipment
    }
  }

  /**
   * 获取符文图标
   * @param id
   * @returns
   * @description https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png
   */
  type ResultRune = { icon_src: string } & Rune['slots'][0]['runes'][0]
  const getRuneIcon = (id: number): ResultRune | null => {
    const _allRunes = runes.value
      ?.map((e) => e.slots)
      .flat()
      .map((e) => e.runes)
      .flat()
    let _rune: ResultRune | null = null
    const result = _allRunes?.find((item) => item.id === id)
    if (result) {
      _rune = {
        ...result,
        icon_src: `https://ddragon.leagueoflegends.com/cdn/img/${result?.icon}`
      }
    }
    return (_rune as ResultRune) || null
  }
  const getRuneStyleIcon = (id: number): (Rune & { icon_src: string }) | null => {
    const _allRunes = runes.value
    let _rune: (Rune & { icon_src: string }) | null = null
    const result = _allRunes?.find((item) => item.id === id)
    if (result) {
      _rune = {
        ...result,
        icon_src: `https://ddragon.leagueoflegends.com/cdn/img/${result?.icon}`
      }
    }
    return _rune || null
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
    getRuneIcon,
    getRuneStyleIcon,
    initRiotData
  }
})
