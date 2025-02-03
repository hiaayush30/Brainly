import { FiTwitter } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdLink } from "react-icons/io";
import { GoHash } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Ui/Button";

const Sidebar = () => {
    const navigate=useNavigate();
    return (
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
                <div className='flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'>
                    <GoHash />
                    <p>Tags</p>
                </div>
                <button onClick={()=>{
                    localStorage.removeItem('token');
                    window.location.reload(); 
                }}
                className='flex text-red-600 items-center gap-3 m-3 cursor-pointer transition-all'>
                    <IoIosLogOut/>
                    <p>Logout</p>
                </button>
            </div>
            <div onClick={() => {
                window.open('https://github.com/hiaayush30');
            }}
                className='absolute flex gap-1 items-center left-1 bottom-1 hover:underline underline-offset-2 cursor-pointer'>
                <FaGithub /> hiaayush30
            </div>
        </div>
    )
}

export default Sidebar
