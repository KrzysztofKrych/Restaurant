import React, { Fragment } from 'react';
import RadioInputInterface from '../../../api/models/RadioInputInterface';
import OrderStatus from '../../../api/models/OrderStatus';

export interface Props {
    inputs: RadioInputInterface[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>, label: string | OrderStatus) => void
    checked: string
}

const RadioInput = ({inputs, onChange, checked}: Props) => {
    return (
        <Fragment>
            {inputs.map((input: RadioInputInterface, index: number) => 
                <label key={index}>
                    <span>{input.label}</span>
                    <input 
                        checked={checked === input.label}
                        onChange={(event) => onChange(event, input.label)} 
                        type="radio" 
                        name={input.name} />
                </label>
            )}
        </Fragment>
    )
} 


export default RadioInput;