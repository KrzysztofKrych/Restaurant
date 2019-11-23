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
            <li onClick={() => handleClick("ordersList")}>Orders</li>
            <li onClick={() => handleClick("ingredientsList")}>Ingredients</li>
            <li onClick={() => handleClick("dishesList")}>Dishes</li>
            <li onClick={() => handleClick("history")}>History</li>
        </ul>
    )
}

export default Menu;