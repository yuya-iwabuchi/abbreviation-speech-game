import { useEffect, useMemo, useState } from 'react'

import { BEATS_PER_BLOCK, BEAT_MS } from 'src/constants'
import { Abbreviation } from 'src/abbreviations'
import { useTimer } from 'src/hooks/useTimer'
import { BrowserSpeechRecognition, BrowserSpeechGrammarList } from 'src/web-speech-api'

import TimerProgressBar from 'src/components/TimerProgressBar'
import AbbreviationSection from 'src/components/AbbreviationSection'
import PhraseSection from 'src/components/PhraseSection'

const STEP_BEATS_COUNT = BEATS_PER_BLOCK * 2

const AnsweringStep = ({
  handleNextStep,
  setTranscriptResults,
  handleSpeechRecognitionError,
  question,
  mostConfidentTranscript,
  mostCorrectTranscript,
  phraseRegex,
}: {
  handleNextStep: () => void
  setTranscriptResults: React.Dispatch<React.SetStateAction<SpeechRecognitionResult[]>>
  handleSpeechRecognitionError: (error: SpeechRecognitionErrorEvent) => void
  question: Abbreviation
  mostConfidentTranscript: string
  mostCorrectTranscript: string | null
  phraseRegex: RegExp
}) => {
  useTimer(handleNextStep, STEP_BEATS_COUNT)
  const [isRecognitionReady, setIsRecognitionReady] = useState(false)

  const recognition = useMemo(() => {
    const recognition = new BrowserSpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 2

    // Add grammar for answer hints if supported
    if (BrowserSpeechGrammarList) {
      const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${question.phrase};`
      const speechRecognitionList = new BrowserSpeechGrammarList()
      speechRecognitionList.addFromString(grammar, 1)
      recognition.grammars = speechRecognitionList
    }

    return recognition
  }, [question.phrase])

  useEffect(() => {
    const handleSpeechResult = (event: SpeechRecognitionEvent) => {
      console.log('[SpeechRecognition] transcript result:', event)
      setTranscriptResults(Array.from(event.results))
    }

    const handleSpeechError = (event: SpeechRecognitionErrorEvent) => {
      console.error('[SpeechRecognition] error:', event)
      handleSpeechRecognitionError(event)
    }

    recognition.addEventListener('result', handleSpeechResult)
    recognition.addEventListener('error', handleSpeechError)
    console.log('[SpeechRecognition] added event listeners')
    setIsRecognitionReady(true)

    return () => {
      // To allow SpeechRecognition to attempt to return a result before removing the event listeners.
      setTimeout(() => {
        recognition.removeEventListener('result', handleSpeechResult)
        recognition.removeEventListener('error', handleSpeechError)
      }, BEAT_MS)
      console.log('[SpeechRecognition] removed event listeners')
    }
  }, [recognition, setTranscriptResults, handleSpeechRecognitionError])

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
