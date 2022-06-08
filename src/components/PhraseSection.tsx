import { useMemo } from 'react'
import { BEAT_MS } from 'src/constants'

const PhraseSection = ({
  bestTranscript,
  phraseRegex,
  showCursor = false,
  showAnswer = false,
}: {
  bestTranscript: string
  phraseRegex: RegExp
  showCursor?: Boolean
  showAnswer?: Boolean
}) => {
  const bestTranscriptParts = useMemo(() => {
    if (!showAnswer && bestTranscript) {
      return [bestTranscript]
    }

    return bestTranscript.split(phraseRegex)
  }, [showAnswer, bestTranscript, phraseRegex])

  if (!showAnswer) {
    return (
      <div className="capitalize">
        <span
          className="pr-1 border-r border-r-transparent"
          style={{ animation: showCursor ? `cursor-blink ${BEAT_MS}ms infinite` : '' }}
        >
          {bestTranscript}
        </span>
      </div>
    )
  }

  return showAnswer && !bestTranscript ? (
    <div className="text-[0.9em]">(You didn't say anything!)</div>
  ) : (
    <div className="capitalize pr-1 border-r border-r-transparent">
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
