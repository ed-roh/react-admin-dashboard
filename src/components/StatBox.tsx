
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../theme/theme';
import ProgressCircle from './ProgressCircle';

interface StatProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    progress: string | number;
    increase: string | number;

}
const StatBox: React.FC<StatProps> = ({
    title,
    subtitle,
    icon,
    progress,
    increase
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return (
        <Box width='100%' m='0 30px'>
            <Box display='flex' justifyContent='space-between'>
                <Box>
                    {icon}
                    <Typography
                        variant='h4'
                        fontWeight='bold'
                        sx={{ color: colors.grey[100] }}
                    >
                        {title}
                    </Typography>
                </Box>

                <Box>
                    <ProgressCircle progress={progress} />
                </Box>

            </Box>

            <Box display='flex' justifyContent='space-between'>
                <Typography
                    variant='h4'
                    fontWeight='bold'
                    sx={{ color: colors.greenAccent[500] }}
                >
                    {subtitle}
                </Typography>

                <Typography
                    variant='h4'
                    fontWeight='italic'
                    sx={{ color: colors.greenAccent[600] }}
                >
                    {increase}
                </Typography>
            </Box>
        </Box>
    )
}

export default StatBox