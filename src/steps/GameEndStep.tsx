import { useMemo } from 'react'

import { AbbreviationWithResult } from 'src/abbreviations'

import GitHubLinkWithVersion from 'src/components/GitHubLinkWithVersion'
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
      return 'Great work! Perfect next?'
    }
    if (correctRatio >= 0.5) {
      return 'Not bad! Keep going!'
    }
    return 'That was hard! You go this!'
  }, [correctRatio])

  return (
    <>
      <GitHubLinkWithVersion />
      <div className="grow flex flex-col justify-center items-stretch mt-5">
        <ResultsTable questionResults={questionResults} />
      </div>
      <div className="mb-10">
        <div className="font-semibold text-2xl my-5 md:py-10">
          <span>
            You got {correctCount} out of {questionsCount} correct.
          </span>
          <br />
          <span>{endText}</span>
        </div>
        <button
          onClick={handleReset}
          className="bg-blue-300 dark:bg-blue-600 text-blue-900 dark:text-blue-100 text-3xl font-semibold px-10 py-5 rounded-full transition ease-in-out hover:scale-110"
        >
          PLAY AGAIN
        </button>
      </div>

      {correctRatio >= 0.8 && <BottomRightConfetti />}
    </>
  )
}

export default GameEndStep
