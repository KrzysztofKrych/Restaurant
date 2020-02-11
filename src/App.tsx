import React, { useState } from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import Wrapper from "./components/Wrapper/Wrapper";
import Content from "./components/Content/Content";
import { RootState } from './store/rootReducer';
import { connect } from "react-redux";
import { UserState } from './store/data/user/user.reducer';
import NotificationBar from './components/Content/NotificationBar/NotificationBar';
import Login from './components/Login/Login';
import AuthStatus from './api/AuthStatus';
import Spinner from './components/Elements/Spinner/Spinner';

export interface Props {
  activeUser: UserState
}


const App = ({activeUser}: Props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("newOrder");

  const handleMenuSwitch = (element: string) => {
    setSelectedMenuItem(element);
  }

  return (
      <div className="App">
        <NotificationBar />
        {activeUser.auth === AuthStatus.UNLOGIN && <Login />}
        {activeUser.auth === AuthStatus.WORKING && <div className="spinner-container"><Spinner /></div>}
        {activeUser.auth === AuthStatus.LOGIN && <Wrapper>
          <Menu onClick={handleMenuSwitch}/>
          <Content show={selectedMenuItem} />
        </Wrapper> } 
      </div>
  );
}

const map = {
  state: (state: RootState) => {
    return {
      activeUser: state.user
    }
  }
}


const connected = connect(
  map.state,
  undefined
);

export default connected(App);
