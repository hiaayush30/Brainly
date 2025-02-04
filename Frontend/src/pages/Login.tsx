import axios from 'axios';
import { useState } from 'react';
import { useForm, Resolver} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addMeInfo } from '../redux/features/service/serviceSlice';

type FormValues = {
  username: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.username) {
    errors.username = {
      type: "required",
      message: "Username is required.",
    };
  } else if (values.username.length < 3) {
    errors.username = {
      type: 'minLength',
      message: 'Username must atleast have 3 characters'
    }
  } else if (values.username.length > 10) {
    errors.username = {
      type: 'minLength',
      message: 'Username cannot exceed 20 characters'
    }
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(values.username)) {
    errors.username = {
      type: "pattern",
      message: "Username must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
    };
  }

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Password is required.",
    };
  } else if (values.password.length > 20) {
    errors.password = {
      type: 'maxLength',
      message: "Password cannot be above 20 characters."
    };
  } else if (values.password.length < 8) {
    errors.password = {
      type: "minLength",
      message: "Password must be at least 8 characters.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values, // Return values only if no errors
    errors,
  };
};


export default function Login() {
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = async (data: { username: string, password: string }) => {
    setFormLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BE_DOMAIN + 'login', {
        username: data.username,
        password: data.password
      }, {
        withCredentials: true
      })
      console.log(res.data)
      localStorage.setItem('token', res.data.token);
      dispatch(addMeInfo(res.data.user.username));
      navigate('/');
    } catch (error) {
      console.log(error)
    }
    setFormLoading(false);
  }

  return (
    <div className='flex min-h-screen justify-center items-center bg-[url("./bg.webp")] bg-cover bg-center'>
      <div className='absolute top-2 left-2'>
        <h1 className='text-4xl text-white hover:text-blue-600 cursor-pointer transition-all duration-1000'
        >Brainly</h1>
        <p className='text-slate-200 text-sm mt-1'
        >Your Second Brain</p>
      </div>
      <form className='lg:w-[30vw] md:w-[70vw] w-[90vw] bg-opacity-75 flex flex-col justify-center bg-[rgba(30,41,50,0.9)] text-white p-5 rounded-md min-h-[50vh]'
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-center p-5 text-4xl underline underline-offset-4
                '>Login</h1>
        <label>username:</label>
        <input className='bg-white text-black p-1 rounded-md outline-none'
          {...register("username")} placeholder="username" />
        {errors?.username && <p className='text-red-600'
        >{errors.username.message}</p>}
        <label className='mt-5'>password:</label>
        <input className='bg-white text-black p-1 rounded-md outline-none'
          {...register("password")} placeholder="password" />
        {errors?.password && <p className='text-red-600'
        >{errors.password.message}</p>}

        <input
          // disabled={isSubmitting}
          value={formLoading ? 'Submitting...' : 'Submit'}
          disabled={formLoading}
          className='hover:cursor-pointer hover:bg-slate-600 mt-3 bg-slate-500 rounded-md p-1' type="submit" />
        <p className='text-center pt-4'>Dont' have an account ? <NavLink className='text-blue-700 hover:underline underline-offset-2'
          to={'/signup'}>Signup</NavLink></p>
      </form>
    </div>
  );
}
