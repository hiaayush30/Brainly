import { useNavigate } from 'react-router-dom'
import StyledButton from '../components/Ui/StyledButton';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div style={{backgroundImage:'url("bg.jpeg")'}}
        className='bg-cover min-h-screen flex flex-col items-center justify-center'>
            <div className='bg-[rgba(0,0,0,0.8)] flex flex-col items-center px-3 rounded-lg'>
                <h1 className='max-sm:text-[85px] text-[172px] mb-0 pb-0 text-blue-600'
                >Bra<span className='text-slate-200'>i</span>nly</h1>
                <p className='mb-5 text-lg text-white'>Your Second Brain</p>
            </div>
            <div className='max-sm:mt-10 mt-5 flex gap-5'>
                <StyledButton name='Login' onClick={() => navigate('/login')}/>
                <StyledButton name='Signup' onClick={() => navigate('/signup')}/>
            </div>
        </div>
    )
}

export default Landing
