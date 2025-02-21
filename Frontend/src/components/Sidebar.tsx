import { AiFillFire } from "react-icons/ai";
import { IoIosLogOut, IoMdLink } from "react-icons/io";
import { FaFolderOpen, FaGithub, FaPlus, FaRegFolderOpen, FaRegMoon, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import { toastOptions } from "../types/toastify";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleAddContent, toggleTheme } from "../redux/features/service/serviceSlice";
import { motion } from 'motion/react';

const Sidebar = () => {
    const { darkMode } = useSelector((state: RootState) => state.service);
    const dispatch = useDispatch();
    return (
        <>
            <div className='dark:bg-gradient-to-b from-blue-900 to-zinc-800 dark:text-white w-[25%] bg-slate-200 relative max-sm:hidden '>
                <div className='p-10 flex items-center'>
                    {/* <LuBrain className='text-blue-800 text-5xl dark:text-blue-500' /> */}
                    <img className="w-22 h-22 m-0 p-0"
                        src="./logo.png" />
                    <div>
                        <NavLink to={'/'} className={`relative text-3xl font-semibold cursor-pointer hover:scale-105 transition-all duration-500 
                before:content-[""] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[1px] before:bg-black  dark:before:bg-slate-200
                hover:before:w-full before:transition-all before:duration-500`}>
                            Brainly
                        </NavLink>
                        <p className="text-sm text-slate-600 mt-2 dark:text-slate-300"
                        >Your Second Brain</p>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start px-10 text-2xl'>
                    <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2
                        }}
                    >
                        <NavLink to={'/collections'} className={({ isActive }) =>
                            `${isActive ? "scale-115 font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                        }>
                            <FaFolderOpen className="text-yellow-500"/>
                            <p>Collections</p>
                            <AiFillFire color="red" />
                        </NavLink>
                    </motion.div>
                    <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.1
                        }}
                    >
                        <NavLink to={'/tweets'} className={({ isActive }) =>
                            `${isActive ? "scale-115 font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                        }>
                            <FaTwitter className="text-[#1C96E8]" />
                            <p>Tweets</p>
                        </NavLink>
                    </motion.div>
                    <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.2
                        }}
                    >
                        <NavLink to={'/videos'} className={({ isActive }) =>
                            `${isActive ? "scale-115 font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                        }>
                            <FaYoutube className="text-[#FF0033]" />
                            <p>Videos</p>
                        </NavLink>
                    </motion.div>
                    {/* <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.3
                        }}
                    >
                        <NavLink to={'/documents'} className={({ isActive }) =>
                            `${isActive ? "text-2xl font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                        }>
                            <IoDocumentTextOutline />
                            <p>Documents</p>
                        </NavLink>
                    </motion.div> */}
                    <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.3
                        }}
                    >
                        <NavLink to={'/links'} className={({ isActive }) =>
                            `${isActive ? "scale-115 font-semibold" : ""} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                        }>
                            <IoMdLink className="text-blue-500" />
                            <p>Links</p>
                        </NavLink>
                    </motion.div>
                    <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.4
                        }}
                    >
                        <button onClick={() => dispatch(toggleTheme(!darkMode))}
                            className={'flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all'}>
                            {darkMode ? <FaRegMoon /> : <CiLight />}
                            <p>Theme</p>
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{
                            x: -20,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 100,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.5
                        }}
                    >
                        <a href="/" onClick={() => {
                            localStorage.removeItem('token');
                            toast.info('logged out successfully!', toastOptions(false));
                            window.location.reload();
                        }}
                            className='flex text-red-500 items-center gap-3 m-3 cursor-pointer transition-all'>
                            <IoIosLogOut />
                            <p>Logout</p>
                        </a>
                    </motion.div>
                </div>
                <div onClick={() => {
                    window.open('https://github.com/hiaayush30');
                }}
                    className='fixed flex gap-1 items-center left-1 bottom-1 hover:underline underline-offset-2 cursor-pointer'>
                    <FaGithub /> hiaayush30
                </div>
            </div>
            {/* for mobiles */}
            <div className="dark:bg-slate-900 dark:text-slate-200 z-15 rounded-lg transition-all ease-in-out sm:hidden fixed bottom-2 left-3 h-16 bg-blue-300 opacity-90 w-[95%] flex items-center justify-between px-2">
                <NavLink to={'/collections'} className={({ isActive }) =>
                    `${isActive ? "dark:bg-slate-600 text-3xl font-semibold bg-blue-200 p-2 rounded-full" : "text-2xl "} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                }>
                    <FaRegFolderOpen />
                </NavLink>
                <button onClick={() => dispatch(toggleAddContent(true))}
                    className={'flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'
                    }>
                    <FaPlus />
                </button>
                <NavLink to={'/'} className={({ isActive }) =>
                    `${isActive ? "dark:bg-slate-600 text-3xl font-semibold bg-blue-200 p-2 rounded-full" : "text-2xl"} flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold`
                }>
                    <FaHome />
                </NavLink>
                <button onClick={() => dispatch(toggleTheme(!darkMode))}
                    className={'flex items-center gap-3 m-3 cursor-pointer hover:scale-110 transition-all hover:font-semibold'
                    }>
                    {darkMode ? <FaRegMoon /> : <CiLight size={24} />}
                </button>
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
