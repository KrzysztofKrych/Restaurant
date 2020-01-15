import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store } from "./store/index";
import { fire }  from './config/firebaseConfig';
import { loginActionSuccess } from './store/data/user/user.middleware';


fire.auth().onAuthStateChanged(function(user) {
    if (user) {
        loginActionSuccess(user.email || "")
    } 
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
