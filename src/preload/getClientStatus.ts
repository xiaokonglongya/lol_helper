import { promisify } from 'util'
import { exec } from 'child_process'
const runCommand = promisify(exec)

const execCmd = async (command, powershell) => {
  try {
    const option = {
      shell: powershell ? `powershell.exe` : `cmd.exe`
    }
    const { stderr, stdout } = await runCommand(command, option)
    if (stderr) {
      return Promise.reject(stderr)
    }

    return stdout
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * 获取客户端状态
 */
export async function getClientStatus(): Promise<{
  token: string
  port: number
  pid: number
} | null> {
  try {
    const cmdLine = await execCmd(
      `wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline`,
      false
    )
    const port = Number(cmdLine.split('--app-port=')[1].split('"')[0])
    const pid = Number(cmdLine.split('--app-pid=')[1].split('"')[0])
    const token = cmdLine.split('--remoting-auth-token=')[1].split('"')[0]
    return {
      token,
      port,
      pid
    }
  } catch (error) {
    console.log('lol no start')
    return null
  }
}
