import React from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormHelperText, Stack, Alert } from '@mui/material';
import { LoginHeader, LoginInput, LoginInputLabel, LoginStack, LoginSubHeader } from '../Login/styles';
import { CustomLoadingButton, CustomOutlinedButton } from '../Settings/styles';
import { userSchema } from './formValidator';
import { addUser } from '../../redux/thunks/users';

const AddUser = ({ setDrawerOpen }) => {
    const error = useSelector((state) => state.users.error);
    const message = useSelector((state) => state.users.message);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: userSchema,
        onSubmit: (values) => dispatch(addUser(values))
    });

    return (
        <Stack sx={{ flex: 1 }}>
            <LoginStack sx={{ width: '100%' }}>
                <LoginHeader component="div">Add new user</LoginHeader>
                <LoginSubHeader component="div">Please enter new system user details</LoginSubHeader>
            </LoginStack>
            <form
                style={{
                    flex: 1,
                    marginTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: '100px'
                }}
                onSubmit={formik.handleSubmit}>
                <LoginStack spacing={2} style={{ alignSelf: 'flex-start' }}>
                    <FormControl>
                        <LoginInputLabel htmlFor="email" shrink={true} variant="standard">
                            Email
                        </LoginInputLabel>
                        <LoginInput
                            id="email"
                            placeholder={'Enter new user email'}
                            onChange={formik.handleChange}
                            defaultValue={formik.initialValues.email}
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
                            placeholder={'Enter new user password'}
                            onChange={formik.handleChange}
                            defaultValue={formik.initialValues.password}
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
                </LoginStack>
                <LoginStack sx={{ width: '100%' }}>
                    {!!error && <Alert severity="error">An error has occured, please try again!</Alert>}
                    {!!message && <Alert severity="success">The new user has been added!</Alert>}
                    <CustomLoadingButton color="primary" variant="contained" fullWidth type="submit">
                        Add user
                    </CustomLoadingButton>
                    <CustomOutlinedButton fullWidth onClick={() => setDrawerOpen(false)}>
                        Never mind
                    </CustomOutlinedButton>
                </LoginStack>
            </form>
        </Stack>
    );
};

export default AddUser;
