import React, { useState } from 'react';
import styles from "./Articles.module.css";
import TextInput from '../../components/TextInput/TextInput';

function SearchedArticles({data, handleCardClick}){
    if(data?.length > 0){
        return data.map(ar => (
            <div className={styles.card} key={ar.url} onClick={() => handleCardClick(ar.url)}>
              <img src={ar.urlToImage} alt={ar.title}/>
              <h3>{ar.title}</h3>
            </div>
        ))
    }
    else{
        return <p className={styles.nodatafound}>No Data found</p>
    }
}

function Articles({articles}) {
    const handleCardClick=(url)=>{
        window.open(url,"_blank");
    }

    const [data, setData] = useState(null);
    const [value, setValue] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleSearchText=(e)=>{
        clearTimeout(searchTimeout);
        setValue(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const arr = articles.filter(x => x.title.toLowerCase().includes(value.toLowerCase()));
                setData(arr);
            },1000)
        )
    }

  return (
    <>
    <TextInput
    name="searchbloginput"
    placeholder="Search Blog..."
    value={value}
    onChange={handleSearchText}
    />
    <div className={styles.grid}>
    {value ?
    <SearchedArticles data={data} handleCardClick={handleCardClick}/>:
    <SearchedArticles data={articles} handleCardClick={handleCardClick}/>
    }
    </div>
    </>
  )
}

export default Articles;