import { Abbreviation, AbbreviationWithResult } from 'src/constants'

const GameProgress = ({
  questions,
  questionIndex,
  questionResults,
}: {
  questions: Abbreviation[]
  questionIndex: number
  questionResults: AbbreviationWithResult[]
}) => {
  return (
    <div className="flex flex-wrap justify-center my-3">
      {questions.map((question, index) => {
        let bgColor: string
        let content: string
        if (index > questionIndex) {
          bgColor = 'bg-gray-300 dark:bg-gray-500'
          content = ''
        } else {
          switch (questionResults.at(index)?.isCorrect) {
            case true:
              bgColor = 'bg-blue-300 dark:bg-blue-500'
              content = '✓'
              break
            case false:
              bgColor = 'bg-red-300 dark:bg-red-500'
              content = '✕'
              break
            default:
              bgColor = 'bg-yellow-400 dark:bg-yellow-500'
              content = '?'
              break
          }
        }
        return (
          <div key={question.abbreviation} className={`aspect-square h-6 m-1 rounded font-bold text-white ${bgColor}`}>
            <div>{content}</div>
          </div>
        )
      })}
    </div>
  )
}

export default GameProgress
