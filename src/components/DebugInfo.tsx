import { useMemo } from 'react'
import getGitInfo from 'react-git-info/macro'

const DebugInfo = () => {
  const [shortHash, lastCommitDate] = useMemo(() => {
    const gitInfo = getGitInfo()
    const commitHash = gitInfo?.commit?.shortHash
    const commitDate = gitInfo?.commit?.date.slice(0, 10)
    return [commitHash, commitDate]
  }, [])

  return (
    <div className="absolute bottom-1 left-3">
      <code className="text-xs">
        <span>{lastCommitDate}</span>
        <span>_</span>
        <span>{shortHash}</span>
      </code>
    </div>
  )
}

export default DebugInfo
