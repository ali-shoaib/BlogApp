import React from 'react'
import styles from "./Comment.module.css";

function Comment({ comment }) {
    const date = new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    // toLocaleDateString
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author_date_wrapper}>
            <div className={styles.author}>{comment.authorUsername}</div>
            <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.commentText}>{comment.content}</div>
      </div>
    </div>
  )
}

export default Comment