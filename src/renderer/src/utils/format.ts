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
