import React from 'react'
import { useLocation } from 'react-router-dom'

function BlogDetails() {
    const location = useLocation();
    console.log("location => ",location);
  return (
    <div>BlogDetails</div>
  )
}

export default BlogDetails