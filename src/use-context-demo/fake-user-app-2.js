import React, { useState, useContext, createContext } from "react"
import ReactDOM from "react-dom"

// Q1. 로그인 버튼으로 로그아웃으로 되게 하기
const LoginUserContext = createContext(null)

const UserButton=()=>{
    const { loginUser,setLoginUser } = useContext(LoginUserContext)
    const [ fetching, setFetching ] = useState(false)    // 로그인 정보를 가져왔는지 아닌지 알려주는
    const [ error, setError ] = useState(false)

    const handleLogin=()=>{
        // alert('handle login')
        setFetching(true)

        fetch('https://randomuser.me/api/', { headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                const login = data.results[0].login

                setFetching(false)
                setLoginUser({
                    picture: data.results[0].picture.large,
                    username: login.username,
                    email: data.results[0].email,
                    cell: data.results[0].cell,
                });
            })
            .catch(e=>{
                setError(e)
            })
    }
    if(fetching){
        return(<div>fetching...</div>)
    }

    if(error){
        return(<div>{error.message}</div>)
    }

    const handleLogout=()=>{        // 로그아웃일 때는 USER가 NULL로
        setLoginUser(null)
    }
    return(
        <div>
          {
              loginUser === null?
                  <button onClick={handleLogin}>Login</button> :
                  <div>
                      <button onClick={handleLogout}>Logout</button>
                      <img src={loginUser.picture} style={{ borderRadius: '50%',width:50 }}/>
                      <span>username: {loginUser.username}</span>
                      <span>email: {loginUser.email}</span>
                      <span>cell: {loginUser.cell}</span>
                  </div>
          }
        </div>
    )
}


function App() {
    const [ loginUser, setLoginUser ] = useState(null)

    return (
        <LoginUserContext.Provider value={ { loginUser, setLoginUser } }>
           <UserButton/>
        </LoginUserContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));