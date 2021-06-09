import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {API_KEY} from "./apikey";

// 검색창 -> useEffect()에서
const NewsItem = (props) => {
    const {title, description, url, urlToImage} = props.article

    return (
        <div>
            <h1><a href={url} target='_blank'>{title}</a></h1>
            <img style={{height: '100px'}} src={urlToImage}/>
            <p>{description}</p>
        </div>
    )
}

const Search = (props)=>{
    const [searchKey,setSearchKey] = useState('');

    const handleSearch=()=>{
        props.loading(true);
        // 초기에 한 번만 API를 통해서 뉴스 데이터 읽어오기
        fetch(`http://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}&q=${searchKey}`)
            .then(res => res.json())
            .then(data => {
                // 데이터 설정 및 로딩 상태 갱신
                props.articles(data.articles)
                props.loading(false)
            })
    }
    return(
        <div>
            <input type="text" value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}}/>
            <button onClick={handleSearch}>검색</button>
        </div>
    )
}

const NewsApp = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        // 초기에 한 번만 API를 통해서 뉴스 데이터 읽어오기
        fetch(`http://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                // 데이터 설정 및 로딩 상태 갱신
                setArticles(data.articles)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <Search loading ={setLoading} articles={setArticles} />
            {
                articles.length === 0
                    ? loading ? <h1>뉴스를 불러오는 중입니다.</h1> : <h1>표시할 뉴스가 없습니다.</h1>
                    :
                    <ul>
                        {
                            articles.map((article, idx) => {
                                return (<li key={idx}>
                                    <NewsItem article={article} />
                                </li>)
                            })
                        }
                    </ul>
            }
        </div>
    )
}

ReactDOM.render(<NewsApp />, document.getElementById("root"))