import { FiTwitter } from "react-icons/fi";
import { AiFillFire, AiOutlineYoutube } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdLink } from "react-icons/io";
import { LuBrain } from "react-icons/lu";
import { FaGithub, FaLink, FaRegFolderOpen } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import { toastOptions } from "../types/toastify";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='w-[25%] bg-slate-200 relative max-sm:hidden'>
                <div className='p-10 flex gap-3'>
                    <LuBrain className='text-blue-800 text-5xl' />
                    <div>
                        <NavLink to={'/'} className={`relative text-3xl font-semibold cursor-pointer hover:scale-105 transition-all duration-500 
                before:content-[""] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[1px] before:bg-black 
                hover:before:w-full before:transition-all before:duration-500`}>
                            Brainly
                        </NavLink>
                        <p className="text-sm text-slate-600 mt-2"
                        >Your Second Brain</p>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start px-10 text-xl'>
                    <NavLink to={'/collections'} className={({ isActive }) =>
                        `${isActive ? "text-2xl font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <FaRegFolderOpen />
                        <p>Collections</p>
                        <AiFillFire color="red" />
                    </NavLink>
                    <NavLink to={'/tweets'} className={({ isActive }) =>
                        `${isActive ? "text-2xl font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <FiTwitter />
                        <p>Tweets</p>
                    </NavLink>
                    <NavLink to={'/videos'} className={({ isActive }) =>
                        `${isActive ? "text-2xl font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <AiOutlineYoutube />
                        <p>Videos</p>
                    </NavLink>
                    <NavLink to={'/documents'} className={({ isActive }) =>
                        `${isActive ? "text-2xl font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <IoDocumentTextOutline />
                        <p>Documents</p>
                    </NavLink>
                    <NavLink to={'/links'} className={({ isActive }) =>
                        `${isActive ? "text-2xl font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <IoMdLink />
                        <p>Links</p>
                    </NavLink>
                    <a href="/" onClick={() => {
                        localStorage.removeItem('token');
                        toast.info('logged out successfully!', toastOptions(false));
                        window.location.reload();
                    }}
                        className='flex text-red-600 items-center gap-3 m-3 cursor-pointer transition-all'>
                        <IoIosLogOut />
                        <p>Logout</p>
                    </a>
                </div>
                <div onClick={() => {
                    window.open('https://github.com/hiaayush30');
                }}
                    className='absolute flex gap-1 items-center left-1 bottom-1 hover:underline underline-offset-2 cursor-pointer'>
                    <FaGithub /> hiaayush30
                </div>
            </div>
            {/* for mobiles */}
            <div className="z-10 rounded-lg transition-all ease-in-out sm:hidden fixed bottom-2 left-3 h-16 bg-blue-300 opacity-90 w-[95%] flex items-center justify-between px-2">
            <NavLink to={'/collections'} className={({ isActive }) =>
                        `${isActive ? "text-3xl font-semibold bg-blue-200 p-2 rounded-full" : "text-2xl "} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <FaRegFolderOpen />
                    </NavLink>
                    <NavLink to={'/videos'} className={({ isActive }) =>
                        `${isActive ? "text-3xl font-semibold bg-blue-200 p-2 rounded-full" : "text-2xl"} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <AiOutlineYoutube />
                    </NavLink>
                    <NavLink to={'/'} className={({ isActive }) =>
                        `${isActive ? "text-3xl font-semibold bg-blue-200 p-2 rounded-full" : "text-2xl"} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <FaHome />
                    </NavLink>
                    <NavLink to={'/links'} className={({ isActive }) =>
                        `${isActive ? "text-3xl bg-blue-200 p-2 rounded-full font-semibold" : "text-2xl"} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                    }>
                        <FaLink size={20} />
                    </NavLink>
                    <a href="/" onClick={() => {
                        localStorage.removeItem('token');
                        toast.info('logged out successfully!', toastOptions(false))
                        window.location.reload();
                    }}
                        className='flex text-red-600 text-2xl items-center gap-3 m-3 cursor-pointer transition-all'>
                        <IoIosLogOut />
                    </a>
            </div>
        </>
    )
}

export default Sidebar
