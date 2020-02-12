import React, { useState, ChangeEvent } from "react";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";

import './Register.css'
import FlexDiv from "../Elements/FlexDiv/FlexDiv";
import { fire } from "../../config/firebaseConfig";
import Auth from "../../api/models/Auth";

export interface Props {
    onBack: () => void
}

const Register = ({onBack}: Props) => {
    const [newUser, setNewUser] = useState<Auth>({
        login: "",
        password: ""
    })
    const [errorMsg , setErrorMsg] = useState<string>("");

    
    const handleRegister = () => {
        fire.auth().createUserWithEmailAndPassword(newUser.login, newUser.password).then(res => {
            console.log(res)
        }).catch(error => {
            setErrorMsg(error.message);
        })
    }

    const handleAuth = (setter: (newUser: Auth) => void) => {
        setErrorMsg("");
        setter(newUser);
        setNewUser({...newUser});
    }
    
    const getClass = () => (!newUser.login || !newUser.password) ? "disabled" : "";
    
    return (
        <div className="register">
            <FlexDiv className="relative">
                <label>Login</label>
                <Input type="text"
                placeholder="type your new login"  
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleAuth(newUser => newUser.login = event.target.value)}  />
                <label>Password</label>
                <Input type="password" 
                placeholder="type your new password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleAuth(newUser => newUser.password = event.target.value)}   />
                <Button variant={getClass()} onClick={handleRegister}>Register</Button>
                <Button variant="danger" onClick={onBack}>Back to Login</Button>
                <div className="error-msg">{errorMsg}</div>
            </FlexDiv>
        </div>
    )
}

export default Register;