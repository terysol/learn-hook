import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
// create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const UseRefDemo = (props) => {
    const forceUpdate = useForceUpdate()
    // input 요소를 저장하기 위한 ref 객체 생성
    const ref1 = useRef()
    // 숫자를 저장하기 위한 ref 객체 생성 (초기값을 파라미터로 전달 가능, 안 전달하면 current 값은 undefined)
    const ref2 = useRef(0)
    // "ref2 change" 버튼을 눌러서 ref2 값이 변경되어도 다시 render 되지 않음(=함수가 재호출되지 않음) 유의!
    console.log('render')

    return (
        <div>
            {/* ref 속성을 이용하여 생성한 ref1 객체 연결 */}
            <input type="text" ref={ref1} />
            <br />
            <button onClick={() => {
                // ref1.current를 통해 요소 접근 가능
                console.log(ref1.current)
                console.log(ref1.current.value)
                ref1.current.focus()
            }}>ref1 log and focus</button>
            <hr />
            <p>ref2 : {ref2.current}</p>
            <button onClick={() => {
                // ref 값이 변경 가능하지만, 값이 변경되었다고 해서 (마치, useState에서 반환하는 세터 함수를 호출한 것마냥) 함수가 재호출되지는 않음을 유의!
                ref2.current = ref2.current + 1
                console.log(ref2.current)
            }}>ref2 change</button>
            <br />
            <button onClick={() => {
                forceUpdate()
            }}>force update</button>
        </div>
    )
}

ReactDOM.render(<UseRefDemo />, document.getElementById("root"));