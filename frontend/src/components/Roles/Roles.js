import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { getUsersBySystem } from '../../redux/thunks/users';
import { pathToImage } from '../../utils/utils';
import ErrorHandler from '../../utils/ErrorHandler';
import { AccountCircle, AdminPanelSettings } from '@mui/icons-material';
import { ERRORS } from '../../constants/constants';

const columns = [
    {
        field: 'avatar',
        headerName: 'Avatar',
        flex: 0.1,
        align: 'center',
        renderCell: (params) =>
            params.row.noSystem === 1 ? (
                <AdminPanelSettings fontSize="large" sx={{ color: '#393e41' }} />
            ) : (
                <AccountCircle fontSize="large" sx={{ color: '#393e41' }} />
            )
    },
    {
        field: 'rol',
        headerName: 'Rol',
        flex: 0.1,
        renderCell: (params) => (params.row.noSystem === 1 ? <>Administrator</> : <>Utilizator</>)
    },
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'email', headerName: 'Email', flex: 0.2 },
    {
        field: 'hasFace',
        headerName: 'Model față',
        flex: 0.1,
        align: 'center',
        renderCell: (params) =>
            params.row.hasFace ? <div className="green-dot"></div> : <div className="red-dot"></div>
    },
    {
        field: 'hasFinger',
        headerName: 'Model amprentă',
        flex: 0.1,
        align: 'center',
        renderCell: (params) =>
            params.row.hasFinger ? <div className="green-dot"></div> : <div className="red-dot"></div>
    }
];

const Roles = () => {
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersBySystem({}));
    }, []);

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100%', width: '90%' }}>
            {!error && <DataGrid rows={users} columns={columns} rowHeight={70} loading={loading} />}
            {error && <ErrorHandler error={ERRORS.ROLE} />}
        </Container>
    );
};

export default Roles;
