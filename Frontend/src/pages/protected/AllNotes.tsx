import Header from '../../components/AllNotes/Header'
import Card from '../../components/Card'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setContent } from '../../redux/features/content/contentSlice'
import { RootState } from '../../redux/store'
import { setCollection } from '../../redux/features/collection/collectionSlice'

const AllNotes = () => {
    const dispatch = useDispatch();
    const content = useSelector((state: RootState) => state.content)
    useEffect(() => {
        if (!localStorage.getItem('token')) return window.location.reload();
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
    }, [dispatch])

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BE_DOMAIN + 'collection', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                dispatch(setCollection(res.data.collections))
            } catch (error) {
                console.log(error);
            }
        }
        fetchCollections();
    }, [dispatch])

    return (
        <>
            <Header />
            <div className='dark:bg-slate-700 p-5 min-h-screen grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5 auto-rows-min'>
                {content.map(content => {
                    return <Card key={content._id}
                        id={content._id}
                        createdAt={content.createdAt}
                        link={content.link}
                        title={content.title}
                        type={content.type}
                        tags={content.tags.map(tag => tag.title)} />
                })}
                {content.length == 0 && <div className='text-slate-600 text-center dark:text-slate-200'
                >No content added yet !</div>}
            </div>
        </>
    )
}

export default AllNotes
