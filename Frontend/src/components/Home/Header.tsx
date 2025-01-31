import { BsShare } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "../Ui/Button";
import ShareBrain from "../../popup/ShareBrain";
import { useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";

const Header = () => {
    const [openShareContentModal, setOpenShareContentModal] = useState<boolean>(false);
    return (
        <div className="flex w-full justify-between px-10 py-6 items-center">
            {/* <RxHamburgerMenu className="absolute top-1 left-1 sm:hidden cursor-pointer text-2xl" /> */}
            <div className="flex items-center gap-3">
                <h2 className="text-3xl font-medium"
                >All Notes</h2>
                <FaBookBookmark className="text-2xl text-blue-800" />
            </div>
            <div className="flex gap-5 p-2 max-sm:gap-2">
                <button onClick={() => setOpenShareContentModal(true)}
                    className='cursor-pointer hover:bg-blue-500 transition-all flex items-center gap-1 px-2 py-1 bg-blue-700 text-white rounded-lg'>
                    <BsShare />
                    <p className="max-sm:hidden">Share Brain</p>
                </button>
                <button className="cursor-pointer hover:bg-blue-500 transition-all flex items-center gap-1 px-2 py-1 bg-blue-700 text-white rounded-lg">
                    <FaPlus />
                    <p className="max-sm:hidden">Add Content</p>
                </button>
            </div>
            {openShareContentModal && <ShareBrain setOpenShareContentModal={setOpenShareContentModal} />}
        </div>
    )
}

export default Header
