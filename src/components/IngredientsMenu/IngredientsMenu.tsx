import React, { useState } from 'react';
import Ingredient from '../../api/models/Ingredient';
import { RootState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import "./IngredientsMenu.css";
import Switcher from '../Elements/Switcher/Switcher';
import IngredientCreator from '../IngredientCreator/IngredientCreator';
import Input from '../Elements/Input/Input';
import { getBase64 } from '../../helpers/helpers';
import { addAvatarToIngredientActionSuccess, editIngredientNameActionSuccess, deleteIngredientNameActionSuccess } from '../../store/data/ingredients/ingredients.middleware';
import EditableSpan from '../Elements/EditableSpan/EditableSpan';
import Button from '../Elements/Button/Button';
import { toggleNotificationBarAction } from '../../store/data/notification/notification.middleware';

export interface Props {
    ingredients: Ingredient[];
}

const IngredientsMenu = ({ingredients}: Props) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleSave = () => {
        setIsChecked(false);
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, id:number) => {
        const file = event.target.files;
        if (file) {
            getBase64(file[0]).then(data => 
                addAvatarToIngredientActionSuccess(data as string, id)
            );
        }
    }

    const handleChangeIngredientName = (name: string, id: number) => {
        editIngredientNameActionSuccess(name, id);
    }

    const handleDeleteIngredient = (id:number) => {
        deleteIngredientNameActionSuccess(id);
        toggleNotificationBarAction("Ingredient Deleted", "danger");
    }

    const getInputClass = (value: string | undefined) => value ? 'change' : "";
    
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
                    <div className={`name`}>
                        {index + 1}. 
                        <EditableSpan 
                        id={ingredient.id} 
                        index={index} 
                        text={ingredient.name} 
                        onChange={handleChangeIngredientName} />
                    </div>
                    {ingredient.avatar && <img src={ingredient.avatar} alt="image" />}
                    <Input 
                        type="file" 
                        accept="image/png,image/jpeg,image/jpg" 
                        className={getInputClass(ingredient.avatar)}
                        onChange={(event) => handleFileUpload(event, ingredient.id)} />
                        <Button variant="danger" onClick={() => handleDeleteIngredient(ingredient.id)}>Remove</Button>
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