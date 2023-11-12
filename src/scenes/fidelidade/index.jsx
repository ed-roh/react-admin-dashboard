import { Box, Button, TextField, useTheme, Card, CardHeader, CardMedia, CardContent, Grid, Container, Snackbar } from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Fidelidade = () => {
    const auth = getAuth(); // Obtenha a instância de autenticação
    const db = getFirestore(); // Obtenha a instância do Firestore

    const [user] = useAuthState(auth); // Use o hook de estado para obter o usuário autenticado

    const [frequenciaCompras, setFrequenciaCompras] = useState(0);
    const [originalFrequenciaCompras, setOriginalFrequenciaCompras] = useState(0);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    useEffect(() => {
        if (user) {
            // Obtém o ID do usuário atualmente autenticado
            const userID = user.uid;

            // Define a referência do documento de frequência de compras no Firestore
            const frequenciaComprasRef = doc(db, 'frequenciaCompras', userID);

            // Obtém o documento de frequência de compras no Firestore
            getDoc(frequenciaComprasRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        // Se o documento existir, atualiza o estado com o valor do Firestore
                        setFrequenciaCompras(docSnapshot.data().valor);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao obter frequência de compras do Firestore:", error);
                });
        }
    }, [user, db]);

    const handleSave = () => {
        if (frequenciaCompras !== originalFrequenciaCompras) {
            // Apenas mostrar a notificação se o campo foi alterado
            setShowSuccessNotification(true);
            setOriginalFrequenciaCompras(frequenciaCompras);

            if (user) {
                // Atualiza a frequência de compras no Firestore
                const userID = user.uid;
                const frequenciaComprasRef = doc(db, 'frequenciaCompras', userID);

                setDoc(frequenciaComprasRef, { valor: frequenciaCompras })
                    .then(() => {
                        console.log("Frequência de compras salva com sucesso!");
                    })
                    .catch((error) => {
                        console.error("Erro ao salvar frequência de compras no Firestore:", error);
                    });
            }
        }
    };

    const handleCloseNotification = () => {
        setShowSuccessNotification(false);
    };

    return (
        <Box m="20px">
            <Header title="Cartão de Fidelidade Digital" subtitle="Personalize seu programa de frequência de compra e aumente sua vantagem competitiva no mercado!" />

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%', backgroundColor: '#9661FF' }}>
                        <CardHeader
                            title="Cartão de Fidelidade"
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
                                placeholder="Descrição do Prêmio..."
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Grid container spacing={7}>
                        <Grid item xs={8} sx={{ marginTop: '40px', marginLeft: '30px' }}>
                            <Typography>
                                Quantidade de frequência de compras:
                            </Typography>
                            <TextField
                                placeholder="0 compras"
                                variant="outlined"
                                fullWidth
                                sx={{ marginTop: 0.5 }}
                                value={frequenciaCompras}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setFrequenciaCompras(isNaN(value) ? 0 : value);
                                }}
                            />
                        </Grid>
                        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: '50px' }}>
                            <Button variant="contained" onClick={handleSave} style={{ width: '200px' }}>
                                Salvar
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={showSuccessNotification}
                onClose={handleCloseNotification}
                message="Salvo com sucesso!"
            />
        </Box>
    );
};

export default Fidelidade;
