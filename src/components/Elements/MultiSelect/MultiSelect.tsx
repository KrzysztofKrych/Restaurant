import React, { Fragment, useEffect, useState, ChangeEvent } from 'react';

import Option from '../../../api/models/Option';
import Input from '../Input/Input';
import useClickAwayListener from '../../../hooks/useClickAwayListener/useClickAwayListener'
import Button from '../Button/Button';

import './MultiSelect.css';

export interface Props {
    options: Option[];
    text: string;
    onChange: (id: number, containerId: number ) => void
}

const MultiSelect = ({options, text, onChange}: Props) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useClickAwayListener(false);

    const handleOpenSelect = () => {
        setIsComponentVisible(!isComponentVisible);
    }

    const handleClick = (id: number, containerId: number) => {
        onChange(id, containerId);
    }

    return (
        <div className="multiselect-container" ref={ref}>
            <Button onClick={handleOpenSelect}>{text}</Button>
            <div className="multiselect">
            {isComponentVisible && options.map((option:Option, index: number) => 
                <div key={index} 
                    className={`option ${option.checked ? 'checked' : ''}`} 
                    onClick={() => handleClick(option.id, option.containerId || -1)}>
                    <div>{option.name}</div>
                </div>    
            )}
            </div>
        </div>
    )

}

export default MultiSelect;