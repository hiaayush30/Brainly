import { FiTwitter } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { GoHash } from "react-icons/go";
import { BsShare } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const Card = () => {
    return (
        <div className="min-h-70 max-sm:max-w-72 w-full rounded-md shadow-md bg-slate-200 mx-auto">
            <div className="flex justify-between p-3 items-center">
                <div className="flex gap-1 items-center">
                    <IoDocumentTextOutline className="text-2xl" />
                    <p className="text-lg font-medium"
                    >Card title</p>
                </div>
                <div className="flex gap-2 items-center">
                    <BsShare className="hover:scale-110 transition-all cursor-pointer" />
                    <RiDeleteBin6Line  className="hover:scale-110 transition-all cursor-pointer"/>
                </div>
            </div>
            <div className="h-40 p-2">
                Main Content
            </div>
            <div className="font-light text-sm text-purple-800 p-1 flex flex-wrap gap-2">
                <span className="bg-blue-200 rounded-md px-1 cursor-pointer">
                    #productivity
                </span>
            </div>
            <div className="font-light text-sm text-slate-700 p-2">
                Added on 10/3/2024
            </div>
        </div>
    )
}

export default Card
