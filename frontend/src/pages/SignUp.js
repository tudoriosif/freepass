import React from 'react';
import LeftForm from '../components/Login/LeftForm';
import RightHero from '../components/Login/RightHero';
import { SplitContainer } from '../components/Login/styles';
import { registerPageDetails } from '../constants/constants';
import { signupSchema } from '../components/Login/formValidationSchema';

const SignUp = () => {
    const submitHandler = (values) => console.log(values);
    return (
        <SplitContainer disableGutters maxWidth={false}>
            <LeftForm pageDetails={registerPageDetails} submitHandler={submitHandler} validationSchema={signupSchema} />
            <RightHero />
        </SplitContainer>
    );
};

export default SignUp;
