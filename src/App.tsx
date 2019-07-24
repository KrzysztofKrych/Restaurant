import React, { useState, Dispatch } from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import Wrapper from "./components/Wrapper/Wrapper";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
// import { loginAction }  from "./store/data/user/user.actions";
import { RootState } from './store/rootReducer';
import { connect } from "react-redux";


const App = ({user}: any) => {
  console.log(user);
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  const handleMenuSwitch = (element: string) => {
    setSelectedMenuItem(element);
  }
  return (
      <div className="App">
        <Login />
        {/* <Wrapper>
          <Menu onClick={handleMenuSwitch}/>
          <Content show={selectedMenuItem} />
        </Wrapper> */}
      </div>
  );
}

const map = {
  state: (state: RootState) => {
    return {
      user: state
    }
  }
}


const connected = connect(
  map.state,
  undefined
  );

export default connected(App);
