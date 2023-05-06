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
    useEffect(()=>{
        axios.get(`http://localhost:4000/getPosts/${tab}`)
        .then(response=>{
            setPosts(response.data);
            console.log(response.data)
        })
        .catch((err)=>{console.log(err)})
    },[tab])
    return (
        <div>
            <div className='flex flex-row gap-3'>
                <button onClick={handleAllClick}>All</button>
                <button onClick={handleTechClick}>Technology</button>
                <button onClick={handleSportsClick}>Sports</button>
                <button onClick={handleFashClick}>Fashion</button>
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
