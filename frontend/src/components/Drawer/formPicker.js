import AddDevice from '../Devices/AddDevice';
import AddUser from '../User/AddUser';

export const ADD_FORMS = {
    device: (setDrawerOpen) => <AddDevice setDrawerOpen={setDrawerOpen} />,
    user: (setDrawerOpen) => <AddUser setDrawerOpen={setDrawerOpen} />
};
