import { BEATS_PER_BLOCK, BEAT_MS } from 'src/constants'

import { useTimer } from 'src/hooks/useTimer'

const STEP_BEATS_COUNT = BEATS_PER_BLOCK

const CountDownStep = ({ handleNextStep }: { handleNextStep: Function }) => {
  const [beatsFired] = useTimer(handleNextStep, STEP_BEATS_COUNT)

  const beatsRemaining = STEP_BEATS_COUNT - beatsFired

  return (
    <>
      <div className="pt-4 md:pt-9 flex justify-center">
        <div
          className="font-serif font-bold text-5xl md:text-7xl"
          style={{ animation: `expand ${BEAT_MS}ms ease-in-out forwards ${STEP_BEATS_COUNT - 0.2}` }}
        >
          {beatsRemaining <= 1 ? 'Go!' : beatsRemaining - 1}
        </div>
      </div>
    </>
  )
}

export default CountDownStep
