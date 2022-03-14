import * as yup from 'yup';

export const signupSchema = yup.object({
    email: yup.string('Enter your email').required('Email is required').email('Enter a valid email'),
    password: yup
        .string('Enter your password')
        .required('Password is required')
        .min(6, 'Password should be of minimum 8 characters length'),
    systemID: yup
        .string('Enter you system ID')
        .required('System ID is required')
        .min(10, 'System ID should be of minimum 10 characters length')
});

export const loginSchema = yup.object({
    email: yup.string('Enter your email').required('Email is required').email('Enter a valid email'),
    password: yup
        .string('Enter your password')
        .required('Password is required')
        .min(6, 'Password should be of minimum 8 characters length')
});
