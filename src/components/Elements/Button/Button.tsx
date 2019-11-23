import React, { ReactNode } from "react";
import "./Button.css";

export interface Props {
    onClick?: (event: React.MouseEvent) => void
    children: ReactNode
    variant?: string
    disabled?: boolean
}

const Button = ({onClick, children, variant, disabled}: Props) => (
    <button 
    className={`button ${variant} ${disabled ? "disabled" : ""}`} 
    onClick={onClick}
    disabled={disabled}>
    {children}</button>
)

export default Button;