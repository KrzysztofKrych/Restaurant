import React from 'react';
import Button from '../Elements/Button/Button';
import { signoutActionInit } from '../../store/data/user/user.middleware';

const Settings = () => {
    const handleSignOut = () => {
        signoutActionInit()
    }

    return (
        <div>
            <Button onClick={handleSignOut}>Sign out</Button>
        </div>
    )
}

export default Settings;