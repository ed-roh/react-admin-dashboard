import React, { useState } from 'react';
import Header from "../../components/Header";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CardHeader, CardMedia, Container, Snackbar } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Premios = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = () => {
        setShowSuccessMessage(true);
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
    };

    return (
        <Box m="20px">
            <Header title="Resgate de Pontos" subtitle="Transforme clientes leais em entusiastas com recompensas que agregam valor ao seu negócio." />
            <Typography variant="h4">
                Personalize os prêmios e quantidade de pontos para resgatá-los. Lembre-se de estimular e fortalecer o engajamento com ótimas recompensas.
                (Ex: descontos, brindes exclusivos, cupons, vale-presente, etc)
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%', backgroundColor: '#9661FF'}}>
                        <CardHeader  title="1º Prêmio" sx={{ textAlign: 'center', fontSize: 45, color: 'white' }} />
                        <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <EmojiEventsIcon style={{ fontSize: 48, color: '#8B4513' }} />
                        </CardMedia>
                        <CardContent>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Descrição do 1º Prêmio...
                                Necessário: XXX pontos "
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%', backgroundColor: '#9661FF' }}>
                        <CardHeader title="2º Prêmio" sx={{ textAlign: 'center', fontSize: 45, color: 'white' }} />
                        <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
                            <EmojiEventsIcon style={{ fontSize: 48, color: 'silver' }} />
                        </CardMedia>
                        <CardContent>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Descrição do 2º Prêmio...
                                Necessário: XXX pontos "
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%', backgroundColor: '#9661FF' }}>
                        <CardHeader title="3º Prêmio" sx={{ textAlign: 'center', fontSize: 45, color: 'white' }} />
                        <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <EmojiEventsIcon style={{ fontSize: 48, color: 'gold' }} />
                        </CardMedia>
                        <CardContent>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Descrição do 3º Prêmio...
                                Necessário: XXX pontos "
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" onClick={handleSave} style={{ width: '200px' }}>
                    Salvar
                </Button>
            </Container>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={showSuccessMessage}
                autoHideDuration={3000} // Define a duração que o snack deve ficar visível (3 segundos neste caso)
                onClose={handleCloseSnackbar}
                message="Salvo com sucesso!"
            />
        </Box>
    );
};

export default Premios;
