import React, { ReactNode } from "react";

import "./FlexDiv.css";

export interface Props {
    children: ReactNode;
    className?: string
}

const FlexDiv = ({children, className}:Props) => (
    <div className={`flex ${className}`}>
        {children}
    </div>
)

export default FlexDiv;