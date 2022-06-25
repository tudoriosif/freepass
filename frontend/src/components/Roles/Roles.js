import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Container, Snackbar } from '@mui/material';
import { deleteUser, getUsersBySystem } from '../../redux/thunks/users';
import ErrorHandler from '../../utils/ErrorHandler';
import { AccountCircle, AdminPanelSettings } from '@mui/icons-material';
import { ERRORS } from '../../constants/constants';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletionModal from './DeletionModal';

const getRolesColumns = (userRole, setModalOpen, setUserId) => [
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
    },
    ...(userRole === 'MAIN'
        ? [
              {
                  field: 'noSystem',
                  headerName: 'Stergere',
                  align: 'center',
                  renderCell: (params) => {
                      console.log(params);
                      return params.row.noSystem !== 1 ? (
                          <IconButton
                              aria-label="delete"
                              size="large"
                              color="error"
                              onClick={() => {
                                  setUserId(params.row.id);
                                  setModalOpen(true);
                              }}>
                              <DeleteIcon fontSize="inherit" />
                          </IconButton>
                      ) : (
                          <></>
                      );
                  }
              }
          ]
        : [])
];

const Roles = () => {
    const users = useSelector((state) => state.users.users);
    const userRole = useSelector((state) => state.user.role);
    const loading = useSelector((state) => state.users.loading);
    const message = useSelector((state) => state.users.message);
    const error = useSelector((state) => state.users.error);

    const [modalOpen, setModalOpen] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [userId, setUserId] = useState(null);

    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };

    const handleModalClick = () => {
        !!userId && dispatch(deleteUser(userId));
        dispatch(getUsersBySystem({}));
        setModalOpen(false);
    };

    const handleModalCancel = () => {
        setUserId(null);
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(getUsersBySystem({}));
    }, []);

    useEffect(() => {
        setSnackBar(!!message);
    }, [message]);

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100%', width: '90%' }}>
            {!error && (
                <DataGrid
                    rows={users}
                    columns={getRolesColumns(userRole, setModalOpen, setUserId)}
                    rowHeight={70}
                    loading={loading}
                    pageSize={8}
                />
            )}
            {error && <ErrorHandler error={ERRORS.ROLE} />}
            <DeletionModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleClick={handleModalClick}
                handleCancel={handleModalCancel}
                loading={loading}
            />

            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackBar}
                onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    The user has been deleted!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Roles;
