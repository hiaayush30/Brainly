import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Card from '../../components/Card';

const Documents = () => {
  const content = useSelector((state:RootState)=>state.content);
  const docs = content.filter(content=>content.type=='document');
  return (
    <div className='w-full dark:bg-slate-700 min-h-screen'>
      <h1 className='text-2xl pt-5 px-5 font-semibold dark:text-slate-200'
      >Saved Documents</h1>
      <p className='text-slate-600 text-sm px-5 dark:text-slate-200'>All your saved docs at one place!</p>
      <div className='p-5 grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5'>
      {docs.map(content => {
        return <Card key={content._id}
          id={content._id}
          createdAt={content.createdAt}
          link={content.link}
          title={content.title}
          type={content.type}
          tags={content.tags.map(tag => tag.title)} />
      })}
      {docs.length==0 && <div className='dark:text-slate-200 text-slate-600 w-full text-center'
      >No saved Docs!</div>}
    </div>
    </div>
  )
}

export default Documents
