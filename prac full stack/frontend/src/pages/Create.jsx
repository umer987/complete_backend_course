import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Create() {
  const navigate = useNavigate
  const handle_submit = async (e)=>{
    const formdata = new FormData(e.target)
    axios.post('http://localhost:3000/create-post' , formdata)
    .then((res)=>{
      navigate('/feed')
      alert("data upload successfully")
    })
    .catch((err)=>{
      alert(err)
    })
  }
  return (
    <div className='w-full  h-full flex flex-col justify-center items-center text-center p-10'>
     <div className='w-full h-full'>
       <h1 className='font-bold mb-3.5 text-4xl'>Add Post...</h1>
       </div> 
       <div className='p-1.5 w-full h-full'>

  
       <form className='flex flex-col' onSubmit={handle_submit}>
        <input className='border rounded-[3px] p-1.5 mb-3.5' type="file" name="image"  accept='image/*'/>
        <input className='border mb-3.5 rounded-[3px] p-1.5' type="text" name='caption' placeholder='Enter Caption Here' required />
        <button type='submit' className='border w-[100px] rounded-[3px] p-1.5'>ADD</button>
       </form>


       </div>
    </div>
  )
}

export default Create
