import Header from '../components/Home/Header'
import Card from '../components/Home/Card'

const AllNotes = () => {
    return (
        <>
            <Header />
            <div className='p-5 grid md:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-5'>
                <Card />
                <Card />
                <Card />
            </div>
        </>
    )
}

export default AllNotes
