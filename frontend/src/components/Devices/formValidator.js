import * as yup from 'yup';

export const deviceSchema = yup.object({
    name: yup.string('Enter device name').required('Name is required'),
    type: yup.string('Enter device type').required('Type is required')
});
