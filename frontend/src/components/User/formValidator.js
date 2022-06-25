import * as yup from 'yup';

export const userSchema = yup.object({
    email: yup.string('Enter your email').required('Email is required').email('Enter a valid email'),
    password: yup
        .string('Enter your password')
        .required('Password is required')
        .min(6, 'Password should be of minimum 8 characters length')
});
