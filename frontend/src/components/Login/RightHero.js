import React from 'react';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import HeroIcon from '../../assets/hero-icon.svg';
import { RightText, RightBox } from './styles';

const RightHero = () => {
    return (
        <RightBox>
            <Stack alignItems="center">
                <Box
                    component="img"
                    sx={{
                        height: '40%',
                        width: '40%',
                        maxHeight: { xs: 350, md: 550 },
                        maxWidth: { xs: 350, md: 550 },
                        minWidth: { xs: 250, md: 450 },
                        minHeight: { xs: 250, md: 450 }
                    }}
                    alt="Multimodal"
                    src={HeroIcon}
                />
                <RightText variant="h5" noWrap component="div" textAlign="center">
                    {' '}
                    Surveillance App <br /> with <br />
                    Multimodal biometric <br /> authentication system
                </RightText>
            </Stack>
        </RightBox>
    );
};

export default RightHero;
