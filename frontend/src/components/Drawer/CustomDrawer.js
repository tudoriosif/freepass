import React, { useState } from 'react';

import { Drawer, Fab, Stack, InputLabel, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StyledSelect } from './style';
import { ADD_FORMS } from './formPicker';

const CustomDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [componentValue, setComponentValue] = useState('device');

    return (
        <>
            <Fab
                color="secondary"
                aria-label="add"
                sx={{ position: 'absolute', bottom: '30px', right: '30px' }}
                onClick={() => setDrawerOpen(true)}>
                <AddIcon />
            </Fab>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Stack sx={{ p: 4, width: '400px', flex: 1 }}>
                    <Stack pb={4}>
                        <InputLabel id="select-label">Choose what to add</InputLabel>
                        <StyledSelect
                            labelId="select-label"
                            value={componentValue}
                            label="component"
                            onChange={(event) => setComponentValue(event.target.value)}>
                            <MenuItem value={'device'}>Device</MenuItem>
                            <MenuItem value={'user'}>User</MenuItem>
                            <MenuItem value={'event'}>Event</MenuItem>
                        </StyledSelect>
                    </Stack>
                    {componentValue && ADD_FORMS[componentValue](setDrawerOpen)}
                </Stack>
            </Drawer>
        </>
    );
};

export default CustomDrawer;
