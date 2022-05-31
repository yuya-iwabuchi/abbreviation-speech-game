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
  mostConfidentTranscript,
  mostCorrectTranscript,
  phraseRegex,
  isLastQuestion,
}: {
  handleNextStep: Function
  setQuestionResults: React.Dispatch<React.SetStateAction<AbbreviationWithResult[]>>
  question: Abbreviation
  mostConfidentTranscript: string
  mostCorrectTranscript: string | null
  phraseRegex: RegExp
  isLastQuestion: boolean
}) => {
  const [beatsFired] = useTimer(handleNextStep, STEP_BEATS_COUNT)

  const isCorrect = useMemo(() => !!mostCorrectTranscript, [mostCorrectTranscript])
  const isProcessing = useMemo(() => beatsFired <= BEATS_PER_BLOCK / 4, [beatsFired])
  const isGoingToNextRound = useMemo(() => beatsFired >= STEP_BEATS_COUNT - BEATS_PER_BLOCK / 2, [beatsFired])

  useEffect(() => {
    if (isProcessing) {
      return
    }
    const bestTranscript = mostCorrectTranscript || mostConfidentTranscript || ''
    setQuestionResults((results) => [
      ...results,
      {
        ...question,
        transcript: bestTranscript,
        isCorrect,
      },
    ])
  }, [isProcessing, setQuestionResults, question, mostCorrectTranscript, mostConfidentTranscript, isCorrect])

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
      <PhraseSection
        mostConfidentTranscript={mostConfidentTranscript}
        mostCorrectTranscript={mostCorrectTranscript}
        phraseRegex={phraseRegex}
        question={question}
        showAnswer={!isProcessing}
      />
      <div className="capitalize text-regular md:text-xl min-h-[30px] my-1 md:my-6">
        {!isProcessing && (
          <>
            <span>Answer: </span>
            <span className="font-medium">{question.phrase}</span>
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-1 md:mt-6">
        {isProcessing ? (
          <LoadingIcon />
        ) : (
          <div className="font-semibold text-xl md:text-3xl ">{isCorrect ? 'Correct!' : 'Oops!'}</div>
        )}
      </div>
      {isGoingToNextRound && <div className="text-regular md:text-lg mt-3 md:mt-5">{nextRoundText}</div>}
      {!isProcessing && isCorrect && <BottomRightConfetti />}
    </>
  )
}

export default ResultStep
