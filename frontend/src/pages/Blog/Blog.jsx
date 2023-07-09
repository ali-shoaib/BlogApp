import React,{ useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getBlogs, getAllAuthorsWhoLiked } from "../../api/internal";
import styles from "./Blog.module.css";
import { useNavigate } from "react-router-dom";
import likeicon from '../../assets/images/like.png'
import unlikeicon from '../../assets/images/unlike.png'
import commenticon from '../../assets/images/commenticon.png'
import Error from "../Error/Error";
import AuthorsList from '../../components/AuthorsList/AuthorsList';

function Blog() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const response = await getBlogs();

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    })();

    setBlogs([]);
  }, []);

  const getAllAuthors = async(blogid) => {

    let body={
      blog: blogid
    }

    const response = await getAllAuthorsWhoLiked(body);

    if(response.status === 200){
      setAuthors(response.data?.authors);
    }
  }

  if (blogs.length === 0) {
    return <Loader text="blogs" />;
  }
  else if(blogs.code){
    return <Error errmessage={blogs.message}/>
  }
  return (
    <div className={styles.blogsWrapper}>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className={styles.blog}
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          {authors.length !== 0 && blog._id === authors[0].blog && <AuthorsList authors={authors}/>}
          <h1>{blog.title}</h1>
          <img className={styles.photo} src={blog.photo} alt={blog.title} />
          <p>{blog.content}</p>
          <div className={styles.activityWrapper}>
            <div className={styles.likebutton}>
              <button>
                <img src={unlikeicon} alt='like_button'/>
              </button>
              <span onMouseEnter={() => getAllAuthors(blog._id)} onMouseLeave={() => setAuthors([])}>{blog.likesCount}</span>
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