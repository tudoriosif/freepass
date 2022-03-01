import React from 'react';
import LeftForm from '../components/Login/LeftForm';
import RightHero from '../components/Login/RightHero';
import { SplitContainer } from '../components/Login/styles';

const Login = () => {
    return (
        <SplitContainer disableGutters maxWidth={false}>
            <LeftForm />
            <RightHero />
        </SplitContainer>
    );
};

export default Login;
