import { useMemo } from 'react'

import { AbbreviationWithResult } from 'src/abbreviations'

import DebugInfo from 'src/components/DebugInfo'
import Octocat from 'src/components/Octocat'
import BottomRightConfetti from 'src/components/BottomRightConfetti'
import ResultsTable from 'src/components/ResultsTable'

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
      return 'Much perfect! Very wow!'
    }
    if (correctRatio >= 0.8) {
      return 'Nice job!'
    }
    if (correctRatio >= 0.5) {
      return 'Not bad!'
    }
    return 'That was hard! Better luck next time!'
  }, [correctRatio])

  return (
    <>
      <Octocat />
      <DebugInfo />
      <div className="grow flex flex-col justify-center items-stretch mt-5">
        <ResultsTable questionResults={questionResults} />
      </div>
      <div className="my-10">
        <div className="font-semibold text-2xl mb-10">
          <span>
            You got {correctCount} out of {questionsCount} correct.
          </span>
          <span> </span>
          <span>{endText}</span>
        </div>
        <button
          onClick={handleReset}
          className="bg-blue-300 dark:bg-blue-600 text-blue-800 dark:text-blue-100 text-3xl font-semibold px-10 py-5 rounded-full transition ease-in-out hover:scale-110"
        >
          TRY AGAIN
        </button>
      </div>

      {correctRatio >= 0.8 && <BottomRightConfetti />}
    </>
  )
}

export default GameEndStep
