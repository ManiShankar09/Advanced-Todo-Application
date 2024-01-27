import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const navigate = useNavigate()


    const register = async(e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:3001/signup', {firstname, lastname, email, password})
            .then((res) => {
                console.log(res);
                if(res.data === true) {
                    toast.success('Registered Successfull');

                    navigate('/signin')
                }
                else if(res.data === 'user') toast.error('User already exists')
                else  toast.error('Failed to register. Please try again')
            
            })
        } catch (error) {
            if(error) toast.error('Failed to register')
        }
        
        
    }

  return (
    <div>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">

                    <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>


                    <form className="space-y-6" method="POST">

                        <div>
                            <label for="new-password" className="block text-sm font-medium text-gray-700">Firstname</label>
                            <div className="mt-1">
                                <input name="username" type="username" required value={firstname} onChange={e => setFirstname(e.target.value)}
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label for="password" className="block text-sm font-medium text-gray-700">Lastname</label>
                            <div className="mt-1">
                                <input name="lastname" type="text" required value={lastname} onChange={e => setLastname(e.target.value)}
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input name="email" type="email-address" autocomplete="email-address" required value={email} onChange={e => setEmail(e.target.value)}
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input name="password" type="password" autocomplete="password" required value={password} onChange={e => setPassword(e.target.value)}
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="mt-1">
                                <input name="confirm_password" type="password" autocomplete="confirm-password" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button  onClick={register}
                                className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Register
                                
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
