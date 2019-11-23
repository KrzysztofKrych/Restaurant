import React from "react";

import "./NotificationBar.css";
import { RootState } from "../../../store/rootReducer";
import { connect } from "react-redux";

export interface Props {
    variant: string
    message: string
    show: boolean
}

const NotificationBar = ({variant, message, show}: Props) => (
    show ? 
        <div className={`notification-bar ${variant}`}>
            {message}
        </div>
        : null
) 

const map = {
    state: (state: RootState) => {
      return {
        message: state.notification.message,
        variant: state.notification.variant,
        show: state.notification.show
      }
    }
}

const connected = connect(
    map.state
)

export default connected(NotificationBar);