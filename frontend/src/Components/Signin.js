import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { login } from '../Store/authSlice';
import Spinner from './Spinner';


const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [status, setStatus] = useState(false)
    const api = process.env.API 


    const login1 = async(e) => {
        e.preventDefault();
        setClick(true)
        axios.post(`https://advanced-todo-0atw.onrender.com/signin`, {email, password})

        .then((res) => {
            console.log(res);
            if(res.data !==  false) {
                setStatus(true);
                localStorage.setItem('id', JSON.stringify(res.data._id)) 
                dispatch(login(res.data));
                toast.success('Loggedin Successfull')
                navigate('/')
            }else{
                toast.error('Invaild Credentials')
            }
        })
        
        
    }

  return (
    <div>
        <div class="bg-gray-100 flex h-screen items-center justify-center p-4">
            <div class="w-full max-w-md">
                <div class="bg-white shadow-md rounded-md p-8">

                    <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>


                    <form class="space-y-6 mt-4" action="#" method="POST">
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Email</label>
                            <div class="mt-1">
                                <input name="email" type="email-address" autocomplete="email-address" required value={email} onChange={e => setEmail(e.target.value)}
                                    class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="mt-1">
                                <input id="password" name="password" type="password" autocomplete="password" required value={password} onChange={e => setPassword(e.target.value)}
                                    class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button onClick={login1}
                                class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">

                                {click && !status ? <Spinner /> : 'Signin'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin