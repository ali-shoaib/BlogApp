import styles from "./AuthorsList.module.css";

function AuthorsList({likeauthors,comauthors, id}){
    return (
        <>
        {id ===1 &&
                <ul className={styles.left}>
                {likeauthors.length === 0 ?
                <li>None</li>
                :
                likeauthors.length>0 &&
                    likeauthors.map(auth => (
                        <li key={auth._id}>{auth.name}</li>
                    ))
                }
            </ul>
        }

        {id ===2 &&
                <ul className={styles.right}>
                {comauthors.length === 0 ?
                <li>None</li>
                :
                comauthors.length>0 &&
                    comauthors.map(auth => (
                        <li key={auth._id}>{auth.name}</li>
                    ))
                }
            </ul>
        }
        </>
    )
}

export default AuthorsList;