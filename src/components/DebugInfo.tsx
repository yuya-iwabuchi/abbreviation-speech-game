import getGitInfo from 'react-git-info/macro'

const DebugInfo = () => {
  const gitInfo = getGitInfo()
  console.debug(`git commit hash: ${gitInfo?.commit?.shortHash}`)
  return <div className="flex"></div>
}

export default DebugInfo
