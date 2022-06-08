import { RoundState } from 'src/constants'

const ResultIcon = ({ state }: { state: RoundState }) => {
  let bgColor: string
  let content: string
  switch (state) {
    case RoundState.CORRECT:
      bgColor = 'bg-blue-400 dark:bg-blue-500'
      content = '✓'
      break
    case RoundState.WRONG:
      bgColor = 'bg-red-400 dark:bg-red-500'
      content = '✕'
      break
    case RoundState.ANSWERING:
      bgColor = 'bg-yellow-550 dark:bg-yellow-500'
      content = '?'
      break
    case RoundState.PENDING:
      bgColor = 'bg-gray-300 dark:bg-gray-500'
      content = ''
  }
  return (
    <div className={`aspect-square h-6 w-6 m-1 rounded flex justify-center items-center ${bgColor}`}>
      <div className="font-bold text-white leading-normal">{content}</div>
    </div>
  )
}

export default ResultIcon
