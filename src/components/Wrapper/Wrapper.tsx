import React, { ReactChildren, ReactNode } from 'react';
import "./Wrapper.css";

export interface Props {
    children: ReactNode | ReactChildren
}

const Wrapper = ({children}: Props) => {
    return (
        <div className="wrapper">
            {children}
        </div>
    )
}

export default Wrapper;