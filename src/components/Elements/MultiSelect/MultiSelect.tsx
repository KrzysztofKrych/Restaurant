import React, { Fragment, useState } from 'react';

import Option from '../../../api/models/Option';
import Input from '../Input/Input';
import useClickAwayListener from '../../../hooks/useClickAwayListener/useClickAwayListener'
import Button from '../Button/Button';

import './MultiSelect.css';

export interface Props {
    options: Option[];
    text: string;
    onChange: (id: string, containerId: string) => void
}

const MultiSelect = ({options, text, onChange}: Props) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useClickAwayListener(false);
    const [search, setSearch] = useState("");

    const handleOpenSelect = () => {
        setIsComponentVisible(!isComponentVisible);
    }

    const handleClick = (id: string, containerId: string) => {
        onChange(id, containerId);
    }

    const createOption = (option: Option, index: number) => 
        <div key={index} 
            className={`option ${option.checked ? 'checked' : ''}`} 
            onClick={() => handleClick(option.id, option.containerId || '-1')}>
            <div>{option.name}</div>
        </div> 
    
        

    return (
        <div className="multiselect-container" ref={ref}>
            <Button onClick={handleOpenSelect}>{text}</Button>
            <div className="multiselect">
            {isComponentVisible && 
            <Fragment>
                <div className="option input">
                    <Input 
                        type="text" 
                        placeholder="type to search..." 
                        onChange={(event) => setSearch(event.target.value)}/>
                </div>
                {options.map((option:Option, index: number) => 
                    option.name.includes(search) && createOption(option, index)
                )}
            </Fragment>}
            </div>
        </div>
    )

}

export default MultiSelect;