import React, { useEffect, useState } from 'react'
import { getNews } from '../../api/external';
import styles from "./Home.module.css";
import Loader from '../../components/Loader/Loader';
import Articles from '../../components/Articles/Articles';
import Error from '../Error/Error';

function Home() {
  const [articles,setArticles]=useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    (async function newsApiCall(){
      setLoading(true);
      const response = await getNews();
      setArticles(response);
      setLoading(false);
    })()

    setArticles([]);
  },[])

  if(loading){
    return <Loader text="homepage"/>;
  }
  else if(articles.code){
    return <Error errmessage={articles.message}/>
  }
  
  return (
    <>
    <div className={styles.header}>Latest Articles</div>
    <Articles articles={articles}/>
    </>
  )
}

export default Home