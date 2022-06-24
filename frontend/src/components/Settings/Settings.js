import React from 'react';

import { useFormik } from 'formik';
import { updateSchema } from './formValidationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Stack, Typography } from '@mui/material';
import { LoginHeader, LoginInput, LoginInputLabel, LoginStack, LoginSubHeader } from '../Login/styles';
import { CustomLoadingButton } from './styles';

import { updateAccount } from '../../redux/slices/userSlice';

const Settings = () => {
    const { id, email, hasFinger, hasFace, systemID, role, noSystem } = useSelector((state) => state.user);
    const error = useSelector((state) => state.user.error);
    const loading = useSelector((state) => state.user.loading);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            id,
            email,
            password: ''
        },
        validationSchema: updateSchema,
        onSubmit: (values) => dispatch(updateAccount(values))
    });

    return (
        <Stack spacing={4} sx={{ width: '450px', margin: '0 auto', marginTop: '150px' }}>
            <LoginStack spacing={1} sx={{ width: '100%' }}>
                <LoginHeader component="div">Update details</LoginHeader>
                <LoginSubHeader component="div">Please enter your new details</LoginSubHeader>
            </LoginStack>
            <form onSubmit={formik.handleSubmit}>
                <LoginStack spacing={4}>
                    <FormControl>
                        <LoginInputLabel htmlFor="email" shrink={true} variant="standard">
                            Email
                        </LoginInputLabel>
                        <LoginInput
                            id="email"
                            placeholder={'Enter your new email address'}
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
                            placeholder={'Enter your new password address'}
                            onChange={formik.handleChange}
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
                            SystemID
                        </LoginInputLabel>
                        <LoginInput
                            id="systemID"
                            placeholder={'Your sistemID'}
                            value={systemID}
                            disabled
                            disableUnderline
                        />
                    </FormControl>
                    <Stack>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="default" checked={hasFinger} />}
                                label="Finger model"
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="default" checked={hasFace} />}
                                label="Face model"
                            />
                        </FormGroup>
                    </Stack>
                    <Stack>
                        <Typography>
                            Role: <strong>{role}</strong>
                        </Typography>
                        <Typography>
                            No. system account: <strong>{noSystem}</strong>
                        </Typography>
                    </Stack>
                    <CustomLoadingButton color="primary" variant="contained" fullWidth type="submit" loading={loading}>
                        Update details
                    </CustomLoadingButton>
                </LoginStack>
            </form>
        </Stack>
    );
};

export default Settings;
