import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPost = ({ match }) => {
  const [blogPost, setBlogPost] = useState({});

  useEffect(() => {
    axios.get(`/${match.params.id}`)
      .then(res => {
        setBlogPost(res.data);
      })
      .catch(err => console.log(err));
  }, [match.params.id]);

  return (
    <div className='w-[50vw]'>
    <img src={blogPost.image} alt="part_img" />
      <h2>{blogPost.title}</h2>
      <p>{blogPost.description}</p>
      <p>{blogPost.category}</p>
    </div>
  );
};

export default BlogPost;
