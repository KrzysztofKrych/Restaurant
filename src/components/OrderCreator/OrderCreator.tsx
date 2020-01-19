import React, { useState } from 'react';
import Input from '../Elements/Input/Input';
import { RootState } from '../../store/rootReducer';
import Dish from '../../api/models/Dish';
import { connect } from 'react-redux';

import './OrderCreator.css';
import Button from '../Elements/Button/Button';
import { addOrderSuccessAction } from '../../store/data/orders/orders.middleware';
import Order from '../../api/models/Order';
import OrderStatus from '../../api/models/OrderStatus';
import { toggleNotificationBarAction } from '../../store/data/notification/notification.middleware';

export interface Props {
    dishes: Dish[];
    orders: Order[];
}

const OrderCreator = ({dishes, orders}: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [tempOrder, setTempOrder] = useState<Dish[]>([]);
    const [tableNumber, setTableNumber] = useState<number>(0);

    const isTableBusy = (tableNumber: number) => orders.some(order => order.table === tableNumber && order.status !== OrderStatus.PAID &&  order.status !== OrderStatus.ARCHIVED);

    const getDishes = () => dishes.filter(dish => dish.name.includes(searchValue));

    const toggleOrder = (newDish: Dish) => {
        const findDish = findDishInOrder(newDish);
        if(!findDish){
            setTempOrder([...tempOrder, newDish])
        }else{
            setTempOrder(tempOrder.filter(dish => dish.id !== findDish.id))
        }
    }

    const findDishInOrder = (newDish:Dish) => tempOrder.find(dish => dish.id === newDish.id);

    const onSaveOrder = () => {
        if(tableNumber && tableNumber > 0){
            addOrderSuccessAction({
                dishes: [...tempOrder],
                id: String(Date.now()),
                table: tableNumber,
                status: OrderStatus.ORDERED
            });
            setTempOrder([]);
            setTableNumber(0);
            toggleNotificationBarAction("Order added", "success")
        }
    }

    return (
        <div className="order-container">
            <div>
                <Input 
                placeholder="type to search dishes" 
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)} />
                <div className="dishes-list">
                    {getDishes().map((dish: Dish, index: number) => 
                        <div key={index} className="dish">
                            <div>
                                <span>{index + 1}.</span>
                                <span>{dish.name}</span>
                            </div>
                            <Button 
                            variant={`${findDishInOrder(dish) && 'danger'}`} 
                            onClick={() => toggleOrder(dish)}>
                            {findDishInOrder(dish) ? 'Remove from order' : 'Add to order' }
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {tempOrder.length > 0 && 
            <div>
                <h2 className="h2">New Order</h2>
                <div className="temp-container">
                    {tempOrder.map((dish: Dish, index: number) => 
                        <div key={index}>{index + 1}. {dish.name}</div>
                    )}
                </div>
                <div>
                    <Input 
                        type='number'
                        value={tableNumber || ''}
                        onChange={(event) => setTableNumber(Number(event.target.value)) }
                        placeholder="type number of table" />
                    <Button onClick={onSaveOrder} disabled={!tableNumber || isTableBusy(tableNumber)}>Save</Button>
                    {isTableBusy(tableNumber) && <span>This table is already busy!</span>}
                </div>
            </div>
            }
        </div>
    )
}

const map = {
    state: (state: RootState) => {
        return {
            dishes: state.dishes.dishes,
            orders: state.orders.orders
        }
    }
}
const connected = connect(
    map.state
  );
  

export default connected(OrderCreator);