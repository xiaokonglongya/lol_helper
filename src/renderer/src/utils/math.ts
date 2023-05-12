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
// 以下是我提供的英雄联盟五个角色 OP Score 的计算公式，这些公式仅供参考，具体实现可能根据需要进行微调和修改：

// 1. 上单：OP_Score = (0.4 * KDA比例) + (0.2 * 对局时间) + (0.2 * 击杀/分钟) + (0.1 * 死亡/分钟) + (0.1 * 助攻/分钟)

// 2. 打野：OP_Score = (0.3 * KDA比例) + (0.3 * 对局时间) + (0.2 * GANK成功率) + (0.1 * 小兵数/分钟) + (0.1 * 杀死巨龙和小龙的数量)

// 3. 中单：OP_Score = (0.35 * KDA比例) + (0.25 * 对局时间) + (0.2 * CS数/分钟) + (0.1 * 击杀/分钟) + (0.1 * 助攻/分钟)

// 4. 下路射手（ADC）：OP_Score = (0.4 * KDA比例) + (0.2 * 对局时间) + (0.2 * CS数/分钟) + (0.1 * 击杀/分钟) + (0.1 * 助攻/分钟)

// 5. 辅助：OP_Score = (0.5 * KDA比例) + (0.2 * 对局时间) + (0.1 *视野覆盖率) + (0.1 * 击杀参与率) + (0.1 * 助攻数/分钟)

// 请注意，不同的游戏模式和版本可能需要不同的OP Score计算公式和权重。此外，这些公式并不能完美地反映玩家的实际表现和技能水平，仍需结合其他因素进行综合考虑。
