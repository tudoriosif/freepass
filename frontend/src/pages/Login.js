import React from 'react';
import LeftForm from '../components/Login/LeftForm';
import RightHero from '../components/Login/RightHero';
import { LoginContainer } from '../components/Login/styles';

const Login = () => {
    return (
        <LoginContainer disableGutters maxWidth={false}>
            <LeftForm />
            <RightHero />
        </LoginContainer>
    );
};

export default Login;
