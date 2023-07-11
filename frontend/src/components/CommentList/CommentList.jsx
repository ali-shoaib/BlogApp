import React from 'react'
import Comment from '../Comment/Comment'
import styles from "./CommentList.module.css";

function CommentList({comments, setReload, reload}) {
  return (
    <div className={styles.commentListWrapper}>
        <div className={styles.commentList}>
            {comments.length > 0 ?
            comments.map(comment => (
              <Comment key={comment._id} comment={comment} setReload={setReload} reload={reload}/>
            ))
            :
            <div className={styles.noComments}>No Comment Yet</div>
            }
        </div>
    </div>
  )
}

export default CommentList