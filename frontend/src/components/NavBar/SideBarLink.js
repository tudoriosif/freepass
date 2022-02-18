import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SideLinkBox, StyledIcon, SideLinkText } from './styles';
import { IconButton } from '@mui/material';

const SideBarLink = ({ text, Icon, to, isOpen }) => {
    const navigate = useNavigate();

    return (
        <SideLinkBox isOpen={isOpen}>
            <IconButton sx={{ p: 0 }} onClick={() => navigate(to || `/${text.toLowerCase()}`)}>
                <StyledIcon component={Icon} />
            </IconButton>
            <SideLinkText variant="h7" component="div" isOpen={isOpen}>
                {text}
            </SideLinkText>
        </SideLinkBox>
    );
};

export default SideBarLink;
