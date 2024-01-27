import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const EditModel = ({onClose, todoId, userId, updateStatus, todo}) => {

    const [update, setUpdate] = useState(todo)

    const handleUpdate  = () => {
        todoId && userId &&  axios.put(`http://localhost:3001/update/${userId}`, {update, todoId})
        .then(res => {
            console.log(res);
            if(res.data !== false) {
                onClose(true)
                toast.success('Todo Updated');
                updateStatus(true)
            }
            else toast.error('Failed to update')
        })
    }

  return (
    <div className=' fixed inset-0 bg-white p-5 bg-opacity-30 backdrop-blur-sm flex justify-center items-center flex-col'>
        <h2 className=' text-base font-semibold flex items-start justify-start mb-2'>Update Todo</h2>
        <div className=''>
            <div className=' bg-white'>
                <input type='text' className=' outline-none border border-gray-300 py-1 rounded-md w-56 px-3' value={update} onChange={e => setUpdate(e.target.value)} />
            </div>
            <div className=' flex justify-between px-4 mt-5'>
                <button className=' bg-blue-100 text-blue-900 px-2 rounded-md' onClick={handleUpdate}>Update</button>
                <button onClick={onClose} className=' bg-red-100 text-red-900 px-2 rounded-md'>Close</button> 
            </div>
        </div>

    </div>
  )
}

export default EditModel