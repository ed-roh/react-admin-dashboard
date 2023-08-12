
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { tokens } from '../theme/theme';
import Header from '../components/Header';

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  return (
    <Box m='20px'>
      <Header title='FAQ' subtitle='Frequently Asked Questions' />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            An Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, odit doloremque! Nulla facilis autem accusamus quae ducimus deleniti. Dicta, beatae dolore laudantium laborum voluptatum assumenda odio adipisci placeat sunt quis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Another Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, odit doloremque! Nulla facilis autem accusamus quae ducimus deleniti. Dicta, beatae dolore laudantium laborum voluptatum assumenda odio adipisci placeat sunt quis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Your favorite question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, odit doloremque! Nulla facilis autem accusamus quae ducimus deleniti. Dicta, beatae dolore laudantium laborum voluptatum assumenda odio adipisci placeat sunt quis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Random question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, odit doloremque! Nulla facilis autem accusamus quae ducimus deleniti. Dicta, beatae dolore laudantium laborum voluptatum assumenda odio adipisci placeat sunt quis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Final question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, odit doloremque! Nulla facilis autem accusamus quae ducimus deleniti. Dicta, beatae dolore laudantium laborum voluptatum assumenda odio adipisci placeat sunt quis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            An Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, odit doloremque! Nulla facilis autem accusamus quae ducimus deleniti. Dicta, beatae dolore laudantium laborum voluptatum assumenda odio adipisci placeat sunt quis.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FAQ