import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const BottomRightConfetti = () => {
  const { width, height } = useWindowSize()

  return (
    <Confetti
      width={width}
      height={height}
      confettiSource={{ x: width, y: height, w: 0, h: 0 }}
      initialVelocityX={{ min: -(width / 80), max: 1 }}
      initialVelocityY={{ min: -(height / 60), max: -1 }}
      numberOfPieces={100}
      tweenDuration={50}
      recycle={false}
    />
  )
}

export default BottomRightConfetti
