import { Box, colors } from '@mui/material'

import Header from '../components/Header'
import GeographyChart from '../components/GeographyChart'

const Geography = () => {
  return (
    <Box m='20px'>
      <Header title='Geography Chart' subtitle='Geography Chart' />
      <Box height='75vh' borderRadius='4px' border={`1px solid ${colors.grey[100]}`}>
        <GeographyChart />
      </Box>
    </Box>
  )
}

export default Geography