import React from "react";

import OrderCreator from "../OrderCreator/OrderCreator";
import IngredientsMenu from "../IngredientsMenu/IngredientsMenu";
import "./Content.css"
import OrdersList from "../OrderList/OrderList";
import DishesList from "../DishesList/DishesList";
import ArchivedOrders from "../ArchivedOrders/ArchivedOrders";
import Settings from "../Settings/Settings";

export interface Props{
    show: string
}

const Content = ({show}: Props) => {
    return (
        <div className="content">
            {show === "newOrder" && <OrderCreator />}
            {show === "ordersList" && <OrdersList />}
            {show === "ingredientsList" && <IngredientsMenu />}
            {show === "dishesList" && <DishesList />}
            {show === "history" && <ArchivedOrders />}
            {show === "settings" && <Settings />}
        </div>
    )
}

export default Content;