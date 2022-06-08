import { useEffect, useMemo } from 'react'

import { BEATS_PER_BLOCK } from 'src/constants'
import { Abbreviation, AbbreviationWithResult } from 'src/abbreviations'

import { useTimer } from 'src/hooks/useTimer'

import TimerProgressBar from 'src/components/TimerProgressBar'
import AbbreviationSection from 'src/components/AbbreviationSection'
import PhraseSection from 'src/components/PhraseSection'
import BottomRightConfetti from 'src/components/BottomRightConfetti'
import LoadingIcon from 'src/components/LoadingIcon'

const STEP_BEATS_COUNT = BEATS_PER_BLOCK * 2

const ResultStep = ({
  handleNextStep,
  setQuestionResults,
  question,
  bestTranscript,
  isCorrect,
  phraseRegex,
  isLastQuestion,
}: {
  handleNextStep: Function
  setQuestionResults: React.Dispatch<React.SetStateAction<AbbreviationWithResult[]>>
  question: Abbreviation
  bestTranscript: string
  isCorrect: boolean
  phraseRegex: RegExp
  isLastQuestion: boolean
}) => {
  const [beatsFired] = useTimer(handleNextStep, STEP_BEATS_COUNT)

  const isProcessing = useMemo(() => beatsFired <= BEATS_PER_BLOCK / 4, [beatsFired])
  const isGoingToNextRound = useMemo(() => beatsFired >= STEP_BEATS_COUNT - BEATS_PER_BLOCK / 2, [beatsFired])

  useEffect(() => {
    if (isProcessing) {
      return
    }
    setQuestionResults((results) => [
      ...results,
      {
        ...question,
        transcript: bestTranscript,
        isCorrect,
      },
    ])
  }, [isProcessing, setQuestionResults, question, bestTranscript, isCorrect])

  const nextRoundText = useMemo(() => {
    if (isLastQuestion) {
      return "That's it!"
    } else if (isCorrect) {
      return "Let's keep going!"
    }
    return 'Good luck on the next one!'
  }, [isLastQuestion, isCorrect])

  return (
    <>
      <TimerProgressBar beatsCount={STEP_BEATS_COUNT} />
      <AbbreviationSection abbreviation={question.abbreviation} />
      <div className="my-4 min-h-[35px] capitalize text-2xl">
        <PhraseSection bestTranscript={bestTranscript} phraseRegex={phraseRegex} showAnswer={!isProcessing} />
      </div>
      <div className="capitalize text-xl min-h-[30px] my-4">
        {!isProcessing && (
          <>
            <span>Answer: </span>
            <span className="font-medium">{question.phrase}</span>
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-4">
        {isProcessing ? (
          <LoadingIcon />
        ) : (
          <div className="font-semibold text-3xl ">{isCorrect ? 'Correct!' : 'Oops!'}</div>
        )}
      </div>
      {isGoingToNextRound && <div className="text-lg mt-3">{nextRoundText}</div>}
      {!isProcessing && isCorrect && <BottomRightConfetti />}
    </>
  )
}

export default ResultStep
