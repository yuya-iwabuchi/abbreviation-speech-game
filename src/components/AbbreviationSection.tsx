const AbbreviationSection = ({
  abbreviation,
  withInstruction = false,
}: {
  abbreviation: string
  withInstruction?: boolean
}) => (
  <div className="pt-9">
    <div className="font-serif font-bold text-7xl text-yellow-550 dark:text-yellow-500">{abbreviation}</div>
    <div className="h-6">{withInstruction && '🎤 Read above out loud now! 🎤'}</div>
  </div>
)

export default AbbreviationSection
