import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {API_KEY} from "./apikey";

const Search =({handleSearch, label})=>{           // props 안 쓰고 싶을 때 비구조할당
    const [keyword,setKeyword] = useState('')
    const ref=useRef()   // ref -> dom 요소를 저장하고 rendering을 다시 유발하지 않음
    // 제어 컴포넌트, 비제어 컴포넌트(ref)

    return(
        <div>
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>{
                const k= keyword.trim()
                k.length === 0? alert('검색어를 정확히 입력해주세요.') : handleSearch(k)
            }}>{label ??"검색"}</button>
        </div>
        // label 값이 있으면 props 값을 사용하고 없으면 "검색"으로 사용
    )
}
const NewsItem=(props)=>{
    const {title, description, url, urlToImage} = props.article
    return(
        <div>
            <h1><a href={url} target='_blank'>{title}</a></h1>
            <img style={{height: '100px'}} src={urlToImage}/>
            <p>{description}</p>
        </div>
    )
}

const NewsList=({article})=>{
    return(
        <ul>
            {
                article.map((article, idx) => {
                    return (<li key={idx}>
                        <NewsItem article={article} />
                    </li>)
                })
            }
        </ul>
    )
}
const NewsApp = () => {
    const [query, setQuery]=useState(null)
    const [articles,setArticles]=useState([])

    useEffect(()=>{
        if(query){
            fetch(`http://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${query}`)
                .then(res => res.json())
                .then(data => {
                    // 데이터 설정 및 로딩 상태 갱신
                    setArticles(data.articles)
                })
        }
    },[query])

    return(
        <div>
            <Search label="찾기" handleSearch={setQuery}/>
            <NewsList article={articles}/>
        </div>
    )
}
ReactDOM.render(<NewsApp />, document.getElementById("root"))

// JSON.stringify(articles,null,2)   =>