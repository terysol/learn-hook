// const { 남은시간, 재개함수, 멈춤함수 } = useTimer(타이머시간)
// =>
// 1초마다 남은 시간이 time으로 전달되며,
// pause 함수를 호출하여 타이머를 멈추고,
// resume을 이용해서 타이머를 재개 가능
// useTimer의 인자값으로 초기 타이머 시간(ex: 5초)를 전달
// 정해진 시간(ex: 5초)이 다 지나면, 이후에는 time이 더 이상 새로 갱신되지 않고 그대로 0으로 남아있으면 됨

import React, { useState, useRef, useEffect,useCallback } from 'react';
import ReactDOM from "react-dom";

const useTimer=(initialTime=10) => {
    const [time, setTime] = useState(initialTime)
    const id = useRef(null)

    let resume=()=>{
        id.current=setInterval(()=>{
            setTime(time => time-1)
        },1000)
    }

    let pause = ()=>{
        clearInterval(id.current)
    }

    if(time === 0){
        pause()
        resume=()=>{}
        pause=()=>{}
    }

    // 마운트 할 때 실행
    useEffect(()=>{
        resume();

        return pause
    },[])

    return {time,resume,pause}
}

function AppUsingTimer1() {
    const { time, resume, pause } = useTimer(5)

    return (
        <div>
            <p>time : {time}</p>
            {time === 0 ? null :
                <>
                    <button onClick={resume}>resume</button><br />
                    <button onClick={pause}>pause</button>
                </>
            }
        </div>
    )
}

function AppUsingTimer2() {
    const initTime = 5
    const { time } = useTimer(initTime)
    const style = { background: 'red', height: '50px', width: `${(time/initTime) * 100}%`}
    return <div style={style}></div>
}

ReactDOM.render(<AppUsingTimer1 />,
                document.getElementById("root"));