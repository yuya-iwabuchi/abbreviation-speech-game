import { useEffect, useMemo } from 'react'

import { Abbreviation, AbbreviationWithResult, BEATS_PER_BLOCK } from 'src/constants'

import { useTimer } from 'src/hooks/useTimer'

import TimerProgressBar from 'src/components/TimerProgressBar'
import PhraseSection from 'src/components/PhraseSection'

const GameEndStep = ({
  handleReset,
  questionResults,
}: {
  handleReset: React.MouseEventHandler<HTMLButtonElement>
  questionResults: AbbreviationWithResult[]
}) => {
  const correctCount = useMemo(() => questionResults.filter(({ isCorrect }) => isCorrect).length, [questionResults])
  const questionsCount = useMemo(() => questionResults.length, [questionResults])

  const endText = useMemo(() => {
    const ratio = correctCount / questionsCount
    if (ratio >= 1) {
      return 'Very perfect! Much wow!'
    }
    if (ratio >= 0.8) {
      return 'You did well!'
    }
    if (ratio >= 0.5) {
      return 'Not bad!'
    }
    return 'Well that was hard! Better luck next time!'
  }, [correctCount, questionsCount])

  return (
    <div className="pt-10">
      <div className="font-bold text-5xl">
        {correctCount} / {questionsCount}
      </div>
      <div className="font-bold text-3xl pt-8 pb-10">{endText}</div>
      <button
        onClick={handleReset}
        className="bg-blue-400 dark:bg-blue-600 text-blue-900 dark:text-blue-100 text-2xl sm:text-4xl font-semibold px-5 py-3 sm:px-7 sm:py-4 rounded-full transition ease-in-out hover:brightness-90 hover:scale-110"
      >
        FINISH
      </button>
    </div>
  )
}

export default GameEndStep
