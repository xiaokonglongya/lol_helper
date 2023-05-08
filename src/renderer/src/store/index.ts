import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
interface Hero {
  ally_tips: string[]
  enemy_tips: string[]
  evolve: any[]
  id: number
  image_url: string
  key: string
  name: string
  passive: {
    description: string
    image_url: string
    name: string
    video_url: string
  }
  skins: {
    centered_image: string
    has_chromas: boolean
    id: number
    loading_image: string
    name: string
    prices: {
      cost: number
      currency: string
    }[]
    splash_image: string
    tiles_image: string
  }
}
export const opggStore = defineStore('opgg-stroe', () => {
  const heros = ref<Hero[]>([])
  const getHeros = async (): Promise<void> => {
    const result = await axios('https://op.gg/api/v1.0/internal/bypass/meta/champions?hl=zh_CN')
    heros.value = result.data.data
  }
  const getHeroAvatar = (id: number): string => {
    const hero = heros.value.find((item) => item.id === id)
    return hero?.image_url || ''
  }
  const getHeroName = (id: number): string => {
    const hero = heros.value.find((item) => item.id === id)
    return hero?.name || ''
  }
  getHeros()
  return {
    heros,
    getHeroAvatar,
    getHeros,
    getHeroName
  }
})
