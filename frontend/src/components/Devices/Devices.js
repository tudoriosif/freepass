import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { getNodesBySystem } from '../../redux/thunks/node';
import { pathToImage } from '../../utils/utils';
import ErrorHandler from '../../utils/ErrorHandler';
import { ERRORS } from '../../constants/constants';

const columns = [
    {
        field: 'image',
        headerName: 'Image',
        flex: 0.2,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
            <img src={pathToImage[params.row.type]} alt="component image" style={{ height: '90%' }} />
        )
    },
    { field: 'id', headerName: 'ID', flex: 0.2 },
    { field: 'name', headerName: 'Name', flex: 0.2 },
    { field: 'type', headerName: 'Type', flex: 0.3 },
    { field: 'nodeID', headerName: 'Node UID', flex: 0.2 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) =>
            params.row.status ? <div className="green-dot"></div> : <div className="red-dot"></div>
    }
];

const Devices = () => {
    const nodes = useSelector((state) => state.node.nodes);
    const loading = useSelector((state) => state.node.loading);
    const error = useSelector((state) => state.node.error);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNodesBySystem({}));
    }, []);

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100%', width: '90%' }}>
            {!error && <DataGrid rows={nodes} columns={columns} rowHeight={150} loading={loading} pageSize={8} />}
            {error && <ErrorHandler error={ERRORS.BASE} />}
        </Container>
    );
};

export default Devices;
