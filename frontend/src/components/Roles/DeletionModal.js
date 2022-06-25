import React from 'react';
import { CustomOutlinedButton, CustomLoadingButton } from '../Settings/styles';
import { Box, Modal, Typography, Stack } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFF',
    border: '1px solid #393e41',
    boxShadow: 24,
    p: 4
};

const DeletionModal = ({ modalOpen, setModalOpen, handleClick, handleCancel, loading }) => {
    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Are you sure that you want to delete this user?
                </Typography>
                <Stack direction="row" spacing={1}>
                    <CustomLoadingButton fullWidth onClick={handleClick} loading={loading}>
                        Yes
                    </CustomLoadingButton>
                    <CustomOutlinedButton fullWidth onClick={handleCancel}>
                        No
                    </CustomOutlinedButton>
                </Stack>
            </Box>
        </Modal>
    );
};

export default DeletionModal;
