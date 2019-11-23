import React from "react";

import "./Avatar.css";

export interface Props { 
    url: string
}

const Avatar = ({url}: Props) => (
    <div className="avatar" style={{backgroundImage:`url(${url})`}}></div>
)


export default Avatar;