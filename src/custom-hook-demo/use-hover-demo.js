import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom";

function useHover() {
    // 내부적으로 useState 훅 사용하여 현재 호버 여부를 저장
    const [value, setValue] = useState(false);
    // 호버 이벤트가 발생할 DOM 요소를 저장할 ref
    const ref = useRef(null);

    // hover 상태에 따라서 상태를 true, false로 변경
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            // 노드가 정상적으로 존재할 경우 mouseover, mouseout 이벤트 핸들러 설정
            if (node) {
                node.addEventListener("mouseover", handleMouseOver);
                node.addEventListener("mouseout", handleMouseOut);
                return () => {
                    node.removeEventListener("mouseover", handleMouseOver);
                    node.removeEventListener("mouseout", handleMouseOut);
                };
            }
        },
        // 호버 여부를 검사할 DOM 요소가 변경될 경우에만 다시 이벤트 설정하도록 의존 배열 설정
        [ref.current]
    );
    return [ref, value];
}

function App() {
    // 처음 useHover사용시 hoverRef가 null이므로 DOM 요소와 연결 필요
    const [faceHoverRef, isFaceHovered] = useHover();
    // 필요한만큼 호출 가능
    const [colorHoverRef, isColorBoxHovered] = useHover();

    return (
        <div>
            <div ref={faceHoverRef} style={{ fontSize: "80px"}} >{isFaceHovered ? "😁" : "☹️"}</div>
            <div ref={colorHoverRef} style={{ width: "100px", height: "100px", background: `${isColorBoxHovered ? 'yellow' : 'lightgray'}` }}>
                {isColorBoxHovered ? <span>hovered</span> : <span>not hovered</span>}
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));