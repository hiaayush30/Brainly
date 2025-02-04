import Header from '../../components/AllNotes/Header'
import Card from '../../components/Card'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setContent } from '../../redux/features/content/contentSlice'
import { RootState } from '../../redux/store'

const AllNotes = () => {
    const dispatch = useDispatch();
    const content = useSelector((state:RootState)=>state.content)
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BE_DOMAIN + 'content', {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    },
                    withCredentials: true
                })
                console.log(res.data.content)
                dispatch(setContent(res.data.content))
            } catch (error) {
                console.log(error);
            }
        }
        fetchContent()
    }, [])
    return (
        <>
            <Header />
            <div className='p-5 grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5'>
                {content.map(content=>{
                   return <Card key={content._id}
                    id={content._id}
                    createdAt={content.createdAt}
                    link={content.link}
                    title={content.title}
                    type={content.type} 
                    tags={content.tags.map(tag=>tag.title)}/>
                })}
            </div>
            {content.length ==0 && <div className='text-slate-600 text-center'
                >No content added yet !</div>}
        </>
    )
}

export default AllNotes
