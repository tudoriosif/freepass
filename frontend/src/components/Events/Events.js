import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { getEventsBySystem } from '../../redux/thunks/events';
import { eventTypes, eventImages } from '../../utils/utils';
import ErrorHandler from '../../utils/ErrorHandler';
import { AccountCircle, AdminPanelSettings } from '@mui/icons-material';
import { ERRORS } from '../../constants/constants';

const columns = [
    {
        field: 'image',
        headerName: 'Image',
        flex: 0.1,
        align: 'center',
        renderCell: (params) => (
            <img src={eventImages[params.row.type]} alt="component image" style={{ height: '50%' }} />
        )
    },
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'user', headerName: 'Email', flex: 0.2, renderCell: (params) => <>{params.row?.user?.email}</> },
    { field: 'type', headerName: 'Tip', flex: 0.2, renderCell: (params) => <>{eventTypes[params.row?.type]}</> },
    {
        field: 'hasFace',
        headerName: 'Model față',
        flex: 0.1,
        align: 'center',
        renderCell: (params) =>
            params.row?.user?.hasFace ? <div className="green-dot"></div> : <div className="red-dot"></div>
    },
    {
        field: 'hasFinger',
        headerName: 'Model amprentă',
        flex: 0.1,
        align: 'center',
        renderCell: (params) =>
            params.row?.user?.hasFinger ? <div className="green-dot"></div> : <div className="red-dot"></div>
    },
    {
        field: 'createdAt',
        headerName: 'Data creării',
        flex: 0.2,
        renderCell: (params) => {
            const date = new Date(params.row.createdAt);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDay();

            return (
                <>
                    {hours}:{minutes}:{seconds} {day}/{month}/{year}
                </>
            );
        }
    }
];

const Events = () => {
    const events = useSelector((state) => state.events.events);
    const loading = useSelector((state) => state.events.loading);
    const error = useSelector((state) => state.events.error);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventsBySystem({}));
    }, []);

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100%', width: '90%' }}>
            {!error && <DataGrid rows={events} columns={columns} rowHeight={100} loading={loading} pageSize={11} />}
            {error && <ErrorHandler error={ERRORS.ROLE} />}
        </Container>
    );
};

export default Events;
