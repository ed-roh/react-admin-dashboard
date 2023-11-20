import React, { useState } from 'react';
import Header from "../../components/Header";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Snackbar } from "@mui/material";

const Indicacao = () => {
    const [savedData, setSavedData] = useState(null);
    const [cupomAtivo, setCupomAtivo] = useState(false);
    const [cupomValue, setCupomValue] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = () => {
        setShowSuccessMessage(true);
    };

    const handleCupomCheckboxChange = (event) => {
        setCupomAtivo(event.target.checked);
        if (!event.target.checked) {
            setCupomValue('');
        }
        setShowSuccessMessage(true);
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
    };

    return (
        <Box m="20px">
            <Header title="Indique e Ganhe" subtitle="Incentive as indicações por meio de pontos, para conquistar novos potenciais clientes" />
            <Typography variant="h4">
                Nossos clientes existentes desempenham um papel fundamental, recomendando nossos produtos e serviços para suas redes de contatos.<br /> É possível criar e personalizar vários formulários a partir do seu segmento.
            </Typography>

            <Box display="flex" justifyContent="space-between" sx={{ marginTop: 3 }}>
                <Typography>
                    <Typography>
                        Pontos a serem obtidos para quem indica:
                    </Typography>
                    <TextField
                        placeholder="0 pontos"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: 0.5, width: '400px' }}
                    />
                    <Typography sx={{ marginTop: 2 }}>
                        Cadastro de novo(a) amigo(a) indicado(a):
                    </Typography>
                    <TextField
                        placeholder="0 pontos"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: 0.5, width: '400px' }}
                    />
                    <Typography sx={{ marginTop: 2 }}>
                        Pontos na primeira compra do(a) indicado(a):
                    </Typography>
                    <TextField
                        placeholder="0 pontos"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: 0.5, width: '400px' }}
                    />
                </Typography>
                <div>
                    <FormControlLabel
                        control={<Checkbox checked={cupomAtivo} onChange={handleCupomCheckboxChange} />}
                        label="Cupom Promocional"
                        sx={{ marginRight: 60 }}
                    />
                    <TextField
                        placeholder="Ative o cupom promocional"
                        variant="outlined"
                        fullWidth
                        sx={{ width: '250px', display: 'flex', flexDirection: 'column', textTransform: 'uppercase' }}
                        disabled={!cupomAtivo}
                        value={cupomValue}
                        onChange={(e) => {
                            setCupomValue(e.target.value.toUpperCase());
                        }}
                    />
                </div>
            </Box>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" onClick={handleSave} style={{ marginTop: '10px', width: '200px' }}>
                    Salvar
                </Button>
            </div>

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

export default Indicacao;
