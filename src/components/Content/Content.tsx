import React, { Fragment } from "react";

import OrderCreator from "../OrderCreator/OrderCreator";

export interface Props{
    show: string
}

const Content = ({show}: Props) => {
    return (
        <Fragment>
            {show === "newOrder" && <OrderCreator />}
            <div>Content</div>
        </Fragment>
    )
}

export default Content;