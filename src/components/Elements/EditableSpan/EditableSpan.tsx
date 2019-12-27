import React, { useState, Fragment } from 'react';
import Input from '../Input/Input';
import useOverflowText from '../../../hooks/useOverflowText/useOverflowText';
import "./EditableSpan.css";

export interface Props {
    text: string
    onChange: (name: string, id: number) => void;
    index?: number;
    id?: number;
}

const EditableSpan = ({text, onChange, index = -1, id = -1}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [overflow, setOverflow] = useState(-1);
    const overflowStyles = useOverflowText(overflow);
    const setOverflowStyles = (index: number) => index === overflow ? overflowStyles : {};

    const isOverflowing = (event: React.MouseEvent, index: number) => {
        const target = (event.target as HTMLInputElement)
        const parentTarget = (event.target as HTMLInputElement).parentElement
        if(parentTarget && parentTarget.offsetWidth < target.offsetWidth){
            setOverflow(index)
        }
    }
    const handleClick = () => {
        setEdit(!edit);
    }

    const handleBlur = () => {
        setEdit(!edit);
        setOverflow(-1);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, id)
    }
    
    return (
        <Fragment>
        {!edit && 
        <span
            onMouseLeave={() => setOverflow(-1)}
            onMouseEnter={(event) => isOverflowing(event, index)} 
            style={setOverflowStyles(index)}
            onClick={handleClick}
            className="edit-input">{text}</span>}
        {edit &&
        <Input 
            autoFocus 
            type="text" 
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            className="edit-input"/>}
        </Fragment>
    )
}

export default EditableSpan;