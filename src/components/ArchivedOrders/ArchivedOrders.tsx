import React, { Fragment } from 'react';
import { RootState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import Order from '../../api/models/Order';
import OrderStatus from '../../api/models/OrderStatus';

import './ArchivedOrders.css';
import '../../helpers/global-styles.css';

export interface Props {
    orders: Order[]
}

const ArchivedOrders = ({orders}: Props) => {
    return (
        <Fragment>
            {orders.length && orders.some(order => order.status === OrderStatus.ARCHIVED) && 
            <div className="archived-order head">
                <div className="table-number">table number</div>
                <div className="table-number">dishes</div>
            </div>}
            {orders.map((order, index) => 
            order.status === OrderStatus.ARCHIVED &&
                <div key={index} className="archived-order">
                    <span className="table-number">{order.table}</span>
                    <div className="archived-order-dish-container">
                        {order.dishes.map((dish, dishIndex) =>
                            <div key={dishIndex} className="main-text">{dish.name}</div>
                        )}
                    </div>
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