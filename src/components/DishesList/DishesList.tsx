import React, { useState } from 'react';
import { RootState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import Dish from '../../api/models/Dish';
import DishCreator from '../DishCreator/DishCreator';
import "./DishesList.css";
import Button from '../Elements/Button/Button';
import { removeDishActionSuccess, addIngredientToDishActionSuccess } from '../../store/data/dishes/dishes.middleware';
import { toggleNotificationBarAction } from '../../store/data/notification/notification.middleware';
import MultiSelect from '../Elements/MultiSelect/MultiSelect';
import Ingredient from '../../api/models/Ingredient';

export interface Props {
    dishes: Dish[];
    ingredients: Ingredient[];
}

const DishesList = ({dishes, ingredients}: Props) => {

    const [options, setOptions] = useState(
        ingredients.map(ingredient => ({name: ingredient.name, id: ingredient.id, checked: false}))
    )

    const removeDish = (dish: Dish) => {
        removeDishActionSuccess(dish);
        toggleNotificationBarAction("Dish removed", "danger");
    }
    
    const handleMultiselectChange = (id: string, containerId:  string) => {
        const ingredient = ingredients.find(ingredient => ingredient.id === id)
        if(ingredient){
            addIngredientToDishActionSuccess(containerId, ingredient);
        }
    }

    const getOptionsFromIngredients = (dish: Dish) => 
        ingredients.map(ingredient => ({
            name: ingredient.name, id: ingredient.id, checked: dish.ingredients.some(
                dishIngredient => dishIngredient.id === ingredient.id
            ), containerId : dish.id
        }))
    
    return (
        <div className="dishes-container">
            <DishCreator />
            {dishes.length > 0 ?
                dishes.map((dish: Dish, index: number) => 
                    <div key={index} className="dish">
                        <div className="information-container">
                            <span className="dish-name">{index + 1}. {dish.name}</span>
                            <div className="ingredients-container-in-dishes">
                                {dish.ingredients.map(ingredient => 
                                    <div>{ingredient.name}</div>
                                )}
                            </div>
                        </div>
                        <div className="dish-actions">
                            <MultiSelect 
                                options={getOptionsFromIngredients(dish)} 
                                text="choose ingredients" 
                                onChange={handleMultiselectChange} />
                            <Button onClick={() => removeDish(dish)} variant="danger">Remove</Button>
                        </div>
                    </div>
                ) :
                <span>Your dishes list is empty! Go to 'New Dish' section to add dish.</span>
            }
        </div>
    )
}


const map = {
    state: (state:RootState) => {
        return {
            dishes: state.dishes.dishes,
            ingredients: state.ingredients.ingredients
        }
    }
}
const connected = connect(
    map.state
)

export default connected(DishesList);