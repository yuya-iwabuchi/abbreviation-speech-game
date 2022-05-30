import { useMemo } from 'react'

import { AbbreviationWithResult } from 'src/constants'

import BottomRightConfetti from 'src/components/BottomRightConfetti'

const GameEndStep = ({
  handleReset,
  questionResults,
}: {
  handleReset: React.MouseEventHandler<HTMLButtonElement>
  questionResults: AbbreviationWithResult[]
}) => {
  const correctCount = useMemo(() => questionResults.filter(({ isCorrect }) => isCorrect).length, [questionResults])
  const questionsCount = useMemo(() => questionResults.length, [questionResults])
  const correctRatio = useMemo(() => correctCount / questionsCount, [correctCount, questionsCount])

  const endText = useMemo(() => {
    if (correctRatio >= 1) {
      return 'Very perfect! Much wow!'
    }
    if (correctRatio >= 0.8) {
      return 'You did well!'
    }
    if (correctRatio >= 0.5) {
      return 'Not bad!'
    }
    return 'Well that was hard! Better luck next time!'
  }, [correctRatio])

  return (
    <>
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

      {correctRatio >= 0.8 && <BottomRightConfetti />}
    </>
  )
}

export default GameEndStep
