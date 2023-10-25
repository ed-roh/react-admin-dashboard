import { Box, Button, TextField, Checkbox, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';

const Fidelidade = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Header title="Fidelização de Clientes" subtitle="Personalize seu Programa de Pontos e garanta sua vantagem competitiva no mercado!" />

            <Accordion style={{ backgroundColor: '#35338d'}} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Pesquisa de Satisfação Automática
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box display="flex"
                            gap="30px"
                            alignItems="center">

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Habilite a Pesquisa de Satisfação para obter feedback de seus clientes."
                            />
                        </Box>

                        <Box display="flex" justifyContent="space-between" p={4}>
                            <Typography>
                                <Grid container spacing={0.5}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Quantos dias após a compra
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField placeholder="0 dias" variant="outlined" fullWidth sx={{ marginTop: 0.5 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Pontuação
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField placeholder="0 pontos" variant="outlined" fullWidth sx={{ marginTop: 0.5 }} />
                                    </Grid>
                                </Grid>
                            </Typography>
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Ativar lembrete Email Automático"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Ativar lembrete SMS Automático"
                                    />
                                </FormGroup>

                                <Button variant="contained" color="secondary">Botão 2</Button>
                                <Button variant="contained" color="info">Botão 3</Button>
                                <Button variant="contained" color="warning">Botão 4</Button>

                            </FormControl>

                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: '#35338d'}} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Cartão de Fidelidade Digital
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box display="flex"
                            gap="30px"
                            alignItems="center">

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Habilite o Cartão de Fidelidade Digital para que incentive a frequência de compra de seus clientes ao conquistar prêmios."
                            />
                        </Box>
                    </Typography>
                    <Typography>
                        <Box display="flex" gap="30px" alignItems="center">
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Cartão de Fidelidade: Computar 10 compras"
                            />
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: '#35338d'}} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Indicação de Amigos
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box display="flex"
                            gap="30px"
                            alignItems="center">

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Habilite a Indicação de Amigos para conquistar novos clientes."
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between" p={4}>
                            <Typography>
                                <Grid container spacing={0.5}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Pontos que serão obtidos para quem indica
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField placeholder="0 pontos" variant="outlined" fullWidth sx={{ marginTop: 0.5 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginTop: 1 }} >
                                            Amigo(a) indicado(a) ganha pontos
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField placeholder="0 pontos" variant="outlined" fullWidth sx={{ marginTop: 0.5 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginTop: 1 }} >
                                            Pontos na primeira compra do(a) indicado(a)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField placeholder="0 pontos" variant="outlined" fullWidth sx={{ marginTop: 0.5 }} />
                                    </Grid>
                                </Grid>
                            </Typography>

                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: '#35338d'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Prêmios por Pontos
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box >
    );
};

export default Fidelidade;
