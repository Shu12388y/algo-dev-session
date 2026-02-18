export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
      <div className="w-10 h-10 border-4 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
      <p className="text-sm text-zinc-400 font-medium">Loading...</p>
    </div>
  );
}