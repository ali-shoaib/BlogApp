import styles from "./AuthorsList.module.css";

function AuthorsList({authors, loading}){
    return (
        <ul className={styles.wrapper}>
            {loading?
            <li>Loading</li>
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