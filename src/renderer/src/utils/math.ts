/**
 * 计算KDA
 * @param kills
 * @param deaths
 * @param assists
 * @returns
 */
export const mathKDA = (kills: number, deaths: number, assists: number): string => {
  if (deaths === 0) {
    deaths = 1
  }
  return `${((kills + assists) / deaths).toFixed(2)} / 1`
}
