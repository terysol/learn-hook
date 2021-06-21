import React, { Component, useState } from "react"
import ReactDOM from "react-dom"

class Accordion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expanded1: false,
            expanded2: false,
            expanded3: false,
        }
    }

    handleClick=()=>{
        this.setState((state)=>({
            expanded1:!state.expanded1
        }))
    }

    render() {
        const {title,content} = this.props.items
        return(
            <ol>
                {this.props.items.map((item)=>{
                    return(
                        <>
                            <button onClick={this.handleClick}>{item.title}</button><br/>
                            {this.state.expanded1 ? <p>{item.content}</p> : null}
                        </>
                    )
                })}

            </ol>
        )
    }
}
const items = [
    { title: '제목 1', content: '내용 1'},
    { title: '제목 2', content: '내용 2' },
    { title: '제목 3', content: '내용 3' },
]
ReactDOM.render(<Accordion items={items} />, document.getElementById("root"))