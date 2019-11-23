import React from 'react';
import './Switcher.css';
export interface Props{
    checked: boolean
    onChange: () => void
}

const Switcher = ({checked, onChange}: Props) => (
    <div className="container">
        <label className={`switch ${checked ? 'checked' : ''}`}>
            <input type="checkbox" checked={checked} onChange={onChange} /> 
            <div></div>
        </label>
    </div>
)

export default Switcher;