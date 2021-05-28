import React, { useState } from "react"
import ReactDOM from "react-dom"
import './styles.css'

// 화살표 함수로 함수 정의 가능
const Theme = (props) => {
    const [theme, setTheme] = useState('light')

    // 상태값 변경 함수 정의  => 자식 컴포넌트에게 부모의 값을 변경할 수 있게 하기 위해서
    const toDark = () => setTheme('dark')
    const toLight = () => setTheme('light')

    return (
        <div className={`theme-div ${theme}`}>
            {/* onClick 속성을 통해 미리 정의한 상태 변경 함수 전달 */}
            {theme === "light"
                ? <button onClick={toDark}>🔦</button>
                : <button onClick={toLight}>💡</button>}
        </div>
    )
}

ReactDOM.render(<Theme />, document.getElementById("root"));