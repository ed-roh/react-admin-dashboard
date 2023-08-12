
import React from 'react'
import { tokens } from '../theme/theme';
import { Box, Typography, useTheme } from '@mui/material';

interface HeaderProps {
    title: string;
    subtitle: string;
}
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return (
        <Box mb='30px'>
            <Typography
                variant='h2'
                color={colors.grey[100]}
                fontWeight='bold'
                sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography
                variant='h5'
                color={colors.greenAccent[400]}

            >
                {subtitle}
            </Typography>
        </Box>
    )
}

export default Header