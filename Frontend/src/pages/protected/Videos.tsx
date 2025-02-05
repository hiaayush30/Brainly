import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Card from '../../components/Card';

const Videos = () => {
  const content = useSelector((state:RootState)=>state.content);
  const videos = content.filter(content=>content.type=='youtube');
  return (
    <div className='w-full'>
      <h1 className='text-2xl pt-5 px-5 font-semibold'
      >Saved Videos</h1>
      <p className='text-slate-600 text-sm px-5'>All your saved videos at one place!</p>
      <div className='p-5 grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5'>
      {videos.map(content => {
        return <Card key={content._id}
          id={content._id}
          createdAt={content.createdAt}
          link={content.link}
          title={content.title}
          type={content.type}
          tags={content.tags.map(tag => tag.title)} />
      })}
      {videos.length==0 && <div className='text-slate-600 w-full text-center'
      >No saved videos!</div>}
    </div>
    </div>
  )
}

export default Videos
