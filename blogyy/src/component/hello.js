import React, { useEffect, useState } from 'react'
import axios from "axios";
import BlogBox from './blogBox';
function Hello() {
    const [tab, setTab] = useState("");
    const[posts,setPosts]=useState(null);
    const handleAllClick = () => setTab("");
    const handleTechClick = () => setTab("meow2");
    const handleSportsClick = () => setTab("meow1");
    const handleFashClick = () => setTab("fash");
    const handleTravClick = () => setTab("trav");

    useEffect(()=>{
        axios.get(`http://localhost:4000/getPosts/${tab}`)
        .then(response=>{
            setPosts(response.data);
            console.log(response.data)
        })
        .catch((err)=>{console.log(err)})
    },[tab])
    return (
        <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-row gap-3'>
                <button onClick={handleAllClick} className='text-xl font-semibold text-gray-600 focus:bg-blue-500 focus:text-white p-1 rounded-2xl w-[3vw]'>All</button>
                <button onClick={handleTechClick} className='text-xl font-semibold text-gray-600 focus:bg-blue-500 focus:text-white p-1 rounded-2xl w-[8vw]'>Technology</button>
                <button onClick={handleSportsClick} className='text-xl font-semibold text-gray-600 focus:bg-blue-500 focus:text-white p-1 rounded-2xl w-[5vw]'>Sports</button>
                <button onClick={handleFashClick} className='text-xl font-semibold text-gray-600 focus:bg-blue-500 focus:text-white p-1 rounded-2xl w-[7vw]'>Fashion</button>
                <button onClick={handleTravClick} className='text-xl font-semibold text-gray-600 focus:bg-blue-500 focus:text-white p-1 rounded-2xl w-[6vw]'>Travel</button>
            </div>
            <div className='flex flex-row flex-wrap gap-3'>
        {   posts?.map((post)=>(
            <BlogBox 
            image={post?.image} 
            cate={post?.category} 
            title={post?.title} 
            desc={post?.desc}/>
        ))         
            

        }</div>
        </div>
    );
}

export default Hello;
