import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { toggleChatBot } from "../redux/features/service/serviceSlice";
import CloseIcon from "../components/icons/CloseIcon";
import { useRef, useState } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import axios from "axios";

const ChatBot = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    async function askGPT(text: string) {
        try {
            const res = await axios.post(import.meta.env.VITE_BE_DOMAIN + '/chatBot', {
                text,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            setChats(chats => [...chats, res.data.data]);
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.log(error);
            alert('Chat bot down! please try again later')
        }
    }
    const [chats, setChats] = useState<Array<string>>([]);
    const { openChatBot } = useSelector((state: RootState) => state.service);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        if (text.trim().length == 0) return
        setChats(chats => [...chats, text.trim()]);
        setText('');
        askGPT(text.trim());
    }

    return (
        <div className="z-20 fixed right-3 bottom-3 cursor-pointer max-sm:top-3 max-sm:right-3">
            {!openChatBot &&
                <div className="w-15 h-15 bg-[rgba(0,0,0,0.3)] sm:flex justify-center items-center rounded-xl">
                    <div onClick={() => dispatch(toggleChatBot(true))}
                        className="w-10 h-10 bg-slate-800 flex justify-center items-center rounded-full hover:shadow-lg">
                        <IoMdChatbubbles color="white" size={30} />
                    </div>
                </div>}
            {openChatBot &&
                <div className="relative max-sm:w-[35vw] max-sm:h-[35vh] w-[20vw] h-[50vh] bg-slate-800">
                    <button onClick={() => dispatch(toggleChatBot(false))}
                        className="absolute top-[-3] left-[-3] bg-slate-600 hover:bg-slate-800  hover:text-slate-200 text-slate-200 cursor-pointer"
                    ><CloseIcon color="white" height={25} width={25} />
                    </button>
                    <div className="p-2 rounded-md flex flex-col gap-2">
                        <div className="p-3 h-[40vh] max-sm:h-[28vh] overflow-y-auto">
                            {chats.map((val, key) => {
                                return <div key={key} className="my-2 bg-slate-600 text-slate-200 rounded-md px-1">
                                    {val}
                                </div>
                            })}
                            <div ref={scrollRef} className="h-2"></div>
                        </div>
                        <div className="flex gap-3 items-center w-[18vw]">
                            <input value={text} onChange={(e) => setText(e.target.value)}
                                className="outline-none w-[14vw] px-1 text-slate-200"
                                type="text" placeholder="ask something..." />
                            <button onClick={handleSubmit}
                                className="cursor-pointer p-1 bg-zinc-700 text-slate-200 rounded-lg "
                            >Send</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ChatBot
