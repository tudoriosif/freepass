import AddDevice from '../Devices/AddDevice';
import AddUser from '../User/AddUser';
import AddEvent from '../Events/AddEvent';

export const ADD_FORMS = {
    device: (setDrawerOpen) => <AddDevice setDrawerOpen={setDrawerOpen} />,
    user: (setDrawerOpen) => <AddUser setDrawerOpen={setDrawerOpen} />,
    event: (setDrawerOpen) => <AddEvent setDrawerOpen={setDrawerOpen} />
};
