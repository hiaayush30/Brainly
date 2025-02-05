import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';
import { Content } from '../../redux/features/content/contentSlice';
import { BsLink, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FcDocument } from 'react-icons/fc';
import { addContentToCollection, Collection } from '../../redux/features/collection/collectionSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../types/toastify';

const AddToCollection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contentId } = useParams();
  const contents = useSelector((state: RootState) => state.content)
  const collections = useSelector((state: RootState) => state.collection)
  const [content, setContent] = useState<Content | null>(null);
  const [targetCollection, setTargetCollection] = useState<Collection | null | undefined>(null);

  useEffect(() => {
    const result = contents.find(content => content._id == contentId);
    if (result) setContent(result);
    else navigate('/')
  }, [contentId, contents, navigate])

  const handleSubmit = async () => {
    if (!targetCollection) return alert('Please select a folder first!');
    if (targetCollection.content.some(content => content._id == contentId)) {
      return alert('content already present in the selected folder!');
    }
    try {
      if (!content) return;
      setLoading(true);
      await axios.post(import.meta.env.VITE_BE_DOMAIN + 'collection/add', {
        collectionId: targetCollection._id,
        content: contentId
      }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      dispatch(addContentToCollection({ collectionId: targetCollection._id, content }));
      toast.success('added to ' + targetCollection.name, toastOptions(false));
      setLoading(false);
      navigate('/');
    } catch (error:any) {
      toast.error(error?.response?.data?.message, toastOptions(false))
      console.log(error);
      setLoading(false);
    }
  }

  const ContentBg = {
    'youtube': 'bg-red-200',
    'tweet': 'bg-blue-200',
    'document': 'bg-blue-200',
    'link': 'bg-blue-200'
  }

  return (
    <div>
      <h1 className='text-center text-3xl p-5'
      >Add to Collection</h1>
      <div className=''>
        {/* Card */}
        <div className={`${content ? ContentBg[content.type] : ''}`}>
          <div className='flex items-center gap-5 p-5'>
            {content?.type == 'youtube' && <BsYoutube color='red' size={32} />}
            {content?.type == 'tweet' && <BsTwitter color='#1C96E8' size={32} />}
            {content?.type == 'document' && <FcDocument size={32} />}
            {content?.type == 'link' && <BsLink color='black' size={32} />}
            <h1 className='text-xl'
            >{content?.title}</h1>
          </div>
        </div>
        {/* Menu */}
        <div className='w-[95%] mx-auto'>
          <p className='text-slate-600 pt-5'
          >Select collection in which you want to add the above content</p>
          <select onChange={(e) => {
            const folder = collections.find(collection => collection.name == e.target.value);
            setTargetCollection(folder);
          }}
            className='mt-5 mr-5 outline-none'>
            <option value="" disabled selected>
              Select a collection
            </option>
            {collections.map(collection => {
              return (
                <option className=''
                  key={collection._id}
                  value={collection.name}
                >{collection.name}</option>
              )
            })}
          </select>
          <button disabled={loading}
            onClick={handleSubmit}
            className='bg-blue-600 hover:bg-blue-500 cursor-pointer p-1 rounded-md text-white'
          >{loading ? 'Adding...' : 'Add'}</button>
        </div>
      </div>
    </div>
  )
}

export default AddToCollection
