import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SimpleAlert from '../Components/SimpleAlert'
import { useNavigate, Link , Navigate} from 'react-router-dom'

const schema = yup.object({
    email: yup.string().email().required('Invalid email!'),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null, ], "Paswords do not match!").required()
  })
  .required()


const SignUp = () => {
    const {register,handleSubmit, formState: { errors },} = useForm({resolver: yupResolver(schema)})

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('users')) || [])

    const [ herrors, setHerrors] = useState(null)

    const currentUserr = JSON.parse(localStorage.getItem('currentUser'));

    const navigate = useNavigate()

    const onSubmit = (data) => {
        const isRegistered = userData.some(item => item.email === data?.email);
        if(isRegistered){
            setHerrors({message:'User already exists', text:'text-red-800 bg-red-50'})
            return
        }
        const userList = [...userData, data];
        const currentUser = {...data, isLoggedIn: true}
        setUserData(userList);
        localStorage.setItem('users', JSON.stringify(userList));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        setHerrors({message:'User registered Sucessfully', text:'text-green-800 bg-green-50'})
        setTimeout(()=> navigate('/notes'), 2000);
    }


    if(currentUserr){
        return <Navigate to={'/notes'}/>
    }
  return (
    <div>
        {/* create an account */}
        
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
                        Create and account
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" {...register("email", { required: true, maxLength: 50 })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder="name@company.com" />
                            {errors &&<p className=' text-sm font-extralight text-red-600'>{errors?.email?.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" {...register("password", { required: true, minLength:6, maxLength: 20 })}
                            placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 "/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password"   placeholder="••••••••" {...register("confirmPassword")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            {errors &&<p className=' text-sm font-extralight text-red-600'>{errors?.confirmPassword?.message}</p>}
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
      
    </div>
  )
}

export default SignUp
