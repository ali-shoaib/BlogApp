import React,{ useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getBlogs, like } from "../../api/internal";
import styles from "./Blog.module.css";
import { useNavigate } from "react-router-dom";
import likeicon from '../../assets/images/like.png'
import unlikeicon from '../../assets/images/unlike.png'
import commenticon from '../../assets/images/commenticon.png'
import Error from "../Error/Error";
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { useSelector } from "react-redux";

function Blog() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [showLike,setShowLike] = useState(false);

  const userId = useSelector((state) => state.user._id);

  const getAllBlogsApiCall = async() => {
    const response = await getBlogs(userId);

    if (response.status === 200) {
      console.log(response.data.blogs);
      setBlogs(response.data.blogs);
    }
  }

  useEffect(() => {
    getAllBlogsApiCall();

    setBlogs([]);
  }, []);

  const onHover=(index, value)=>{
    const data = [...blogs];
    data[index].hover = value;
    setBlogs(data);
  }

  if (blogs.length === 0) {
    return <Loader text="blogs" />;
  }
  else if(blogs.code){
    return <Error errmessage={blogs.message}/>
  }
  return (
    <div className={styles.blogsWrapper}>
      {blogs.map((blog,index) => (
        <div
          key={blog._id}
          className={styles.blog}
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          {blog.hover && <AuthorsList authors={blog.authorsWhoLiked}/>}
          <h1>{blog.title}</h1>
          <img className={styles.photo} src={blog.photo} alt={blog.title} />
          <p>{blog.content}</p>
          <div className={styles.activityWrapper}>
            <div className={styles.likebutton}>
              <button>
                <img src={blog.authorLike ? likeicon : unlikeicon} alt='like_button'/>
              </button>
              <span onMouseEnter={() => onHover(index, true)} onMouseLeave={() => onHover(index, false)}>{blog.likesCount}</span>
            </div>
            <div className={styles.commentbutton}>
              <span>{blog.commentsCount}</span>
              <button>
                <img src={commenticon} alt='comment_button'/>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blog