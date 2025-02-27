import { useNavigate } from 'react-router-dom'
import StyledButton from '../components/Ui/StyledButton';
import { motion,useScroll } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();
    const {scrollYProgress} = useScroll();
    return (
        <div style={{ backgroundImage: 'url("bg.jpeg")' }}
            className='relative bg-cover min-h-[100vh] flex flex-col items-center justify-around'>
            <motion.div 
            style={{
                scaleX:scrollYProgress
            }}
            className='h-[1px] bg-slate-200 rounded-md w-full origin-left fixed top-0'></motion.div>
            <div
            className='min-h-screen max-sm:w-[80vw] w-[40vw] xl:w-[50vw] lg:w-[60vw] md-[60vw] sm:w-[70vw]  max-sm:bg-[rgba(0,0,0,0.4)] bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center'>
            <div 
            className='flex flex-col h-[50vh] items-center px-3 rounded-lg'>
                <motion.h1 
                initial={{
                    x:0,
                    y:-30
                }}
                animate={{
                    opacity:100,
                    x:0,
                    y:0
                }}
                transition={{
                    duration:1,
                    ease:'easeInOut'
                }}
                className='max-sm:text-[85px] max-lg:text-[142px] max-md:text-[100px] text-[172px] opacity-0 mb-0 pb-0 text-blue-600'
                >
                    Bra
                    <motion.span
                    className='text-slate-200'>i</motion.span>
                    nly
                </motion.h1>
                <motion.p 
                initial={{
                    y:-20
                }}
                animate={{
                    opacity:100,
                    y:0
                }}
                transition={{
                 delay:1,
                 duration:0.7
                }}
                className='mb-5 text-lg text-white opacity-0'>Your Second Brain</motion.p>
            </div>
            <motion.div
            initial={{
                y:-20,
                opacity:0
            }} 
            animate={{
                y:0,
                opacity:100
            }}
            transition={{
                duration:0.7,
                delay:1.5
            }}
            className='max-sm:mt-10 mt-5 flex gap-5'>
                <StyledButton name='Login' onClick={() => navigate('/login')} />
                <StyledButton name='Signup' onClick={() => navigate('/signup')} />
            </motion.div>
            </div>
        </div>
    )
}

export default Landing
