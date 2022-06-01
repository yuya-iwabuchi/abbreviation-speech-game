import { useCallback, useEffect, useMemo, useState } from 'react'

import { GameStep } from 'src/constants'
import { AbbreviationWithResult, CATEGORIES, Category } from 'src/abbreviations'

import InitialStep from 'src/steps/InitialStep'
import CountDownStep from 'src/steps/CountdownStep'
import AnsweringStep from 'src/steps/AnsweringStep'
import ResultStep from 'src/steps/ResultStep'
import GameEndStep from 'src/steps/GameEndStep'

import Progress from 'src/components/GameProgress'
import StopButton from 'src/components/StopButton'
import ErrorBoundary from 'src/components/ErrorBoundary'

const QUESTIONS_COUNT = 5

function cartesianProduct<T>(...allEntries: T[][]): T[][] {
  return allEntries.reduce<T[][]>(
    (results, entries) =>
      results
        .map((result) => entries.map((entry) => [...result, entry]))
        .reduce((subResults, result) => [...subResults, ...result], []),
    [[]],
  )
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

function generateQuestions<T>(questions: T[]): T[] {
  return shuffle(questions).slice(0, QUESTIONS_COUNT)
}

export default function App() {
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [questions, setQuestions] = useState(generateQuestions(category.abbreviations))

  const [gameStep, setGameStep] = useState<GameStep>(GameStep.INITIAL)
  const [questionIndex, setQuestionIndex] = useState(-1)

  const [speechRecognitionError, setSpeechRecognitionError] = useState<SpeechRecognitionErrorEvent | null>(null)
  const [transcriptResults, setTranscriptResults] = useState<SpeechRecognitionResult[]>([])
  const [questionResults, setQuestionResults] = useState<AbbreviationWithResult[]>([])

  const question = useMemo(() => questions[questionIndex], [questions, questionIndex])
  const isLastQuestion = useMemo(() => questionIndex === questions.length - 1, [questions, questionIndex])

  const sortedTranscripts = useMemo(() => {
    if (transcriptResults.length === 0) {
      return []
    }

    // For Chrome on Android
    const filteredTranscriptResults = transcriptResults
      .map((alternatives) => Array.from(alternatives).filter(({ transcript }) => transcript))
      .filter((alternatives) => alternatives.length > 0)
      .reduce((acc: SpeechRecognitionAlternative[][], alternatives: SpeechRecognitionAlternative[]) => {
        const lastAlternatives = acc.at(-1)
        if (lastAlternatives?.length === 1 && lastAlternatives[0].confidence === 0) {
          return [...acc.slice(0, -1), alternatives]
        }
        return [...acc, alternatives]
      }, [])

    const allCombinations = cartesianProduct(...filteredTranscriptResults)
      .map((combination) => ({
        transcript: combination
          .map(({ transcript }) => transcript.trim())
          .join(' ')
          .replaceAll('-', ' '),
        confidence: combination.reduce((acc, { confidence }) => acc + confidence, 0),
      }))
      .sort((a, b) => (a.confidence < b.confidence ? 1 : -1))

    return allCombinations as SpeechRecognitionAlternative[]
  }, [transcriptResults])
  const mostConfidentTranscript = useMemo(() => sortedTranscripts?.at(0)?.transcript ?? '', [sortedTranscripts])
  const phraseRegex = useMemo(() => new RegExp(`(${question?.phrase})`, 'gi'), [question?.phrase])
  const mostCorrectTranscript = useMemo(
    () =>
      sortedTranscripts?.find(({ transcript }) => transcript.toLowerCase().includes(question?.phrase))?.transcript ??
      null,
    [sortedTranscripts, question],
  )

  useEffect(() => {
    setQuestions(generateQuestions(category.abbreviations))
  }, [category])

  const handleReset = useCallback(() => {
    setGameStep(GameStep.INITIAL)

    setQuestionIndex(-1)
    setTranscriptResults([])
    setQuestionResults([])

    setQuestions(generateQuestions(category.abbreviations))
  }, [category])

  const handleNextRound = useCallback(() => {
    setTranscriptResults([])
    setSpeechRecognitionError(null)
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((currentIndex) => (currentIndex ?? -1) + 1)
      setGameStep(GameStep.COUNTDOWN)
    } else {
      setGameStep(GameStep.GAME_END)
    }
  }, [questions, questionIndex])

  const handleAnsweringStep = useCallback(() => {
    setGameStep(GameStep.ANSWERING)
  }, [])

  const handleSpeechRecognitionError = useCallback((error: SpeechRecognitionErrorEvent) => {
    setSpeechRecognitionError(error)
    setGameStep(GameStep.INITIAL)
  }, [])

  const handleResultStep = useCallback(() => {
    setGameStep(GameStep.RESULT)
  }, [])

  let gameStepContent = null
  let isGameProgressShown = false
  let isStopButtonShown = false
  switch (gameStep) {
    case GameStep.INITIAL:
      gameStepContent = (
        <InitialStep
          handleNextStep={handleNextRound}
          category={category}
          setCategory={setCategory}
          speechRecognitionError={speechRecognitionError}
        />
      )
      break
    case GameStep.COUNTDOWN:
      isGameProgressShown = true
      isStopButtonShown = true
      gameStepContent = <CountDownStep handleNextStep={handleAnsweringStep} />
      break
    case GameStep.ANSWERING:
      isGameProgressShown = true
      isStopButtonShown = true
      gameStepContent = (
        <AnsweringStep
          handleNextStep={handleResultStep}
          setTranscriptResults={setTranscriptResults}
          handleSpeechRecognitionError={handleSpeechRecognitionError}
          question={question}
          mostConfidentTranscript={mostConfidentTranscript}
          mostCorrectTranscript={mostCorrectTranscript}
          phraseRegex={phraseRegex}
        />
      )
      break
    case GameStep.RESULT:
      isGameProgressShown = true
      isStopButtonShown = true
      gameStepContent = (
        <ResultStep
          handleNextStep={handleNextRound}
          setQuestionResults={setQuestionResults}
          question={question}
          mostConfidentTranscript={mostConfidentTranscript}
          mostCorrectTranscript={mostCorrectTranscript}
          phraseRegex={phraseRegex}
          isLastQuestion={isLastQuestion}
        />
      )
      break
    case GameStep.GAME_END:
      isGameProgressShown = true
      gameStepContent = <GameEndStep handleReset={handleReset} questionResults={questionResults} />
      break
  }

  return (
    <>
      <main className="container max-w-3xl mx-auto h-full py-5 px-7 text-center flex flex-col items-stretch">
        <h1 className="font-bold text-5xl text-transparent text-blue-800 dark:text-blue-200 mb-3 mx-8">
          Abbreviation Speech Game
        </h1>
        <ErrorBoundary>
          {isGameProgressShown && (
            <Progress questions={questions} questionIndex={questionIndex} questionResults={questionResults} />
          )}
          <section className="grow flex flex-col">{gameStepContent}</section>
          {isStopButtonShown && <StopButton handleReset={handleReset} />}
        </ErrorBoundary>
      </main>
    </>
  )
}
