import { Box, Button, TextField, useTheme, Card, CardHeader, CardMedia, CardContent, Grid, Container } from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const Fidelidade = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Função de exemplo para lidar com o clique no botão "Salvar"
    const handleSave = () => {
        // Implemente a ação de salvar aqui
        console.log("Salvando...");
    };

    return (
        <Box m="20px">
            <Header title="Cartão de Fidelidade Digital" subtitle="Personalize seu programa de frequência de compra, e aumente sua vantagem competitiva no mercado!" />

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%', backgroundColor: '#9661FF' }}>
                        <CardHeader
                            title="Cartão de Fidelidade "
                            sx={{ textAlign: 'center', fontSize: '70', color: 'white' }}
                            avatar={
                                <LocalActivityIcon style={{ fontSize: 32, color: 'gold' }} />
                            }
                            action={
                                <LocalActivityIcon style={{ fontSize: 32, color: 'gold' }} />
                            }
                        />
                        <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        </CardMedia>
                        <CardContent>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Descrição do 1º Prêmio... 
                                Necessário: XX compras"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid >
                    <Grid container spacing={7}>
                        <Grid   item xs={8}  sx={{ marginTop: '40px' , marginLeft: '30px' }} >
                            <Typography >
                                Quantidade de frequência de compras:
                            </Typography>
                            <TextField placeholder="0 compras" variant="outlined" fullWidth sx={{ marginTop: 0.5 }} />
                        </Grid>
                        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: '50px' }}>
                            <Button variant="contained" onClick={handleSave} style={{ width: '200px' }}>
                                Salvar
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Fidelidade;
