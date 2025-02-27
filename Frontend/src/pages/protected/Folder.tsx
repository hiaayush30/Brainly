import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';
import { Collection, deleteCollection } from '../../redux/features/collection/collectionSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import ContentCard from '../../components/Folder/ContentCard';
import { toast } from 'react-toastify';
import { toastOptions } from '../../types/toastify';

const Folder = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState<Collection | null>(null);
    const collections = useSelector((state: RootState) => state.collection);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        const folder = collections
            .find((collection) => collection._id == collectionId);
        if (!folder) {
            navigate('/collections');
        }else setCollection(folder);
    }, [collectionId, collections, navigate])
    const handleDelete = async () => {
        if(loading) return;
        try {
            if(!collectionId) return;
            setLoading(true);
            await axios.delete(import.meta.env.VITE_BE_DOMAIN + 'collection/' + collectionId, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            toast.success('Collection deleted!', toastOptions(false))
            dispatch(deleteCollection(collectionId));
            setLoading(false);
            navigate('/collections')
        } catch (error:any) {
            toast.error(error.response?.data?.message, toastOptions(false))
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div className='dark:bg-slate-700 min-h-screen'>
            <h1 className='text-4xl p-5 dark:text-slate-200'
            >{collection?.name}</h1>
            <div className='absolute top-2 right-2 flex gap-2 items-center'>
                {/* <button 
                    className='hover:bg-blue-500 cursor-pointer text-white bg-blue-600 p-2 rounded-full'>
                    <MdDriveFileRenameOutline size={24} />
                </button> */}
                <button onClick={handleDelete}
                    className='hover:bg-red-500 cursor-pointer text-white bg-red-600 p-2 rounded-full'>
                    <RiDeleteBin6Line size={24} />
                </button>
            </div>
            <div className='p-5 grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5'>
                {collection?.content.map(content => {
                    return <ContentCard key={content._id}
                        collectionId={collectionId}
                        id={content._id}
                        createdAt={content.createdAt}
                        link={content.link}
                        title={content.title}
                        type={content.type}
                        tags={content.tags.map(tag => tag.title)} />
                })}
            </div>
            {collection?.content.length == 0 && <div className='text-slate-600 w-full text-center'
            >
                <div className='dark:text-slate-200'>No Content in this folder!</div>
                <div className='pt-4 dark:text-slate-200'>Click on the + icon of the content you want to add and select your preferred collection</div>
                <button onClick={()=>navigate('/')}
                className='mt-4 text-white bg-blue-600 p-1 rounded-md hover:bg-blue-500 cursor-pointer'>Add Now!</button>
                </div>}
        </div>
    )
}

export default Folder
