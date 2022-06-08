import { useMemo } from 'react'

const PhraseSection = ({
  bestTranscript,
  phraseRegex,
  showAnswer = false,
}: {
  bestTranscript: string
  phraseRegex: RegExp
  showAnswer?: Boolean
}) => {
  const bestTranscriptParts = useMemo(() => {
    if (!showAnswer && bestTranscript) {
      return [bestTranscript]
    }

    return bestTranscript.split(phraseRegex)
  }, [showAnswer, bestTranscript, phraseRegex])

  return showAnswer && !bestTranscript ? (
    <div className="text-[0.9em] font-tilt">(You didn't say anything!)</div>
  ) : (
    <div>
      {bestTranscriptParts.map((bestTranscriptPart, i) => (
        <span
          className={
            showAnswer && phraseRegex.test(bestTranscriptPart)
              ? ' underline underline-offset-2 decoration-1 font-semibold'
              : undefined
          }
          key={i + bestTranscriptPart}
        >
          {bestTranscriptPart}
        </span>
      ))}
    </div>
  )
}

export default PhraseSection
