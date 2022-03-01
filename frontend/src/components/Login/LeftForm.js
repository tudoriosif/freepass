import React from 'react';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import validationSchema from './formValidationSchema';
import { Stack, FormControl, FormHelperText, Link, IconButton, Typography } from '@mui/material';
import {
    LoginInput,
    LoginStack,
    LoginHeader,
    LoginSubHeader,
    LoginInputLabel,
    LogoHeader,
    ForgotLink,
    SubmitButton,
    UnderText,
    UnderLink,
    FormBox
} from './styles';
import { useNavigate } from 'react-router-dom';
import { FingerPrintIcon } from '../NavBar/styles';

const LeftForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            systemID: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <FormBox>
            <Stack spacing={4}>
                <LoginStack flexDirection="row" alignItems="center" sx={{ pb: 5 }}>
                    <IconButton sx={{ p: 0 }}>
                        <FingerPrintIcon />
                    </IconButton>
                    <LogoHeader component="div">FreePass</LogoHeader>
                </LoginStack>
                <LoginStack spacing={1}>
                    <LoginHeader component="div">Log in</LoginHeader>
                    <LoginSubHeader component="div">Welcome back! Please enter your details.</LoginSubHeader>
                </LoginStack>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
                    <LoginStack spacing={4}>
                        <FormControl>
                            <LoginInputLabel htmlFor="email" shrink={true} variant="standard">
                                Email
                            </LoginInputLabel>
                            <LoginInput
                                id="email"
                                placeholder={'Enter your email address'}
                                onChange={formik.handleChange}
                                disableUnderline
                            />
                            {!!(formik.touched.email && formik.errors.email) && (
                                <FormHelperText
                                    id="my-helper-text"
                                    error={formik.touched.email && Boolean(formik.errors.email)}>
                                    {formik.errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <LoginInputLabel htmlFor="password" shrink={true} variant="standard">
                                Password
                            </LoginInputLabel>
                            <LoginInput
                                id="password"
                                placeholder={'Enter your desired password'}
                                onChange={formik.handleChange}
                                type="password"
                                disableUnderline
                            />
                            {!!(formik.touched.password && formik.errors.password) && (
                                <FormHelperText
                                    id="my-helper-text"
                                    error={formik.touched.password && Boolean(formik.errors.password)}>
                                    {formik.errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <LoginInputLabel htmlFor="systemID" shrink={true} variant="standard">
                                System ID
                            </LoginInputLabel>
                            <LoginInput
                                id="systemID"
                                placeholder={'Enter your provided System ID'}
                                onChange={formik.handleChange}
                                disableUnderline
                            />
                            {!!(formik.touched.systemID && formik.errors.systemID) && (
                                <FormHelperText
                                    id="my-helper-text"
                                    error={formik.touched.systemID && Boolean(formik.errors.systemID)}>
                                    {formik.errors.systemID}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <ForgotLink
                            component="div"
                            sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
                            onClick={() => navigate('/specs')}>
                            Forgot password?
                        </ForgotLink>
                        <SubmitButton color="primary" variant="contained" fullWidth type="submit">
                            Sign in
                        </SubmitButton>
                    </LoginStack>
                </form>
                <LoginStack direction="row" sx={{ justifyContent: 'center' }}>
                    <UnderText>Don&apos;t have an account? </UnderText>
                    <UnderLink component="div" sx={{ ml: 1 }} onClick={() => navigate('/specs')}>
                        Sign up
                    </UnderLink>
                </LoginStack>
            </Stack>
        </FormBox>
    );
};

export default LeftForm;
