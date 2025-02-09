
const CardSkeleton = () => {

    return (
        <div className="relative bg-zinc-600 min-h-80 dark:text-slate-200 w-full rounded-md shadow-md  mx-auto">
            <div className="flex justify-between p-3 items-center">
                <div className="flex gap-1 items-center">
                    
                </div>
                <div className="flex gap-2 items-center">
                    
                </div>
            </div>
            <div className="min-h-48 overflow-auto flex justify-center items-center relative">
                    <div className="w-64 mx-auto max-h-48 overflow-auto">
                        
                    </div>
            </div>
            <div className="font-light text-sm text-purple-800 p-1 flex flex-wrap gap-2">
            </div>
            <div className="flex items-center justify-between pr-2">
                

            </div>
        
        </div>
    )
}

export default CardSkeleton
