import React from 'react';
import "./Menu.css"

export interface Props {
    onClick: (element: string) => void
}

const Menu = ({onClick}: Props) => {

    const handleClick = (element: string) => {
        onClick(element);
    }

    return (
        <ul className="left-panel-menu">
            <li onClick={() => handleClick("newOrder")}>New Order</li>
            <li onClick={() => handleClick("menu")}>Menu</li>
        </ul>
    )
}

export default Menu;