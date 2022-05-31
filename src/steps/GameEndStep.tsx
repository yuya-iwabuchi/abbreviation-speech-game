import { useMemo } from 'react'

import { AbbreviationWithResult } from 'src/abbreviations'

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
      <div className="font-serif font-bold text-5xl md:text-7xl py-4 md:py-9">
        {correctCount} / {questionsCount}
      </div>
      <div className="font-semibold text-xl md:text-3xl pb-5 md:pb-10">{endText}</div>
      <div className="grow flex flex-col justify-center items-center">
        <button
          onClick={handleReset}
          className="bg-blue-300 dark:bg-blue-600 text-blue-800 dark:text-blue-100 text-3xl font-semibold px-10 py-5 rounded-full transition ease-in-out hover:brightness-90 hover:scale-110"
        >
          FINISH
        </button>
      </div>

      {correctRatio >= 0.8 && <BottomRightConfetti />}
    </>
  )
}

export default GameEndStep
