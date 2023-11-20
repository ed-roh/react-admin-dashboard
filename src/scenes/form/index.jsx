import React, { useState } from 'react';
import Header from "../../components/Header";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

function isLinkValid(link) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(link);
}

const Form = () => {
  const [link, setLink] = useState('');
  const [savedData, setSavedData] = useState(null);

  const handleSave = () => {
    if (isLinkValid(link)) {
      const savedDataMessage = `Link salvo: ${link}`;
      setSavedData(savedDataMessage);
    } else {
      setSavedData("Link inválido. Por favor, insira um link válido.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Pesquisa de Satisfação" subtitle="Obtenha feedbacks de seus clientes através do email de pesquisa de satisfação pós compra" />
      <Typography variant="h4">
        Os formulários são uma parte essencial da interação online. Através da plataforma Forms totalmente gratuita,<br /> é possível criar e personalizar vários formulários a partir do seu segmento.
      </Typography>

      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 3 }}>
        <Typography>
          <Grid >
              <Typography>
                Quantos dias após a compra:
              </Typography>
              <TextField placeholder="0 dias" variant="outlined" fullWidth sx={{ marginTop: 0.5, width: '300px' }} />
              <Typography sx={{ marginTop: 2 }}>
                Pontuação a ser obtida por resposta:
              </Typography>
              <TextField placeholder="0 pontos" variant="outlined" fullWidth sx={{ marginTop: 0.5, width: '300px' }} />
          </Grid>
        </Typography>
      </Box>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
        {savedData && <p>{savedData}</p>}
        <Typography>
                Cole seu link de formulário Forms:
              </Typography>
        <TextField
          variant="outlined"
          placeholder="Inserir link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button variant="contained" onClick={handleSave} style={{ marginTop: '10px', width: '200px' }}>
          Salvar
        </Button>
      </div>
    </Box>
  );
};

export default Form;
