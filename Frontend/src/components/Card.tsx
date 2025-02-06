import { FaPlus, FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoDocument, IoDocumentTextOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteContent } from "../redux/features/content/contentSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../types/toastify";

interface CardProps {
    id: string;
    type: 'tweet' | 'document' | 'youtube' | 'link';
    link: string;
    title: string;
    tags: Array<string>;
    createdAt: Date;
}

const Card = (props: CardProps) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async () => {
        if (loading) return;
        try {
            setLoading(true);
            await axios.delete(import.meta.env.VITE_BE_DOMAIN + 'content', {
                data: { contentId: props.id },
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            toast.info('Content deleted!', toastOptions(false))
            dispatch(deleteContent(props.id))
            setLoading(false);
        } catch (error:any) {
            toast.error(error.response?.data?.message, toastOptions(false))
            console.log(error)
            setLoading(false);
        }
    }
    const getYoutubeEmbedUrl = (url: string) => {
        // const url = "https://youtu.be/5FQYwKq-VaE?si=cdGh_3C3mbQt4DzK";
        const id = url.split("youtu.be/")[1];
        return "https://www.youtube.com/embed/" + id;
    }

    const getTweetEmbedUrl = (url: string) => {
        return url.replace('x.com', 'twitter.com');
    }

    return (
        <div className="dark:bg-slate-300 max-sm:max-w-72 w-full rounded-md shadow-md bg-slate-200 mx-auto">
            <div className="flex justify-between p-3 items-center">
                <div className="flex gap-1 items-center">
                    {props.type == 'document' && <IoDocumentTextOutline className="text-2xl" />}
                    {props.type == 'link' && <IoMdLink className="text-2xl" />}
                    {props.type == 'tweet' && <FaTwitter className="text-2xl text-[#1B97E5]" />}
                    {props.type == 'youtube' && <FaYoutube className="text-2xl text-[#FF0033]" />}
                    <p className="text-lg font-medium"
                    >{props.title}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <FaPlus onClick={() => navigate('/add/' + props.id)}
                        title="Add to Collection" className="hover:scale-110 hover:text-blue-800 transition-all cursor-pointer" />
                    <RiDeleteBin6Line onClick={handleDelete}
                        title="delete" className="hover:scale-110 hover:text-red-700 transition-all cursor-pointer" />
                </div>
            </div>
            <div className="min-h-48 overflow-auto flex justify-center items-center relative">
                {props.type == 'youtube' &&
                    <iframe className="w-64" src={getYoutubeEmbedUrl(props.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                    </iframe>
                }

                {props.type == 'tweet' && (
                    <div className="w-64 mx-auto max-h-48 overflow-auto">
                        <blockquote className="twitter-tweet" style={{ margin: '12px' }}>
                            <a href={getTweetEmbedUrl(props.link)} />
                        </blockquote>
                    </div>
                )}
                {props.type == 'link' &&
                    <div className="max-w-[90%] overflow-clip">
                        <FaLink size={32} className="mx-auto" />
                        <input type="text" disabled={true} value={props.link} />
                        <button className="mx-auto my-5 cursor-pointer flex items-center bg-blue-500 hover:bg-blue-400 p-1 rounded-md text-white"
                            onClick={() => window.open(props.link)}><MdArrowOutward />Open</button>
                    </div>}
                {props.type == 'document' &&
                    <div className="max-w-[90%] overflow-clip">
                        <IoDocument size={32} className="mx-auto" />
                        <input type="text" disabled={true} value={props.link} />
                        <button className="mx-auto my-5 cursor-pointer flex items-center bg-blue-500 hover:bg-blue-400 p-1 rounded-md text-white"
                            onClick={() => window.open(props.link)}><MdArrowOutward />Open</button>
                    </div>}
            </div>
            <div className="font-light text-sm text-purple-800 p-1 flex flex-wrap gap-2">
                {props.tags.map((tag) => {
                    return (
                        <span className="bg-blue-200 rounded-md px-1 cursor-pointer">
                            #{tag}
                        </span>
                    )
                })}
            </div>
            <div className="flex items-center justify-between pr-2">
                <div className="font-light text-sm text-slate-700 p-2">
                    Added on {new Date(props.createdAt).toLocaleString()}
                </div>
                <div onClick={() => window.open(props.link)}
                    className="bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-full text-white p-1">
                    <MdArrowOutward className="" />
                </div>
            </div>
        </div>
    )
}

export default Card
