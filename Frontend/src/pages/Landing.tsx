import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[url(./bg.webp)] bg-cover min-h-screen flex flex-col items-center justify-center'>
            <div className='bg-[rgba(0,0,0,0.8)] flex flex-col items-center px-3 rounded-lg'>
                <h1 className='text-[172px] mb-0 pb-0 text-blue-600'
                >Bra<span className='text-slate-200'>i</span>nly</h1>
                <p className='mb-5 text-lg text-white'>Your Second Brain</p>
            </div>
            <div>
                <button className='hover:bg-blue-500 cursor-pointer text-white px-2 bg-blue-600 rounded-md p-1 m-2' onClick={() => navigate('/login')}>Login</button>
                <button className='hover:bg-blue-500 cursor-pointer text-white px-2 bg-blue-600 rounded-md p-1 m-2' onClick={() => navigate('/signup')}>Signup</button>
            </div>
        </div>
    )
}

export default Landing
