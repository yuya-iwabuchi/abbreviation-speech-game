import { AbbreviationWithResult } from 'src/abbreviations'
import { RoundState } from 'src/constants'

import ResultIcon from 'src/components/ResultIcon'
import PhraseSection from 'src/components/PhraseSection'

const ResultsTable = ({ questionResults }: { questionResults: AbbreviationWithResult[] }) => {
  return (
    <div className=" overflow-x-auto -mx-7 px-5 md:px-7 pb-2">
      <table className="table-auto w-full text-lg md:text-xl leading-5">
        <thead className="font-serif font-bold">
          <tr>
            <th>
              <div className="my-2 mx-1">Abbreviation</div>
            </th>
            <th>
              <div className="my-2 mx-1">Speech</div>
            </th>
            <th>
              <div className="my-2 mx-1">Result</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {questionResults.map(({ abbreviation, transcript, phrase, isCorrect }, index) => {
            const phraseRegex = new RegExp(`(${phrase})`, 'gi')
            return (
              <tr key={abbreviation} className={index % 2 ? '' : 'bg-blue-100 dark:bg-blue-700'}>
                <td>
                  <div className="my-2 mx-1 font-serif font-bold text-2xl text-yellow-550 dark:text-yellow-500">
                    {abbreviation}
                  </div>
                </td>
                <td className="capitalize">
                  <div className="my-2 mx-1">
                    <PhraseSection bestTranscript={transcript} phraseRegex={phraseRegex} showAnswer />
                    {!isCorrect && <div className="mt-2">Answer: {phrase}</div>}
                  </div>
                </td>
                <td>
                  <div className="my-2 mx-1 flex justify-center items-center">
                    <ResultIcon state={isCorrect ? RoundState.CORRECT : RoundState.WRONG} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default ResultsTable
