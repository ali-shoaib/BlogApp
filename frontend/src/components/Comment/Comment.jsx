import React from 'react'
import styles from "./Comment.module.css";
import { showDate } from '../../reusable/showDate';

function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author_date_wrapper}>
            <div className={styles.author}>{comment.authorUsername}</div>
            <div className={styles.date}>{showDate(comment.createdAt)}</div>
        </div>
        <div className={styles.commentText}>{comment.content}</div>
      </div>
    </div>
  )
}

export default Comment