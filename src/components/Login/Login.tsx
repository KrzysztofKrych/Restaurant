import React, { useState, ChangeEvent, Fragment } from "react";

import Input from "../Elements/Input/Input";
import FlexDiv from "../Elements/FlexDiv/FlexDiv";
import Button from "../Elements/Button/Button";
import Auth from "../../api/models/Auth";
import  { loginActionInit } from "../../store/data/user/user.middleware";

import "./Login.css";
import { fire } from "../../config/firebaseConfig";
import Register from "../Register/Register";

const Login = () => {
    const [auth, setAuth] = useState<Auth>({
        login: "",
        password: ""
    })
    const [showRegister, setShowRegister] = useState<boolean>(false);

    const handleLogin = () => {
        loginActionInit(auth);
    }

    const handleAuth = (setter: (auth: Auth) => void) => {
        setter(auth);
        setAuth(auth);
    }

    const toggleRegister = () => {
        setShowRegister(!showRegister)
    }

    return (
        <Fragment>
            {!showRegister && <div className="login">
                <FlexDiv>
                    <label>Login</label>
                    <Input 
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleAuth(auth => auth.login = event.target.value)} 
                    size="medium" 
                    placeholder="login" />
                </FlexDiv>
                <FlexDiv>
                    <label>Password</label>
                    <Input 
                    type="password"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleAuth(auth => auth.password = event.target.value)}  
                    size="medium" 
                    placeholder="password" />
                    <Button variant="responsive" onClick={handleLogin}>Login</Button>
                    <Button variant="info" onClick={toggleRegister}>Create New Account</Button>
                </FlexDiv>
            </div>}
            {showRegister && <Register onBack={toggleRegister} />}
        </Fragment>
    )
}

export default Login;