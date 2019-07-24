import React, { ReactNode } from "react";

import "./FlexDiv.css";

export interface Props {
    children: ReactNode
}

const FlexDiv = ({children}:Props) => (
    <div className="flex">
        {children}
    </div>
)

export default FlexDiv;