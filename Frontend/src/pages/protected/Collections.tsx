import { useEffect } from 'react'
import AddFolderIcon from '../../components/icons/AddFolderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { toggleAddCollection } from '../../redux/features/service/serviceSlice'
import AddCollection from '../../popup/AddCollection'
import axios from 'axios'
import { setCollection } from '../../redux/features/collection/collectionSlice'
import { useNavigate } from 'react-router-dom'
import { IoFolder } from 'react-icons/io5'

const Collections = () => {
  const { openAddCollection } = useSelector((state: RootState) => state.service)
  const collection = useSelector((state: RootState) => state.collection)
  const dispatch = useDispatch();
  const navigate=useNavigate();
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
    <div className='w-full min-h-screen'>
      <h1 className='text-center text-2xl m-5 font-semibold'
      >Your Collections</h1>
      <p className='text-center'
      >Now you can create collections of related docs, tweets, links etc for better accessibility</p>
      <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 '>
        <div onClick={() => dispatch(toggleAddCollection(true))}
          className='hover:cursor-pointer rounded-md m-5 min-h-48 flex flex-col justify-center items-center'>
          <AddFolderIcon color='none' height={80} width={50} className='hover:scale-110' />
          <div className=''>Add new Collection</div>
        </div>
        {
          collection.map(collection => {
            return (
              <div onClick={() => navigate('/collections/'+collection._id)}
                className='shadow-md hover:shadow-xl hover:scale-105 hover:cursor-pointer mx-auto bg-slate-200 rounded-full m-5 h-40 w-40 flex flex-col justify-center items-center'>
                <IoFolder size={50} color='none' className='text-[#FBB241]' />
                <div className='mt-2'>{collection.name}</div>
              </div>
            )
          })
        }
      </div>
      {openAddCollection && <AddCollection />}
    </div>
  )
}

export default Collections