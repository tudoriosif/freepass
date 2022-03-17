import React from 'react';
import { useDispatch } from 'react-redux';
import LeftForm from '../components/Login/LeftForm';
import RightHero from '../components/Login/RightHero';
import { SplitContainer } from '../components/Login/styles';
import { loginPageDetails } from '../constants/constants';
import { login } from '../redux/slices/userSlice';
import { loginSchema } from '../components/Login/formValidationSchema';

const Login = () => {
    const dispatch = useDispatch();

    const submitHandler = (values) => dispatch(login(values));
    return (
        <SplitContainer disableGutters maxWidth={false}>
            <LeftForm
                pageDetails={loginPageDetails}
                submitHandler={submitHandler}
                validationSchema={loginSchema}
                isLogin
            />
            <RightHero />
        </SplitContainer>
    );
};

export default Login;
