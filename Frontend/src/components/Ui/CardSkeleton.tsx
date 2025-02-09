const CardSkeleton = () => {
    return (
      <div className="relative bg-zinc-700 min-h-80 dark:text-slate-200 w-full rounded-md shadow-md mx-auto animate-pulse">
        <div className="flex justify-between p-3 items-center">
          <div className="flex gap-1 items-center">
            <div className="w-6 h-6 bg-zinc-500 rounded-full"></div>
            <div className="w-24 h-4 bg-zinc-500 rounded-md"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 bg-zinc-500 rounded-md"></div>
            <div className="w-6 h-6 bg-zinc-500 rounded-md"></div>
          </div>
        </div>
        <div className="min-h-48 overflow-auto flex justify-center items-center relative">
          <div className="w-64 mx-auto max-h-48 overflow-auto bg-zinc-500 rounded-md"></div>
        </div>
        <div className="font-light text-sm text-purple-800 p-1 flex flex-wrap gap-2">
          <div className="w-20 h-4 bg-zinc-500 rounded-md"></div>
          <div className="w-16 h-4 bg-zinc-500 rounded-md"></div>
        </div>
        <div className="flex items-center justify-between pr-2 mx-1">
          <div className="w-12 h-4 bg-zinc-500 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default CardSkeleton;
  