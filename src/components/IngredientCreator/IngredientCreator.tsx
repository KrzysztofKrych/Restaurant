import React, { useState } from "react";
import FlexDiv from "../Elements/FlexDiv/FlexDiv";
import Input from "../Elements/Input/Input";
import Ingredient from "../../api/models/Ingredient";
import Avatar from "../Elements/Avatar/Avatar";
import Button from "../Elements/Button/Button";
import { addIngredientActionSuccess }  from "../../store/data/ingredients/ingredients.middleware";

import "./IngredientCreator.css";
import { toggleNotificationBarAction } from "../../store/data/notification/notification.middleware";

export interface Props {
    onSave: () => void
}

const IngredientCreator  = ({onSave}: Props) => {
    const [ingredient, setIngredient] = useState<Ingredient>({
        name: "",
        avatar: "",
        id: Date.now()
    });

    const updateIngredient = (setter: (ingredient: Ingredient) => void) => {
        setter(ingredient);
        setIngredient({...ingredient});
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (file) {
            getBase64(file[0]).then(data => 
                updateIngredient(ingredient => ingredient.avatar = data as string)
            );
        }
    }
    const getBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result || "");
            reader.onerror = error => reject(error);
        });

    }

    const handleSave = () => {
        addIngredientActionSuccess(ingredient, ingredientAdded);
        onSave();
    }

    const ingredientAdded = () => {
        setIngredient({name: "", avatar: "", id: Date.now()});
        toggleNotificationBarAction("Ingredient Added", "success");
    }

    return(
        <div className="ingredient-creator">
            <FlexDiv>
                Ingredient name:
                <Input value={ingredient.name} 
                onChange={(event) => updateIngredient(ingredient => ingredient.name = event.target.value)} />
            </FlexDiv>
            <FlexDiv>
                Picture: ()
                <Input type="file"
                onChange={handleFileUpload}
                accept="image/png,image/jpeg,image/jpg" />
                <Avatar url={ingredient.avatar || ""} />
            </FlexDiv>
            <FlexDiv>
                <Button 
                disabled={!ingredient.name}
                onClick={handleSave}>Save</Button>
            </FlexDiv>
        </div>
    )
}

export default IngredientCreator;