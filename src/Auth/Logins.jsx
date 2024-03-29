import React,{useState} from 'react'
import {Link, useNavigate, Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SimpleAlert from '../Components/SimpleAlert'

const schema = yup.object({
    email: yup.string().email().required('Invalid email!'),
    password: yup.string().min(6).max(20).required(),
  })
  .required()

const Logins = () => {

    const {register,handleSubmit, formState: { errors },} = useForm({resolver: yupResolver(schema)}) 

    const userData = JSON.parse(localStorage.getItem('users')) || []

    const [ herrors, setHerrors] = useState(null)

    const currentUserr = JSON.parse(localStorage.getItem('currentUser'));

    const navigate = useNavigate()

    const onSubmit = (data) => {
        const isRegistered = userData?.find(item => item.email === data?.email);
        if(isRegistered?.email === data?.email && isRegistered?.password === data?.password){
            const currentUser = {...data, isLoggedIn: true};
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            setHerrors({message:'User Logged-in Sucessfully', text:'text-green-800 bg-green-50'});
            setTimeout(()=> navigate('/notes'), 2000);    
        }else{
            setHerrors({message:'Invalid user Credentials. Try again!!', text:'text-red-800 bg-red-50'})
            return
        }  
    }
    if(currentUserr){
        return <Navigate to={'/notes'}/>
    }

    
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
     {herrors && <SimpleAlert herrors={herrors} setHerrors={setHerrors}/>}
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" {...register("email", { required: true, maxLength: 50 })}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" {...register("password", { required: true, maxLength: 50 })} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to={'/signup'} className="font-medium text-blue-600 hover:underline ">Sign up</Link>
                  </p>
                  
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Logins
