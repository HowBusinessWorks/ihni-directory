"use client"

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background font-mono flex items-center justify-center">
      <div className="text-center">
        {/* Main loading message */}
        <div className="bg-white border-8 border-black p-12 shadow-brutal mb-8">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase text-orange-500 leading-none">
              LOADING IDEAS
            </h1>
            <p className="text-xl font-mono text-gray-600">
              Preparing your stolen brilliance...
            </p>
            
            {/* Animated loading bars */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="bg-orange-500 border-2 border-black w-4 h-12 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="bg-purple-600 border-2 border-black w-4 h-12 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="bg-green-600 border-2 border-black w-4 h-12 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="bg-blue-600 border-2 border-black w-4 h-12 animate-bounce" style={{ animationDelay: '450ms' }}></div>
            </div>
          </div>
        </div>
        
        {/* Fun loading messages */}
        <div className="bg-black text-white border-8 border-black p-6 shadow-brutal-inverse">
          <p className="text-lg font-mono">
            Raiding the internet for the best app ideas...
          </p>
        </div>
      </div>
    </div>
  )
}