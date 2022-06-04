import { useEffect, useState } from 'react'
import { BEAT_MS } from 'src/constants'

export const useTimer = (
  handleTimerComplete: Function,
  beatsCount: number,
  beatMs: number = BEAT_MS,
): [number, boolean] => {
  const [isTimerComplete, setIsTimerComplete] = useState(false)
  const [beatsFired, setBeatsFired] = useState(0)

  useEffect(() => {
    if (!beatsCount || isTimerComplete) {
      return
    }
    const intervalId = setInterval(() => setBeatsFired((current) => current + 1), beatMs)
    return () => clearInterval(intervalId)
  }, [beatsCount, isTimerComplete, beatMs])

  useEffect(() => {
    if (beatsFired >= beatsCount) {
      setIsTimerComplete(true)
      handleTimerComplete()
    }
  }, [beatsFired, beatsCount, handleTimerComplete])

  return [beatsFired, isTimerComplete]
}
