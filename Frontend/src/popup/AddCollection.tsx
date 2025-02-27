import { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import CloseIcon from '../components/icons/CloseIcon';
import { toggleAddCollection } from '../redux/features/service/serviceSlice';
import axios from 'axios';
import { addCollection } from '../redux/features/collection/collectionSlice';
import { toastOptions } from '../types/toastify';
import { toast } from 'react-toastify';

const AddCollection = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    inputRef.current?.focus();
  }, [])
  const handleSubmit = async () => {
    if(!inputRef.current) return;
    if (inputRef.current.value.trim().length < 3 || inputRef.current.value.trim().length >15) {
      return toast.info('name should be between 3 and 15 characters!',toastOptions(false))
    }
    setLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BE_DOMAIN + 'collection', {
        name: inputRef.current?.value.trim()
      }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      toast.success('Collection created!', toastOptions(false))
      setLoading(false);
      dispatch(addCollection(res.data.collection))
      dispatch(toggleAddCollection(false))
    } catch (error:any) {
      toast.error(error.response?.data?.message, toastOptions(false))
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className='z-20 fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center'>
      <div className='dark:bg-slate-200 flex flex-col items-center relative p-5 rounded-md bg-slate-200'>
        <span onClick={() => dispatch(toggleAddCollection(false))}
          className='hover:bg-slate-800 hover:text-white hover:cursor-pointer dark:text-slate-500 absolute top-1 right-1'>
          <CloseIcon height={25} width={25} />
        </span>
        <h2 className='text-2xl p-1 m-2 bg-blue-300 w-full rounded-md text-center dark:text-slate-800'
        >Add New Collection</h2>
        <p className='text-slate-600 text-sm'>Group related content together!</p>
        <div className='my-5 flex flex-col'>
          <label className='dark:text-slate-600'>Name:</label>
          <input ref={inputRef} className='py-1 outline-none  px-1 rounded-md dark:outline dark:bg-slate-300 dark:text-slate-800'
            type='text' placeholder='New Collection' />
        </div>
        <button onClick={handleSubmit}
          disabled={loading}
          className='hover:bg-blue-500 cursor-pointer bg-blue-600 text-white p-1 rounded-md'
        >{loading ? 'Adding...' : 'Add'}</button>
      </div>
    </div>
  )
}

export default AddCollection
