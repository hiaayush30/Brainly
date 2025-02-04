import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toggleAddContent } from '../redux/features/service/serviceSlice';
import axios from 'axios';
import { addContent } from '../redux/features/content/contentSlice';

const AddContent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('tweet');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState<string>('');
  const handleSubmit = async () => {
    if (title.trim() === '') {
      return setError('Title cannot be less than 3 or more than 50 characters!')
    }
    else if (link.trim() === '') {
      return setError('Link cannot be empty!')
    }
    else if (tags.trim() === '') {
      return setError('Should have atleast 1 tag!')
    }
    else if (tags.trim().split(' ').length > 5) {
      return setError('Cannot have more than 5 tags!')
    }
    else if (new Set(tags.trim().split(' ')).size !== tags.trim().split(' ').length) {
      return setError('cannot have duplicate tags!')
    }
    else setError('');
    try {
      setLoading(true);
      const res = await axios.post(import.meta.env.VITE_BE_DOMAIN + 'content', {
        type: selectedType,
        link,
        title,
        tags: tags.trim().split(' ')
      }, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      })
      dispatch(addContent(res.data.content));
      dispatch(toggleAddContent(false));
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  return (
    <div className='z-10 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)]'>
      <div className='relative bg-white text-black md:w-[50%] w-[80%] rounded-md p-5 opacity-100'>
        <div className="flex justify-between items-center p-5">
          <h3 className="font-medium text-2xl"
          >Add Content</h3>
          <IoMdClose onClick={() => dispatch(toggleAddContent(false))}
            title="close" className="absolute top-2 right-2 hover:bg-slate-600 hover:text-white hover:scale-110 cursor-pointer transition-all text-xl" />
        </div>
        <div>
          <div>
            <label>Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border mx-5 rounded-md cursor-pointer"
            >
              <option value="tweet">tweet</option>
              <option value="document">document</option>
              <option value="link">link</option>
              <option value="youtube">youtube</option>
            </select>
          </div>
          <div className='my-3'>
            <label>Title:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className='md:mx-6 p-1 outline-none'
              type='text' placeholder='Important post . . .' />
          </div>
          <div className='my-3'>
            <label>Link:</label>
            <input value={link} onChange={(e) => setLink(e.target.value)}
              className='md:mx-6 p-1 outline-none'
              type='text' placeholder='https:// . . .' />
          </div>
          <div className='my-3'>
            <label>Tags:</label>
            <input value={tags} onChange={(e) => setTags(e.target.value.toLowerCase())} className='md:mx-4 p-1 outline-none'
              type='text' placeholder='coding productivity . . .' />
          </div>
          <p className='text-sm text-slate-600 my-0'
          >! Seperate different tags with spaces (Min 1 and Max 5)</p>
          {(error !== '') && <p className='text-red-600'
          >{error}</p>}
        </div>
        <button disabled={loading}
          onClick={handleSubmit}
          className='w-full flex justify-center items-center hover:cursor-pointer bg-blue-600 p-1 rounded-md hover:bg-blue-500 text-white mt-3'>
          <IoAddOutline className='text-xl' /><p>{loading ? 'Adding...' : 'Add'}</p></button>
      </div>
    </div>
  )
}

export default AddContent
