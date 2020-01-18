import React, { useState } from 'react';
import Input from '../Elements/Input/Input';
import { addDishActionSuccess } from '../../store/data/dishes/dishes.middleware';
import Dish from '../../api/models/Dish';
import Button from '../Elements/Button/Button';
import { toggleNotificationBarAction } from '../../store/data/notification/notification.middleware';

import "./DishCreator.css"

const DishCreator = () => {
    const [dish, setDish] = useState<Dish>({
        name: "",
        id: String(Date.now()),
        ingredients: []
    });
    const handleAddDish = () => {
        addDishActionSuccess(dish);
        setDish({name: "", id: String(Date.now()), ingredients: []});
        toggleNotificationBarAction("Dish Added", "success");
    }
    const updateDish = (setter: (dish: Dish) => void) => {
        setter(dish);
        setDish({...dish})
    }
    return (
        <div>
            <span className="description">Add Dish to your dishes list!</span>
            <Input value={dish.name} onChange={(event) => updateDish(dish => dish.name = event.target.value)} />
            <Button onClick={handleAddDish} disabled={!dish.name}>Save</Button>
        </div>
    )
}

export default DishCreator;