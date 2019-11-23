import React, { CSSProperties } from "react";

import "./Input.css";

export interface Props {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string | number
    style?: CSSProperties
    className?: string
    placeholder?: string
    size?: string 
    type?: string
    accept? :string
    disabled?: boolean
    name?:string
    checked?:boolean
}

const Input = ({onChange, value, style, className, placeholder, size, type = "text", accept, disabled, checked}:Props) => (
    <input 
    className={`${className} input ${size}`}
    onChange={onChange} 
    value={value}
    style={style}
    placeholder={placeholder}
    type={type}
    disabled={disabled}
    accept={accept}
    checked={checked}
     />
)

export default Input;