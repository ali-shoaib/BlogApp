import styles from "./AuthorsList.module.css";

function AuthorsList({authors}){
    return (
        <ul className={styles.wrapper}>
            {authors.length === 0 ?
            <li>None</li>
            : 
            authors.length>0 &&
                authors.map(auth => (
                    <li key={auth._id}>{auth.name}</li>
                ))
            }
        </ul>
    )
}

export default AuthorsList;