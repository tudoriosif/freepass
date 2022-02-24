import React from 'react';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import HeroIcon from '../../assets/hero-icon.svg';

const RightHero = () => {
    return (
        <Box sx={{ bgcolor: '#393e41', height: '100vh', width: '50%' }}>
            <Stack>
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
                <Typography variant="h3" noWrap component="div">
                    {' '}
                    Multimodal biometric authentication system
                </Typography>
            </Stack>
        </Box>
    );
};

export default RightHero;
