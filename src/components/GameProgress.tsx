import { Abbreviation, AbbreviationWithResult } from 'src/abbreviations'
import { RoundState } from 'src/constants'

import ResultIcon from 'src/components/ResultIcon'

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
        let roundState = null
        if (index > questionIndex) {
          roundState = RoundState.PENDING
        } else {
          switch (questionResults.at(index)?.isCorrect) {
            case true:
              roundState = RoundState.CORRECT
              break
            case false:
              roundState = RoundState.WRONG
              break
            default:
              roundState = RoundState.ANSWERING
              break
          }
        }
        return <ResultIcon key={question.abbreviation} state={roundState} />
      })}
    </div>
  )
}

export default GameProgress
