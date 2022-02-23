import React from 'react';
import { Box } from '@mui/system';
// import Carousel from 'react-material-ui-carousel';
import { Typography } from '@mui/material';

const RightHero = () => {
    return (
        <Box sx={{ bgcolor: '#393e41', height: '100vh', width: '50%' }}>
            {/* <Carousel
                index={1} // <-- This controls the activeChild
                autoPlay={false} // <-- You probaly want to disable this for our purposes
                navButtonsAlwaysVisible>
                {[1, 2, 3].map((i) => {
                    return (
                        <Typography align="center" key={i}>
                            Child {i}
                        </Typography>
                    );
                })}
            </Carousel> */}
        </Box>
    );
};

export default RightHero;
