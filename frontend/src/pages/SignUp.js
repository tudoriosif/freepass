import React from 'react';
import LeftForm from '../components/Login/LeftForm';
import RightHero from '../components/Login/RightHero';
import { SplitContainer } from '../components/Login/styles';
import { registerPageDetails } from '../constants/constants';
import { signupSchema } from '../components/Login/formValidationSchema';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/userSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const submitHandler = (values) => dispatch(register(values));
    return (
        <SplitContainer disableGutters maxWidth={false}>
            <LeftForm pageDetails={registerPageDetails} submitHandler={submitHandler} validationSchema={signupSchema} />
            <RightHero />
        </SplitContainer>
    );
};

export default SignUp;
