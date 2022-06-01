import { useMemo, useState } from 'react'
import CategorySelect from 'src/components/CategorySelect'

import { BrowserSpeechRecognition } from 'src/web-speech-api'
import { Category } from 'src/abbreviations'
import DebugInfo from 'src/components/DebugInfo'

const InitialStep = ({
  handleNextStep,
  category,
  setCategory,
  speechRecognitionError,
}: {
  handleNextStep: Function
  category: Category
  setCategory: React.Dispatch<React.SetStateAction<Category>>
  speechRecognitionError: SpeechRecognitionErrorEvent | null
}) => {
  const [isPermissionError, setIsPermissionError] = useState(false)

  const handleStartGame = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStream.getTracks().forEach((track) => track.stop())
      console.log('[getUserMedia] Permission granted.')
      handleNextStep()
    } catch (error) {
      setIsPermissionError(true)
      console.error('[getUserMedia] Permission not granted.', error)
    }
  }

  // https://chromium.googlesource.com/chromium/src.git/+/HEAD/docs/ios/user_agent.md
  const isIosChrome = useMemo(() => window.navigator.userAgent.match(/CriOS/i), [])

  // https://bugs.webkit.org/show_bug.cgi?id=225298
  const isMacosSafari = useMemo(
    () => window.navigator.userAgent.match(/Macintosh/i) && window.navigator.userAgent.match(/Safari/i),
    [],
  )

  const errorMessage = useMemo(() => {
    if (speechRecognitionError) {
      return `Error: ${speechRecognitionError?.message}`
    }
    if (isPermissionError) {
      return 'Permission was not granted.'
    }
    return null
  }, [isPermissionError, speechRecognitionError])

  return (
    <>
      <DebugInfo />
      <div className="text-lg">Say the correct phrase of the abbreviation in the given time to win the rounds!</div>
      <div className="grow flex flex-col justify-center items-center mt-2 mb-8">
        {BrowserSpeechRecognition && !isIosChrome ? (
          <>
            <CategorySelect category={category} setCategory={setCategory} />
            <button
              onClick={handleStartGame}
              className="bg-blue-300 dark:bg-blue-600 text-blue-800 dark:text-blue-100 text-6xl font-semibold px-10 py-5 rounded-full transition ease-in-out hover:scale-110"
            >
              START
            </button>
            {isMacosSafari && (
              <div className="text-lg break-normal pt-3">
                <span>On Safari Desktop, you need to enable Dictation from </span>
                <span className="font-medium whitespace-nowrap">{'System Preference > Keyboard > Dictation'}</span>
                <span> to use the speech recognition.</span>
              </div>
            )}
            <div className="text-red-500 dark:text-red-400 font-medium pt-3">{errorMessage}</div>
          </>
        ) : (
          <div className="text-center font-medium text-xl text-red-500 dark:text-red-400 mb-10">
            This browser does not support speech recognition.
            <br />
            Try using Chrome for Desktop, Chrome for Android, or Safari for iOS instead.
          </div>
        )}
      </div>
      <div className="mb-5 leading-tight">
        <div>
          <a
            className="font-medium underline transition hover:brightness-90"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API"
            target="_blank"
            rel="noreferrer"
          >
            Web Speech API
          </a>
          <span> is currently in experimental state and are </span>
          <a
            className="font-medium underline transition hover:brightness-90"
            href="https://caniuse.com/speech-recognition"
            target="_blank"
            rel="noreferrer"
          >
            not available on all platforms/browsers
          </a>
          <span>.</span>
        </div>
        <div className="mt-2">
          <span>For best experience, please use </span>
          <a
            className="font-medium underline transition hover:brightness-90"
            href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility"
            target="_blank"
            rel="noreferrer"
          >
            Chrome on Windows/macOS/Android
          </a>
          <span>.</span>
        </div>
      </div>
    </>
  )
}

export default InitialStep
