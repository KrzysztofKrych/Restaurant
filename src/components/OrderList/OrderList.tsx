import React, { Fragment, useState } from 'react';
import Order from '../../api/models/Order';
import { RootState } from '../../store/rootReducer';
import { connect } from 'react-redux';

import "./OrderList.css";
import Button from '../Elements/Button/Button';
import { removeOrderSuccessAction, changeOrderStatusSuccessAction } from '../../store/data/orders/orders.middleware';
import RadioInput from '../Elements/RadioInput/RadioInput';
import OrderStatus from '../../api/models/OrderStatus';
import { toggleNotificationBarAction } from '../../store/data/notification/notification.middleware';
import { getNextOrderStatus } from '../../store/repositories/ordersRepository';

export interface Props{
    orders: Order[]
}

const OrdersList = ({orders}: Props) => {

    const [checkedRadioInput, setCheckedRadioInput ] = useState(OrderStatus.ORDERED);
        
    const handleRemoveOrder = (id: string) => {
        removeOrderSuccessAction(id);
        toggleNotificationBarAction("Order Removed", "danger")
    }

    const getRadioInputs = () => [
        {name: 'order', label: OrderStatus.ORDERED},
        {name: 'order', label: OrderStatus.ISSUED},
        {name: 'order', label:  OrderStatus.PAID},
    ];

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, label: OrderStatus | string) => {
        setCheckedRadioInput(label as OrderStatus);
    }

    const handleOrderStatus = ({id, status}: Order) => {
        changeOrderStatusSuccessAction(id, getNextOrderStatus(status));
        toggleNotificationBarAction(`Order status change to ${getNextOrderStatus(status)}`, 'success')
    }

    return (
        orders.length > 0 ? 
        <Fragment>
            <div>
                <RadioInput
                    checked={checkedRadioInput}
                    onChange={handleRadioChange} 
                    inputs={getRadioInputs()} />
            </div>
            <div className="orderlist-container">
                <div className="table-number desc">Table number</div>
                <div className="desc">Dishes</div>
            </div>
            <div className="ordered-orders">
                {orders.map((order: Order, index: number) => 
                    order.status === checkedRadioInput && <div key={index} className="orderlist-container">
                        <div className="table-number">{order.table}</div>
                        <div className="dishlist-container">
                            {order.dishes.map((dish, index) => 
                                <div key={index}>{dish.name}</div>
                            )}
                        </div>
                        <div className="actions">
                            <Button onClick={() => handleOrderStatus(order)}>
                                Change Status to {getNextOrderStatus(order.status)}
                            </Button> 
                            <Button 
                            variant="danger" 
                            onClick={() => handleRemoveOrder(order.id)}>Remove</Button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment> : <div>Your order list is empty. Please add your first order in 'New order' section</div>
    )
}

const map = {
    state: (state:RootState) => {
        return {
            orders: state.orders.orders
        }
    }
}
const connected = connect(
    map.state
)

export default connected(OrdersList);