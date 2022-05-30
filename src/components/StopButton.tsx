const StopButton = ({ handleReset }: { handleReset: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <div className="flex">
      <button
        onClick={handleReset}
        className="bg-red-300 dark:bg-red-600 text-red-900 dark:text-red-100 text-xl font-semibold px-5 py-3 rounded-full transition ease-in-out hover:brightness-90 hover:scale-110"
      >
        STOP
      </button>
    </div>
  )
}

export default StopButton
