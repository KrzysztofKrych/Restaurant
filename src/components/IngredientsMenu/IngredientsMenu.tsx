import React, { Fragment, useState, SyntheticEvent } from 'react';
import Ingredient from '../../api/models/Ingredient';
import { RootState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import "./IngredientsMenu.css";
import Switcher from '../Elements/Switcher/Switcher';
import IngredientCreator from '../IngredientCreator/IngredientCreator';
import useOverflowText from '../../hooks/useOverflowText/useOverflowText';

export interface Props {
    ingredients: Ingredient[]
}

const IngredientsMenu = ({ingredients}: Props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [overflow, setOverflow] = useState(-1);
    const overflowStyles = useOverflowText(overflow);
    const handleSave = () => {
        setIsChecked(false);
    }

    const setOverflowStyles = (index: number) => index === overflow ? overflowStyles : {};

    const isOverflowing = (event: React.MouseEvent, index: number) => {
        const target = (event.target as HTMLInputElement)
        const parentTarget = (event.target as HTMLInputElement).parentElement
        if(parentTarget && parentTarget.offsetWidth < target.offsetWidth){
            setOverflow(index)
        }
    }
    
    return (
        <div>
            <div className="switcher-container">
                <span>Click for change  view to - {isChecked ? "ingredients list" : "add new ingredients" }</span>
                <Switcher 
                    checked={isChecked} 
                    onChange={() => setIsChecked(!isChecked)} />
            </div>
            {isChecked && <IngredientCreator onSave={handleSave} />}
            {!isChecked && <div className="ingredients-container">
                {ingredients.length ? ingredients.map((ingredient, index) => 
                <div key={index} className="ingredient">
                    <div className="name">
                        <span 
                            onMouseLeave={() => setOverflow(-1)}
                            onMouseEnter={(event) => isOverflowing(event, index)} 
                            style={setOverflowStyles(index)}
                            >
                            {ingredient.name}
                        </span>
                    </div>
                    {ingredient.avatar && <img src={ingredient.avatar} alt="image" />}
                </div>
                ) : 
                <div>Your ingredients list is empty! Go to 'New ingredient' section to add your first ingredient.</div>
                }
            </div>}
        </div>
    )
}

const map = {
    state: (state: RootState) => {
      return {
        ingredients: state.ingredients.ingredients
      }
    }
}

const connected = connect(
    map.state
)
export default connected(IngredientsMenu);