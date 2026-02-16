export default function LoadingPage() {
  return (
    <div className="h-screen  flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-white text-3xl font-bold mb-3 animate-pulse">
          Loading
          <span className="inline-flex ml-1">
            <span className="animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
            <span className="animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
            <span className="animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
          </span>
        </h2>

        <p className="text-white/80 text-sm animate-pulse">
          Please wait while we prepare everything for you
        </p>

        {/* Progress Bars */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 0.2, 0.4, 0.6].map((delay, i) => (
            <div
              key={i}
              className="w-2 h-10 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}