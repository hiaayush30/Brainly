import { FiTwitter } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { GoHash } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className='w-[25%] bg-slate-200 relative max-sm:hidden'>
            <div className='p-10 flex gap-3 items-center'>
                <LuBrain className='text-blue-800 text-5xl' />
                <NavLink to={'/'} className='relative text-3xl font-semibold cursor-pointer hover:scale-105 transition-all duration-500 
                before:content-[""] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[1px] before:bg-black 
                hover:before:w-full before:transition-all before:duration-500'>
                    Brainly
                </NavLink>
            </div>
            <div className='flex flex-col justify-start items-start px-10 text-xl'>
                <NavLink to={'/tweets'} className='flex gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'>
                    <FiTwitter />
                    <p>Tweets</p>
                </NavLink>
                <NavLink to={'/videos'} className='flex gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'>
                    <AiOutlineYoutube />
                    <p>Videos</p>
                </NavLink>
                <div className='flex gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'>
                    <IoDocumentTextOutline />
                    <p>Documents</p>
                </div>
                <div className='flex gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'>
                    <IoMdLink />
                    <p>Links</p>
                </div>
                <div className='flex gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'>
                    <GoHash />
                    <p>Tags</p>
                </div>
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
