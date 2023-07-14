import React,{ useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getBlogs, like } from "../../api/internal";
import styles from "./Blog.module.css";
import { useNavigate } from "react-router-dom";
import likeicon from '../../assets/images/like.png'
import unlikeicon from '../../assets/images/unlike.png'
import commenticon from '../../assets/images/commenticon.png'
import Error from "../Error/Error";
import { useSelector } from "react-redux";

function AuthorsWhoLiked({authorsWhoLiked}){
  return (
    <ul className={styles.left}>
      {authorsWhoLiked.length === 0 ?
      <li>None</li>
      :
      authorsWhoLiked.length>0 &&
        authorsWhoLiked.map(auth => (
          <li key={auth._id}>{auth.name}</li>
        ))
      }
    </ul>
  )
}

function AuthorsWhoCommented({authorsWhoCommented}){
  return (
    <ul className={styles.right}>
      {authorsWhoCommented.length === 0 ?
      <li>None</li>
      :
      authorsWhoCommented.length>0 &&
        authorsWhoCommented.map(auth => (
          <li key={auth._id}>{auth.name}</li>
        ))
      }
    </ul>
  )
}

function Blog() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(false);
  const userId = useSelector((state) => state.user._id);
  const [message, setMessage] = useState(null);

  const getAllBlogsApiCall = async() => {
    setLoading(true);
    let response = await getBlogs(userId);

    if (response.status === 200) {
      setBlogs(response.data.blogs);
    }
    else{
      setMessage(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllBlogsApiCall();

    setBlogs([]);
  }, []);

  const onHover=(index, value, ego)=>{
    if(ego === 'com'){
      const data = [...blogs];
      data[index].hoverComment = value;
      setBlogs(data);
    }
    else if(ego === 'like'){
      const data = [...blogs];
      data[index].hoverLike = value;
      setBlogs(data);
    }
  }
  
  if (loading) {
    return <Loader text="blogs" />;
  }
  else if(message){
    return <Error errmessage={message.response.data.message} />;
  }

  return (
    <div className={styles.blogsWrapper}>
      {blogs.map((blog,index) => (
        <div
          key={blog._id}
          className={styles.blog}
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          {blog.hoverLike && <AuthorsWhoLiked authorsWhoLiked={blog.authorsWhoLiked}/>}
          {blog.hoverComment && <AuthorsWhoCommented authorsWhoCommented={blog.authorsWhoCommented}/>}
          <h1>{blog.title}</h1>
          <img className={styles.photo} src={blog.photo} alt={blog.title} />
          <p>{blog.content}</p>
          <div className={styles.activityWrapper}>
            <div className={styles.likebutton} onMouseEnter={() => onHover(index, true, 'like')} onMouseLeave={() => onHover(index, false, 'like')}>
              <button>
                <img src={blog.authorLike ? likeicon : unlikeicon} alt='like_button'/>
              </button>
              <span>{blog.likesCount}</span>
            </div>
            <div className={styles.commentbutton} onMouseEnter={() => onHover(index, true, 'com')} onMouseLeave={() => onHover(index, false, 'com')}>
              <span>{blog.commentsCount}</span>
              <button>
                <img src={commenticon} alt='comment_button'/>
              </button>
            </div>
          </div>
        </div>
      ))}
      {blogs.length === 0 && <span>No Blogs Found</span>}
    </div>
  )
}

export default Blog