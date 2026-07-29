import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Feed() {
  const [post , setpost ] = useState([{
            "_id": "6a6501d9aeafdfa07fb8b53d",
            "image": "https://ik.imagekit.io/3ugydgo4w/img_R3CwJRI6p.jpg",
            "caption": "camera-girl"
        }])
   useEffect(()=>{
        axios.get('http://localhost:3000/feed')
        .then((res)=>{
            setpost(res.data.data)
        })
    },[])
  return (
    <div className='w-full h-full flex flex-col p-3.5'>
            {
                post.length > 0 ? (
                    post.map((post) => (
                        <div key={post._id} className='w-full mb-[20px] h-auto p-2.5 rounded-2xl bg-black text-white' >
                            <img src={post.image} className='w-[400px] h-[300px] object-cover rounded-2xl mb-1.5' alt="" />
                            <h1 className='text-2xl font-bold mb-1.5'>{post.caption}</h1>
                        </div>
                    ))
                ) : (
                    <h1>No Posts Available</h1>
                )
            }
        </div>
  )
}

export default Feed
