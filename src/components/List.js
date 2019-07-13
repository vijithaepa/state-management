import React from 'react'

const List = (props) => {
    return (
        <ul>
            {props.items.map((item, index) => {
                return <li key={index}>
                        <span onClick={() => props.toggleItem && props.toggleItem(item)}
                              style={{textDecoration: item.complete ? 'line-through' : 'none'}}>
                            {item.name}</span>
                    <button onClick={() => props.removeItem(item)}>x</button>
                </li>
            })}

        </ul>
    )
}

export default List
