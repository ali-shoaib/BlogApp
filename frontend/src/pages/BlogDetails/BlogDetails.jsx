import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  deleteBlog,
  postComment,
  getCommentsById,
  like,
  getLikesById,
} from "../../api/internal";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./BlogDetails.module.css";
import CommentList from "../../components/CommentList/CommentList";
import Error from "../Error/Error";
import { showDate } from "../../reusable/showDate";
import likeicon from '../../assets/images/like.png'
import unlikeicon from '../../assets/images/unlike.png'

function BlogDetails() {
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const [likes,setLikes] = useState([]);
  const [showLike,setShowLike] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const blogId = params.id;

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    getBlogDetails();
  }, [reload]);

  async function getBlogDetails() {
    const likeResponse = await getLikesById(blogId);
    if (likeResponse.status === 200) {

      const data = likeResponse?.data?.data;

      // for(let i=0; i<likes.length; i++){
      //   if(likes[i].authorid === userId){
      //     setShowLike(true);
      //   }
      // }
      data.forEach(x => {
        if(x.authorid === userId && x.like){
          setShowLike(true)
        }
      })

      setLikes(data);
    }

    const commentResponse = await getCommentsById(blogId);
    if (commentResponse.status === 200) {
      setComments(commentResponse.data.data);
    }

    const blogResponse = await getBlogById(blogId);
    if (blogResponse.status === 200) {
      // set ownership
      setOwnsBlog(username === blogResponse.data.blog.authorUsername);
      setBlog(blogResponse.data.blog);
    }
    else{
      setBlog(blogResponse);
    }
  }


  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    };

    const response = await postComment(data);

    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };

  const likeHandler = async () => {
    setShowLike(!showLike);
    const data = {
      like:!showLike,
      author: userId,
      blog: blogId,
    }

    const response = await like(data);

    if (response.status === 201) {
      setReload(!reload);
    }
  }

  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);

    if (response.status === 200) {
      navigate("/");
    }
  };

  if (blog.length === 0) {
    return <Loader text="blog details" />;
  }
  else if(blog.code){
    return <Error errmessage={blog.message}/>
  }

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.left}>
        {ownsBlog && <button onClick={()=>setShow(!show)} className={styles.options}>...</button>}
        {show && (
          <div className={styles.optionlist}>
            <button
              className={styles.editButton}
              onClick={() => {
                navigate(`/blog-update/${blog._id}`);
              }}
            >Edit</button>
            <button
              className={styles.deleteButton}
              onClick={deleteBlogHandler}
            >Delete</button>
          </div>        
        )}
        <p className={styles.postInfo}>@{blog.authorUsername}</p>
        <p className={styles.postInfo}>{showDate(blog.createdAt)}</p>
        <div className={styles.photo}>
          <img src={blog.photo} width={350} height={350} />
        </div>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.content}>{blog.content}</p>
      </div>
      <div className={styles.right}>
        <CommentList comments={comments} />
        <div className={styles.postComment}>
          <button className={styles.likebutton} onClick={likeHandler}>
            <img src={showLike===true ? likeicon : unlikeicon} className={styles.like} alt='like_button'/>
          </button>
          <input
            className={styles.input}
            placeholder="comment goes here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className={styles.postCommentButton}
            onClick={postCommentHandler}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;