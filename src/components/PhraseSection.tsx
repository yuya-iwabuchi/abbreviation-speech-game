import { useMemo } from 'react'

import { Abbreviation } from 'src/constants'

const PhraseSection = ({
  mostConfidentTranscript,
  mostCorrectTranscript,
  phraseRegex,
  question,
  showAnswer = false,
}: {
  mostConfidentTranscript: string
  mostCorrectTranscript: string | null
  phraseRegex: RegExp
  question: Abbreviation
  showAnswer?: Boolean
}) => {
  const bestTranscriptParts = useMemo(() => {
    if (!showAnswer && mostCorrectTranscript) {
      return [mostCorrectTranscript]
    } else if (!mostCorrectTranscript) {
      return [mostConfidentTranscript]
    }

    return mostCorrectTranscript.split(phraseRegex)
  }, [showAnswer, mostConfidentTranscript, mostCorrectTranscript, phraseRegex])

  return (
    <div className="py-4 md:py-8 min-h-[65px] md:min-h-[100px]">
      {showAnswer && !mostConfidentTranscript ? (
        <div className="capitalize text-2xl">(You didn't say anything!)</div>
      ) : (
        <div className="capitalize text-2xl">
          {bestTranscriptParts.map((bestTranscriptPart, i) => (
            <span
              className={showAnswer && phraseRegex.test(bestTranscriptPart) ? 'font-bold' : undefined}
              key={i + bestTranscriptPart}
            >
              {bestTranscriptPart}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default PhraseSection
