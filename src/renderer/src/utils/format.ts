export const formatLevel: (tier: string) => string = (tier) => {
  switch (tier) {
    case 'CHALLENGER':
      return '王者'
    case 'GRANDMASTER':
      return '宗师'
    case 'MASTER':
      return '大师'
    case 'DIAMOND':
      return '钻石'
    case 'PLATINUM':
      return '铂金'
    case 'GOLD':
      return '黄金'
    case 'SILVER':
      return '白银'
    case 'BRONZE':
      return '青铜'
    case 'IRON':
      return '黑铁'
    default:
      return '未定级'
  }
}

/**
 * 转换游戏模式
 * @param gameMode
 * @returns
 */
export const formatGameModel = (
  queueId: number
): '单/双排' | '匹配模式' | '灵活排位' | '极地大乱斗' | '其他模式' => {
  switch (queueId) {
    case 420:
      return '单/双排'
    case 430:
      return '匹配模式'
    case 440:
      return '灵活排位'
    case 450:
      return '极地大乱斗'
    default:
      return '其他模式'
  }
}
