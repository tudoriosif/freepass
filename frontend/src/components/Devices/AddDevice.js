import React from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Stack,
    InputLabel,
    MenuItem,
    Alert,
    Box
} from '@mui/material';
import { LoginHeader, LoginInput, LoginInputLabel, LoginStack, LoginSubHeader } from '../Login/styles';
import { StyledSelect } from '../Drawer/style';
import { DEVICE_TYPES } from '../../constants/constants';
import { CustomLoadingButton, CustomOutlinedButton } from '../Settings/styles';
import { deviceSchema } from './formValidator';
import { addDevice } from '../../redux/thunks/node';
import { pathToImage } from '../../utils/utils';

const AddDevice = ({ setDrawerOpen }) => {
    const error = useSelector((state) => state.node.error);
    const message = useSelector((state) => state.node.message);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            status: false
        },
        validationSchema: deviceSchema,
        onSubmit: (values) => dispatch(addDevice(values))
    });

    return (
        <Stack sx={{ flex: 1 }}>
            <LoginStack sx={{ width: '100%' }}>
                <LoginHeader component="div">Add new device</LoginHeader>
                <LoginSubHeader component="div">Please enter device details</LoginSubHeader>
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
                        <LoginInputLabel htmlFor="name" shrink={true} variant="standard">
                            Name
                        </LoginInputLabel>
                        <LoginInput
                            id="name"
                            placeholder={'Enter device name'}
                            onChange={formik.handleChange}
                            defaultValue={formik.initialValues.name}
                            disableUnderline
                        />
                        {!!(formik.touched.name && formik.errors.name) && (
                            <FormHelperText
                                id="my-helper-text"
                                error={formik.touched.name && Boolean(formik.errors.name)}>
                                {formik.errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Stack
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                                color: '#393e41!important',
                                fontWeight: '700'
                            }
                        }}>
                        <InputLabel id="select-label">Choose device type</InputLabel>
                        <StyledSelect
                            labelId="select-label"
                            value={formik.values.type}
                            label="type"
                            name="type"
                            onChange={formik.handleChange}>
                            {DEVICE_TYPES.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                        {!!(formik.touched.type && formik.errors.type) && (
                            <FormHelperText
                                id="my-helper-text"
                                error={formik.touched.type && Boolean(formik.errors.type)}>
                                {formik.errors.type}
                            </FormHelperText>
                        )}
                    </Stack>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox color="default" checked={formik.values.status} />}
                            name="status"
                            onChange={formik.handleChange}
                            label="Device status"
                        />
                    </FormGroup>
                </LoginStack>
                <Stack sx={{ width: '70%', height: '250px', justifyContent: 'center', alignSelf: 'center' }}>
                    <img src={pathToImage[formik.values.type]} style={{ objectFit: 'contain' }} />
                </Stack>
                <LoginStack sx={{ width: '100%' }}>
                    {!!error && <Alert severity="error">An error has occured, please try again!</Alert>}
                    {!!message && <Alert severity="success">The new device has been added!</Alert>}
                    <CustomLoadingButton color="primary" variant="contained" fullWidth type="submit">
                        Add device
                    </CustomLoadingButton>
                    <CustomOutlinedButton fullWidth onClick={() => setDrawerOpen(false)}>
                        Never mind
                    </CustomOutlinedButton>
                </LoginStack>
            </form>
        </Stack>
    );
};

export default AddDevice;
