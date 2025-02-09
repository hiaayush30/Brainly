import { BsShare } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import ShareBrain from "../../popup/ShareBrain";
import { FaBookBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddContent, toggleShareBrain } from "../../redux/features/service/serviceSlice";
import { RootState } from "../../redux/store";
import StyledApplyButton from "../Ui/StyledApplyButton";

const Header = () => {
    const { openShareBrain } = useSelector((store: RootState) => store.service);
    const dispatch = useDispatch();
    return (
        <div className="dark:bg-slate-700 dark:text-white">
            <div className="sm:hidden flex justify-center items-center">
            <img className="w-22 h-22 m-0 p-0" 
                    src="./logo.png"/>
                <h1 className={`relative text-center m-3 text-3xl font-semibold cursor-pointer hover:scale-105 transition-all duration-500`}
                >Brainly</h1>
            </div>
            <div className="flex w-full justify-between px-10 py-6 items-center max-sm:justify-center">
                {/* <RxHamburgerMenu className="absolute top-1 left-1 sm:hidden cursor-pointer text-2xl" /> */}
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-medium"
                    >All Notes</h2>
                    <FaBookBookmark className="text-2xl dark:text-slate-200 text-blue-800" />
                </div>
                <div className="flex gap-5 p-2 max-sm:hidden">
                    <StyledApplyButton onClick={() => dispatch(toggleShareBrain(true))} icon={<BsShare/>} name="Share Brain" />
                    <StyledApplyButton onClick={() => dispatch(toggleAddContent(true))}
                    icon={<FaPlus/>} name="Add Post" />
                </div>
                {openShareBrain && <ShareBrain />}
            </div>
        </div>
    )
}

export default Header
