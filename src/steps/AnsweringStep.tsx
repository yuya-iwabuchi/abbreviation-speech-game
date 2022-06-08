import { useCallback, useEffect, useMemo, useState } from 'react'

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
  bestTranscript,
  phraseRegex,
}: {
  handleNextStep: () => void
  setTranscriptResults: React.Dispatch<React.SetStateAction<SpeechRecognitionResult[]>>
  handleSpeechRecognitionError: (error: SpeechRecognitionErrorEvent) => void
  question: Abbreviation
  bestTranscript: string
  phraseRegex: RegExp
}) => {
  useTimer(handleNextStep, STEP_BEATS_COUNT)
  const [isRecognitionReady, setIsRecognitionReady] = useState(false)
  const [isRecognitionStarted, setIsRecognitionStarted] = useState(false)
  const [recognitionRestartCount, setRecognitionRestartCount] = useState(0)

  const recognition = useMemo(() => {
    const recognition = new BrowserSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxAlternatives = 2

    // Add grammar for answer hints if supported
    if (BrowserSpeechGrammarList) {
      const wholePhrase = question.phrase
      const individualWords = question.phrase.split(' ').join(' | ')
      const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${wholePhrase} | ${individualWords};`
      const speechRecognitionList = new BrowserSpeechGrammarList()
      speechRecognitionList.addFromString(grammar, 1)
      recognition.grammars = speechRecognitionList
    }

    return recognition
  }, [question.phrase])

  const startRecognition = useCallback(() => {
    try {
      setIsRecognitionStarted(true)
      recognition.start()
      console.log('[SpeechRecognition] started')
    } catch (error) {
      handleSpeechRecognitionError(error as SpeechRecognitionErrorEvent)
      console.error('[SpeechRecognition] start error:', error)
    }
  }, [recognition, handleSpeechRecognitionError])

  const stopRecognition = useCallback(() => {
    try {
      recognition.stop()
      console.log('[SpeechRecognition] stopped')
    } catch (error) {
      handleSpeechRecognitionError(error as SpeechRecognitionErrorEvent)
      console.error('[SpeechRecognition] stop error:', error)
    }
  }, [recognition, handleSpeechRecognitionError])

  useEffect(() => {
    const handleSpeechResult = (event: SpeechRecognitionEvent) => {
      console.log('[SpeechRecognition] transcript result:', event)
      setTranscriptResults((prevResults) => {
        const prevFinalResults = prevResults.filter(({ isFinal }) => isFinal)
        // Hacky solution to support both symptoms:
        // Chrome Desktop -> returns previous results (with isFinal=true) alongside newer results (with isFinal=false)
        // Chrome Android -> returns only new results (with isFinal=false)
        const nextNewResults = Array.from(event.results).filter((result) => !prevFinalResults.includes(result))

        return [...prevFinalResults, ...nextNewResults]
      })
    }
    const handleSpeechError = (event: SpeechRecognitionErrorEvent) => {
      console.error('[SpeechRecognition] recognition error:', event)
      handleSpeechRecognitionError(event)
    }
    const handleSpeechEnd = () => {
      console.log('[SpeechRecognition] recognition ended')
      // Queue to restart speech recognition if ended prematurely.
      setIsRecognitionStarted(false)
      setRecognitionRestartCount((count) => {
        console.log('[SpeechRecognition] queuing restart #', count + 1)
        return count + 1
      })
    }

    recognition.addEventListener('result', handleSpeechResult)
    recognition.addEventListener('error', handleSpeechError)
    recognition.addEventListener('end', handleSpeechEnd)

    console.log('[SpeechRecognition] added event listeners')
    setIsRecognitionReady(true)
    setRecognitionRestartCount(0)

    return () => {
      // To allow SpeechRecognition to attempt to return a result before removing the event listeners.
      setTimeout(() => {
        recognition.removeEventListener('result', handleSpeechResult)
        recognition.removeEventListener('error', handleSpeechError)
        recognition.removeEventListener('end', handleSpeechEnd)
      }, BEAT_MS * 2)
      console.log('[SpeechRecognition] removed event listeners')
    }
  }, [recognition, setTranscriptResults, handleSpeechRecognitionError])

  useEffect(() => {
    if (!isRecognitionReady || isRecognitionStarted || recognitionRestartCount > 10) {
      // Limit restarts to avoid infinite loop.
      return
    }
    startRecognition()
    return () => stopRecognition()
  }, [startRecognition, stopRecognition, isRecognitionReady, isRecognitionStarted, recognitionRestartCount])

  return (
    <>
      <TimerProgressBar beatsCount={STEP_BEATS_COUNT} />
      <AbbreviationSection withInstruction abbreviation={question.abbreviation} />
      <div className="my-4 min-h-[35px] text-2xl">
        <PhraseSection bestTranscript={bestTranscript} phraseRegex={phraseRegex} showCursor={isRecognitionStarted} />
      </div>
    </>
  )
}

export default AnsweringStep
