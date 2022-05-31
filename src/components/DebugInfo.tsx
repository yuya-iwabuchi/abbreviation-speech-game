import { useMemo } from 'react'
import getGitInfo from 'react-git-info/macro'

const DebugInfo = () => {
  const shortHash = useMemo(() => {
    const gitInfo = getGitInfo()
    return gitInfo?.commit?.shortHash
  }, [])

  return (
    <div className="fixed bottom-1 left-1">
      <code className="text-xs">{shortHash}</code>
    </div>
  )
}

export default DebugInfo
