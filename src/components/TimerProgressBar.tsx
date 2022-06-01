import { BEAT_MS } from 'src/constants'

const TimerProgressBar = ({ beatsCount }: { beatsCount: number | null }) => {
  return (
    <div className="absolute top-0 left-0 w-screen">
      {beatsCount && (
        <div
          className="w-full bg-blue-200 dark:bg-gray-600 h-1"
          style={{ animation: `opacity ${beatsCount * BEAT_MS}ms linear 1 forwards` }}
        >
          <div
            className="bg-gradient-to-r from-blue-400 dark:from-blue-200 to-blue-500 h-1"
            style={{ animation: `width ${beatsCount * BEAT_MS}ms linear 1 forwards` }}
          />
        </div>
      )}
    </div>
  )
}

export default TimerProgressBar
