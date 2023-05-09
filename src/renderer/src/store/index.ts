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
const version = '13.9.1'
const language = 'zh_CN'
export const riotSotre = defineStore('opgg-stroe', () => {
  const heros = ref<Hero[]>([])
  const summoner = ref<Summoner[]>([])
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
    console.log('🚀 ~ file: index.ts:28 ~ getSummoner ~ result', result)
  }

  const initRiotData = async (): Promise<void> => {
    await getHeros()
    await getSummoner()
  }

  /**获取英雄头像 */
  const getHeroAvatar = (id: number): string => {
    console.log('🚀 ~ file: index.ts:32 ~ getHeroAvatar ~ id:', id)
    const hero = heros.value.find((item) => item.key === id.toString())
    console.log('🚀 ~ file: index.ts:33 ~ getHeroAvatar ~ hero:', hero)
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
    initRiotData
  }
})
