import { useNavigate } from "react-router-dom"
import AnimatedLoading from "../components/Ui/AnimatedLoading"
import HoverButton from "../components/Ui/HoverButton"

const ErrorPage = () => {
  const navigate=useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center bg-slate-800 gap-30">
      <h1 className="text-white text-4xl mt-17">404:Page Not Found!</h1>
      <div>
        <AnimatedLoading />
      </div>
      <HoverButton name="Go Back" onClick={()=>navigate('/')}/>
    </div>
  )
}

export default ErrorPage