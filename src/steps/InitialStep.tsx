import React, { useMemo, useState } from 'react'

import { BrowserSpeechRecognition } from 'src/web-speech-api'

const InitialStep = ({ handleNextStep }: { handleNextStep: Function }) => {
  const [isPermissionError, setIsPermissionError] = useState(false)

  const handleStartGame = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStream.getTracks().forEach((track) => track.stop())
      console.log('Permission granted.')
      handleNextStep()
    } catch (error) {
      setIsPermissionError(true)
      console.error('Permission not granted.', error)
    }
  }

  // https://chromium.googlesource.com/chromium/src.git/+/HEAD/docs/ios/user_agent.md
  const isIosChrome = useMemo(() => window.navigator.userAgent.match(/CriOS/i), [])

  if (!BrowserSpeechRecognition || isIosChrome) {
    return (
      <main className="mx-auto h-full flex justify-center items-center">
        <div className="text-center font-medium text-xl text-red-500 dark:text-red-400 mb-10">
          This browser does not support speech recognition.
          <br />
          Try using Google Chrome for Desktop, Chrome for Android, or Safari for iOS instead.
        </div>
      </main>
    )
  }

  return (
    <>
      <div className="text-lg">Say the correct phrase of the abbreviation in the given time to win the rounds!</div>
      <div className="grow flex flex-col justify-center items-center">
        <button
          onClick={handleStartGame}
          className="bg-blue-300 dark:bg-blue-600 text-blue-800 dark:text-blue-100 text-6xl font-semibold px-10 py-5 rounded-full transition ease-in-out hover:brightness-90 hover:scale-110"
        >
          START
        </button>
        <div className="font-red-700 font-semibold pt-2">{isPermissionError && 'Permission was not granted.'}</div>
      </div>
    </>
  )
}

export default InitialStep
