import React, { ReactNode } from "react";
import "./Button.css";

export interface Props {
    onClick?: (event: React.MouseEvent) => void
    children: ReactNode
    variant?: string
}

const Button = ({onClick, children, variant}: Props) => (
    <button 
    className={`button ${variant}`} 
    onClick={onClick}>
    {children}</button>
)

export default Button;