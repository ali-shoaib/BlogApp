import React,{useEffect, useState} from 'react'
import styles from "./Comment.module.css";
import { showDate } from '../../reusable/showDate';
import { useSelector } from "react-redux";
import { updateComment } from "../../api/internal";

function Comment({ comment, reload, setReload }) {
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  const username = useSelector((state) => state.user.username);
  const userid = useSelector((state) => state.user._id);

  useEffect(()=>{
    setOwnsBlog(username === comment.authorUsername);
  },[])

  const getClass = () => {
    if (!show) return "";
    return styles.active;
  };

  const enableEdit = (id) => {
    if(comment._id === id){
      setShowInput(true);
      setValue(comment.content);
    }
  }

  const submitUpdate = async() => {
    let data = {
      id: comment._id,
      content: value,
      author: userid
    }

    let response = await updateComment(data);

    if (response.status === 200) {
      setShowInput(false);
      setReload(!reload);
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author_date_wrapper}>
            <div className={styles.author}>{comment.authorUsername}</div>
            <div className={styles.date}>{showDate(comment.createdAt)}</div>
        </div>
        <div className={styles.commentTextWrapper}>
          {showInput ?
          <div className={styles.inputWrapper}>
            <input type='text' value={value} onChange={e => setValue(e.target.value)}/>
            <button onClick={submitUpdate}>Update</button>
            <button onClick={()=>setShowInput(false)}>Cancel</button>
          </div>
          :
          <div className={styles.commentText}>{comment.content}</div>
          }
          {ownsBlog ?
          <>
            <button className={styles.options} onClick={()=>setShow(!show)}>...</button>
              <li className={`${styles.optionsList} ${getClass()}`} onClick={() => enableEdit(comment._id)}>Edit</li>
          </>
          :
          null}
        </div>
      </div>
    </div>
  )
}

export default Comment