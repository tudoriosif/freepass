import React, { useState } from 'react';
import { SideBox } from './styles';
import { Stack } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import RadarIcon from '@mui/icons-material/Radar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';
import SideBarLink from './SideBarLink';

const SideBar = () => {
    const list = [
        { text: 'Dashboard', Icon: GridViewIcon },
        { text: 'Devices', Icon: LinkedCameraIcon },
        { text: 'Live', Icon: OndemandVideoIcon },
        { text: 'Events', Icon: RadarIcon },
        { text: 'Roles', Icon: PersonAddAlt1Icon },
        { text: 'Settings', Icon: SettingsIcon }
    ];

    const [isOpen, setOpen] = useState(false);

    return (
        <SideBox isOpen={isOpen}>
            <Stack spacing={1}>
                {list.map((item, index) => (
                    <SideBarLink key={index} text={item.text} Icon={item.Icon} isOpen={isOpen} />
                ))}
            </Stack>
        </SideBox>
    );
};

export default SideBar;
