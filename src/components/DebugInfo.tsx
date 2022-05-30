import { useEffect } from 'react'
import getGitInfo from 'react-git-info/macro'

const DebugInfo = () => {
  useEffect(() => {
    const gitInfo = getGitInfo()
    console.debug(`git commit hash: ${gitInfo?.commit?.shortHash}`)
  }, [])

  return null
}

export default DebugInfo
