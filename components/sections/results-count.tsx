interface ResultsCountProps {
  count: number
}

export function ResultsCount({ count }: ResultsCountProps) {
  return (
    <div id="results-bar" className="bg-black text-white border-8 border-black p-6 shadow-brutal-inverse">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black uppercase">{count} IDEAS FOUND</h3>
        <div className="text-lg font-mono">Last updated: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  )
}