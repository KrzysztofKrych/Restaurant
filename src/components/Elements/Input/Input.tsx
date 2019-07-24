import React, { CSSProperties } from "react";

import "./Input.css";

export interface Props {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string | number
    style?: CSSProperties
    className?: string
    placeholder?: string
    size?: string 
}

const Input = ({onChange, value, style, className, placeholder, size}:Props) => (
    <input 
    className={`${className} input ${size}`}
    onChange={onChange} 
    value={value}
    style={style}
    placeholder={placeholder} />
)

export default Input;