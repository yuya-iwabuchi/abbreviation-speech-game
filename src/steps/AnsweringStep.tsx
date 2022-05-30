import { useEffect, useMemo, useState } from 'react'

import { Abbreviation, BEATS_PER_BLOCK, BEAT_MS } from 'src/constants'
import { useTimer } from 'src/hooks/useTimer'
import { BrowserSpeechRecognition, BrowserSpeechGrammarList } from 'src/web-speech-api'

import TimerProgressBar from 'src/components/TimerProgressBar'
import AbbreviationSection from 'src/components/AbbreviationSection'
import PhraseSection from 'src/components/PhraseSection'

const STEP_BEATS_COUNT = BEATS_PER_BLOCK * 2

const AnsweringStep = ({
  handleNextStep,
  setTranscriptResults,
  question,
  mostConfidentTranscript,
  mostCorrectTranscript,
  phraseRegex,
}: {
  handleNextStep: Function
  setTranscriptResults: React.Dispatch<React.SetStateAction<SpeechRecognitionResult[]>>
  question: Abbreviation
  mostConfidentTranscript: string
  mostCorrectTranscript: string | null
  phraseRegex: RegExp
}) => {
  useTimer(handleNextStep, STEP_BEATS_COUNT)
  const [isRecognitionReady, setIsRecognitionReady] = useState(false)

  const recognition = useMemo(() => {
    const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${question.phrase};`
    const speechRecognitionList = new BrowserSpeechGrammarList()
    speechRecognitionList.addFromString(grammar, 1)

    const recognition = new BrowserSpeechRecognition()
    recognition.grammars = speechRecognitionList
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 2
    return recognition
  }, [question.phrase])

  useEffect(() => {
    const handleSpeechResult = (event: SpeechRecognitionEvent) => {
      console.log('result', event)
      setTranscriptResults(Array.from(event.results))
    }
    console.log('addEventListener')
    recognition.addEventListener('result', handleSpeechResult)
    setIsRecognitionReady(true)

    return () => {
      // To allow SpeechRecognition to attempt to return a result.
      setTimeout(() => recognition.removeEventListener('result', handleSpeechResult), BEAT_MS)
    }
  }, [recognition, setTranscriptResults])

  useEffect(() => {
    if (!isRecognitionReady) {
      return
    }
    try {
      recognition.start()
    } catch {
      // TODO: multi-renders by strict mode
    }
    return () => {
      recognition.stop()
    }
  }, [recognition, isRecognitionReady])

  return (
    <>
      <TimerProgressBar beatsCount={STEP_BEATS_COUNT} />
      <AbbreviationSection withInstruction abbreviation={question.abbreviation} />
      <PhraseSection
        mostConfidentTranscript={mostConfidentTranscript}
        mostCorrectTranscript={mostCorrectTranscript}
        phraseRegex={phraseRegex}
        question={question}
      />
    </>
  )
}

export default AnsweringStep
