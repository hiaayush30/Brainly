import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
const ShareBrain = (props:{setOpenShareContentModal:Dispatch<SetStateAction<boolean>>}) => {
    return (
        <div className='flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)]'>
            <div className='relative bg-white text-black md:w-[50%] w-[80%] rounded-md p-5 opacity-100'>
                <div className="flex justify-between items-center p-5">
                    <h3 className="font-medium text-2xl"
                    >Share Your Second Brain</h3>
                    <IoMdClose onClick={()=>props.setOpenShareContentModal(false)}
                     title="close" className="absolute top-2 right-2 hover:bg-slate-600 hover:text-white hover:scale-110 cursor-pointer transition-all text-xl" />
                </div>
                <p className="text-slate-700 text-lg px-5 py-2">
                    Share your entire collection of notes, documents, tweets and videos with others.
                    They'll be able to import your content into their own second brain
                </p>
                <button className="cursor-pointer hover:bg-blue-700 m-2 text-white flex items-center bg-blue-600 w-full justify-center gap-2 rounded-md py-1">
                    <MdContentCopy />
                    <p>Share Brain</p>
                </button>
                <p className="text-slate-700 text-center">
                   3 items will be shared
                </p>
            </div>
        </div>
    )
}

export default ShareBrain
