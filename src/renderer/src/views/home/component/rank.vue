<template>
  <div class="rank">
    <n-card style="border-radius: 12px" :hoverable="true" content-style="padding:10px ">
      <n-tabs size="small" type="segment">
        <n-tab-pane v-for="item in tabs" :key="item.key" :name="item.title" :tab="item.title">
          <div class="rank-item">
            <div class="win">
              <n-tag :bordered="false" type="primary">
                <span>胜利</span>
              </n-tag>
              <n-tag :bordered="false" type="warning">
                <span>{{ item.gameInfo?.win }}场</span>
              </n-tag>
            </div>
            <div class="divider"></div>
            <div class="lose">
              <n-tag :bordered="false" type="primary">
                <span>失败</span>
              </n-tag>
              <n-tag :bordered="false" type="warning">
                <span>{{ item.gameInfo?.lose }}场</span>
              </n-tag>
            </div>
            <div class="divider"></div>
            <div class="win-rate">
              <n-tag :bordered="false" type="primary">
                <span>胜率</span>
              </n-tag>
              <n-tag :bordered="false" type="warning">
                <span>{{ item.gameInfo?.winRate }}</span>
              </n-tag>
            </div>
            <div class="divider"></div>
            <div class="level">
              <n-tag :bordered="false" type="primary">
                <span>段位</span>
              </n-tag>
              <n-tag :bordered="false" type="warning">
                <span>{{ item.gameInfo?.level }}</span>
              </n-tag>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatLevel } from '@renderer/src/utils/format'
onMounted(() => {
  getRank()
})

const tabs = ref([
  {
    title: '单双排位',
    key: 'RANKED_SOLO_5x5',
    gameInfo: {
      win: 0,
      lose: 0,
      winRate: '',
      level: ''
    }
  },
  {
    title: '灵活排位',
    key: 'RANKED_FLEX_SR',
    gameInfo: {
      win: 0,
      lose: 0,
      winRate: '',
      level: ''
    }
  },
  {
    title: '云顶排位',
    key: 'RANKED_TFT',
    gameInfo: {
      win: 0,
      lose: 0,
      winRate: '',
      level: ''
    }
  }
])
const formatData = (data): void => {
  tabs.value.forEach((item) => {
    const _item = data.find((i) => i.queueType === item.key)
    if (_item) {
      const win = _item?.wins
      const lose = _item?.losses
      const winRate = win + lose !== 0 ? ((win / (win + lose)) * 100).toFixed(2) + '%' : '100%'
      const level = formatLevel(_item?.tier) + (_item?.tier == 'NONE' ? '' : _item?.division)
      item.gameInfo = { win, lose, winRate, level }
    }
  })
}
const getRank: () => void = async () => {
  const rink_info = await window.lcu.getRankInfo()
  if (rink_info?.queues) {
    formatData(rink_info.queues)
  }
}

window.electron.ipcRenderer.on('endOfGame', () => {
  console.log('endOfGame,更新Rank数据')
  getRank()
})
</script>
<style lang="less" scoped>
.rank-item {
  font-weight: bold;
  .win,
  .lose,
  .win-rate,
  .level {
    display: flex;
    justify-content: space-between;

    ::v-deep(.n-tag) {
      width: 70px;
      text-align: center;
      justify-content: center;
    }
  }
  .divider {
    display: block;
    width: 100%;
    height: 1px;
    background: #eee;
    margin: 8px 0px;
  }
}
</style>
