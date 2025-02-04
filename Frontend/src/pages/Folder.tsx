import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../redux/store';
import { Collection, deleteCollection } from '../redux/features/collection/collectionSlice';
import Card from '../components/Card';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import axios from 'axios';

const Folder = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState<Collection | null>(null);
    const collections = useSelector((state: RootState) => state.collection);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const folder = collections
            .find((collection) => collection._id == collectionId);
        if (!folder) {
            navigate('/collections');
        }
        setCollection(folder);
    }, [collectionId, collections, navigate])
    const handleDelete = async () => {
        try {
            await axios.delete(import.meta.env.VITE_BE_DOMAIN + 'collection/' + collectionId, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            dispatch(deleteCollection(collectionId));
            navigate('/collections')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1 className='text-4xl p-5'
            >{collection?.name}</h1>
            <div className='absolute top-2 right-2 flex gap-2 items-center'>
                <button 
                    className='hover:bg-blue-500 cursor-pointer text-white bg-blue-600 p-2 rounded-full'>
                    <MdDriveFileRenameOutline size={24} />
                </button>
                <button onClick={handleDelete}
                    className='hover:bg-red-500 cursor-pointer text-white bg-red-600 p-2 rounded-full'>
                    <RiDeleteBin6Line size={24} />
                </button>
            </div>
            <div className='p-5 grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5'>
                {collection?.content.map(content => {
                    return <Card key={content._id}
                        id={content._id}
                        createdAt={content.createdAt}
                        link={content.link}
                        title={content.title}
                        type={content.type}
                        tags={content.tags.map(tag => tag.title)} />
                })}
            </div>
            {collection?.content.length == 0 && <div className='text-slate-600 w-full text-center'
            >No Content in this folder!</div>}
        </div>
    )
}

export default Folder
