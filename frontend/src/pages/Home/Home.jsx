import React, { useEffect, useState } from 'react'
import { getNews } from '../../api/external';
import styles from "./Home.module.css";
import Loader from '../../components/Loader/Loader';

function Home() {
  const [articles,setArticles]=useState([]);

  useEffect(() => {
    (async function newsApiCall(){
      const response = await getNews();
      setArticles(response);
    })()

    setArticles([])
  },[])

  const handleCardClick=(url)=>{
    window.open(url,"_blank");
  }

  if(articles.length === 0){
    return <Loader text="homepage"/>;
  }
  return (
    <>
    <div className={styles.header}>Latest Articles</div>
    <div className={styles.grid}>
      {articles.map(ar => (
        <div className={styles.card} key={ar.url} onClick={() => handleCardClick(ar.url)}>
          <img src={ar.urlToImage}/>
          <h3>{ar.title}</h3>
        </div>
      ))}
    </div>
    </>
  )
}

export default Home