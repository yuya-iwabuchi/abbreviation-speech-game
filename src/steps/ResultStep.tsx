import { useEffect, useMemo } from 'react'

import { Abbreviation, AbbreviationWithResult, BEATS_PER_BLOCK } from 'src/constants'

import { useTimer } from 'src/hooks/useTimer'

import TimerProgressBar from 'src/components/TimerProgressBar'
import AbbreviationSection from 'src/components/AbbreviationSection'
import PhraseSection from 'src/components/PhraseSection'
import BottomRightConfetti from 'src/components/BottomRightConfetti'

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

  const resultText = useMemo(() => {
    if (isProcessing) {
      return 'Processing...'
    } else if (isCorrect) {
      return 'Correct!'
    }
    return 'Oops!'
  }, [isProcessing, isCorrect])

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
      <div className="capitalize text-lg min-h-[30px]">
        {!isProcessing && (
          <>
            <span>Answer: </span>
            <span className="font-semibold">{question.phrase}</span>
          </>
        )}
      </div>
      <div className="font-bold text-3xl pt-2 md:pt-3">{resultText}</div>
      {isGoingToNextRound && <div className="text-xl pt-3">{nextRoundText}</div>}
      {!isProcessing && isCorrect && <BottomRightConfetti />}
    </>
  )
}

export default ResultStep
