import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '../Store/authSlice';
import EditModel from './EditModel';
import Spinner from './Spinner';


const Home = () => {

    const [task, setTask] = useState('')
    const navigate = useNavigate()
    const [res, setres] = useState(false)
    const [click, setClick] = useState(false)
    const [todos, setTodos] = useState([])
    const [showModel, setShowModel] = useState(false)
    const [todoId, setTodoId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [updateStatus, setUpdateStatus] = useState(false);
    const [todo, setTodo] = useState('')
    const [tab, setTab] = useState(1);
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated); 
    const [username, setUsername] = useState('')
    const [addClick, setAddClick] = useState(false)
    const [addStatus, setAddStatus] = useState(false)

    const api = process.env.API 


    const fetchData = async() => {
        const id = user && user._id 
        id && axios.post(`https://advanced-todo-0atw.onrender.com/read`, {id})
        .then(res => {
            if(res.data !== false) {setTodos(res.data[0].todos); setUsername(res.data[0].firstname); setUserId(res.data[0]._id)} 
            else toast.error('Failed to load todos') 
        })
    }

    if(updateStatus){
        fetchData()
        .then(() => setUpdateStatus(false))

    }

    useEffect(() => {
        if(isAuthenticated) fetchData();
        else navigate('/signin');
    }, [])


    const handleTask = async() => {
        setClick(true);
        setAddClick(true);
        const id = user._id
        axios.post(`https://advanced-todo-0atw.onrender.com/add`, {task, id})
        .then(res => {
            console.log(res.data);
            if(res.data !==false) {setres(true);setAddStatus(true); toast.success('Task Added')}
            else toast.error('Failed to add task')
        })
        .then(() => fetchData())
    }

    const updateTodo = (id, todo) => {
        setTodoId(id)
        setTodo(todo)
    }

    const handeComplete = (id) => {
        axios.post(`https://advanced-todo-0atw.onrender.com/complete`, {userId, id })
        .then((res) => {
            if(res.data !== false){
                fetchData()
                toast.success('Todo Completed Successfully')
            }else{
                toast.error('Failed to delete')
            }
        })
    }

    const handleDelete = (id) => {
        axios.post(`https://advanced-todo-0atw.onrender.com/delete`, {userId, id})
        .then((res) => {
            if(res.data === true){
                toast.success('Deleted')
                fetchData()
            }else toast.error('Failed to delete')
        })

    }

    const handleTab = (tab) => {
        setTab(tab)
    }
    
  return (
    <div className=' bg-gray-100 flex flex-col justify-start items-center min-h-screen overflow-hidden pt-5 pb-5 '>

        <span className=''>
            <p className=' font-semibold text-lg mb-4'>Hi, {username && username}</p>
        </span>

        <div className=' flex justify-center items-center gap-3'>
            <input type='text' className=' outline-none py-2 px-3 w-[330px] rounded-md  ' placeholder='Add Task...' value={task} onChange={e => setTask(e.target.value)} />
            <button onClick={handleTask} className=' bg-fuchsia-600 text-white px-4  py-2 rounded-md'>{addClick && !addStatus ? <div className=' justify-center items-center flex'><Spinner /></div> : 'Add'}</button>
        </div>

        <div className=' flex gap-10 mt-3'>
            <p onClick={() => handleTab(1)} className={`${tab === 1 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>All</p>
            <p onClick={() => handleTab(2)} className={`${tab === 2 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Active</p>
            <p onClick={() => handleTab(3)} className={`${tab === 3 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Completed</p>
        </div>

        {
            todos &&  tab === 1 &&  todos.map(todo => ( 
                <div className=' flex justify-between items-center bg-white w-[400px] rounded-md px-[20px] py-5 mt-3 flex-1 overflow-y-auto' key={todo._id}>
                    <div>
                        <h3 className=' text-lg font-semibold w-[200px]'>{todo.todo}</h3>
                        <p className=' text-xs text-gray-500'>{new Date(todo.date).toLocaleString()}</p>
                        <p>Status : {todo.status ? <span className=' text-green-500'>Active</span> : <span className=' text-red-500'>Inactive</span>}</p>
                    </div>
                    <div className=' flex flex-col items-start'>
                        <button className=' text-blue-700 text-sm' onClick={() => {setShowModel(true); updateTodo(todo._id, todo.todo)}}>Edit</button>
                        <button className=' text-red-700 text-sm' onClick={() => handleDelete(todo._id)}>Delete</button>
                        <button className=' text-green-700 text-sm' onClick={() => handeComplete(todo._id)}>Complete</button> 
                    </div>
                </div>
            ))

        }

        {
            todos && tab === 2 && todos.filter(obj => obj.status).map(todo => (
                <div className=' flex justify-between items-center bg-white w-[400px] rounded-md px-[20px] py-5 mt-3' key={todo._id}>
                    <div>
                        <h3 className=' text-lg font-semibold w-[200px]'>{todo.todo}</h3>
                        <p className=' text-xs text-gray-500'>{new Date(todo.date).toLocaleString()}</p>
                        <p>Status : {todo.status ? <span className=' text-green-500'>Active</span> : <span className=' text-red-500'>Inactive</span>}</p>
                    </div>
                    <div className=' flex flex-col items-start'>
                        <button className=' text-blue-700 text-sm' onClick={() => {setShowModel(true); updateTodo(todo._id, todo.todo)}}>Edit</button>
                        <button className=' text-red-700 text-sm' onClick={() => handleDelete(todo._id)}>Delete</button>
                        <button className=' text-green-700 text-sm' onClick={() => handeComplete(todo._id)}>Complete</button> 
                    </div>
                </div>
            ))
        }

        {
            todos && tab === 3 && todos.filter(obj => !obj.status).map(todo => (
                <div className=' flex justify-between items-center bg-white w-[400px] rounded-md px-[20px] py-5 mt-3' key={todo._id}>
                    <div>
                        <h3 className=' text-lg font-semibold w-[200px]'>{todo.todo}</h3>
                        <p className=' text-xs text-gray-500'>{new Date(todo.date).toLocaleString()}</p>
                        <p>Status : {todo.status ? <span className=' text-green-500'>Active</span> : <span className=' text-red-500'>Inactive</span>}</p>
                    </div>
                    <div className=' flex flex-col items-start'>
                        <button className=' text-blue-700 text-sm' onClick={() => {setShowModel(true); updateTodo(todo._id, todo.todo)}}>Edit</button>
                        <button className=' text-red-700 text-sm' onClick={() => handleDelete(todo._id)}>Delete</button>
                        <button className=' text-green-700 text-sm' onClick={() => handeComplete(todo._id)}>Complete</button> 
                    </div>
                </div>
            ))
        }

        {showModel && <EditModel onClose={() => setShowModel(false)} todoId={todoId} userId ={userId} updateStatus={setUpdateStatus} todo={todo} />}  
    </div>
  )
}

export default Home