import { createStore, applyMiddleware } from "redux";
import reducer from "./rootReducer";
import thunk from "redux-thunk";
export const BASE_URI = "http://localhost:8080";



export const store = createStore(
    reducer,
    applyMiddleware(thunk)
);