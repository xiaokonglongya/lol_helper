/**
 * 获取客户端状态
 */
export function getClientStatus(): Promise<{
  token: string
  port: number
  pid: number
}> {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle({
        token: 'fHBhjAWJH5CwoZ902TTTvg',
        port: 65107,
        pid: 19272
      })
    }, 1000)
  })
}
