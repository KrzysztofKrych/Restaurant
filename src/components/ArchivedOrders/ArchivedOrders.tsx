import React, { Fragment } from 'react';
import { RootState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import Order from '../../api/models/Order';
import OrderStatus from '../../api/models/OrderStatus';

export interface Props {
    orders: Order[]
}

const ArchivedOrders = ({orders}: Props) => {
    return (
        <Fragment>
            {orders.map((order, index) => 
            order.status === OrderStatus.ARCHIVED &&
                <div key={index}>
                    {order.table}
                    {order.dishes.map((dish, dishIndex) =>
                        <div key={dishIndex}>{dish.name}</div>
                    )}
                </div>
            )}
        </Fragment>
    )
}

const map = {
    state: (state: RootState) => {
        return {
            orders: state.orders.orders
        }
    }
}
const connected = connect(map.state)

export default connected(ArchivedOrders);