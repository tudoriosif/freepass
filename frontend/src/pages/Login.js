import React from 'react';
import LeftForm from '../components/Login/LeftForm';
import RightHero from '../components/Login/RightHero';
import { SplitContainer } from '../components/Login/styles';
import { loginPageDetails } from '../constants/constants';

const Login = () => {
    const submitHandler = (values) => alert(values);
    return (
        <SplitContainer disableGutters maxWidth={false}>
            <LeftForm pageDetails={loginPageDetails} submitHandler={submitHandler} />
            <RightHero />
        </SplitContainer>
    );
};

export default Login;
