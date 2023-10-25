import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import styled from '@mui/system/styled';
import LogoAT from '../../../Imgs/variacaoLogoAT.png';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const StyledMessage = styled(Paper)({
  background: '#FAB141',
  opacity: '0.9',
  padding: '16px',
  marginTop: '16px',
});

const StyledPaper = styled(Paper)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  backgroundColor: '#8C52FF',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '8px',
});

const StyledSubmitButton = styled(Button)({
  margin: '24px 0 16px',
});

const StyledLink = styled(MuiLink)({
  color: 'white',
  textDecorationColor: 'white',
  textAlign: 'left',
});

function RedefinirSenha() {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setError(null);
    } catch (error) {
      setError("Email inválido/não encontrado!");
      setResetEmailSent(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailFocus = () => {
    setError(null); // Limpa a mensagem de erro quando o TextField recebe foco
  };

  return (

    <StyledContainer maxWidth="xs">
      <StyledPaper elevation={3}>
        <img src={LogoAT} alt="LogoAT" style={{ maxHeight: '56px' }} />

        <Typography component="h1" variant="h3" style={{ marginTop: '14px' }}>
          Recuperar Senha
        </Typography>

        {resetEmailSent ? (
          <StyledMessage elevation={3} style={{ width: '400px' }}>
            <Typography variant="body1" align="center" color="black" style={{ fontWeight: 'bold' }} >
              Um e-mail de recuperação de senha foi enviado!
            </Typography>
            <Typography variant="body1" align="center" color="black" style={{ fontWeight: 'bold' }}>
              Verifique sua caixa de entrada.
            </Typography>
          </StyledMessage>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <TextField variant="outlined" margin="normal" label="Email" name="email" type="email" autoComplete="email" required fullWidth autoFocus
              value={email} onChange={handleEmailChange} onFocus={handleEmailFocus} inputProps={{ style: { width: '300px' } }}
            />

            {error && (
              <Typography variant="body2" align="center" style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
                {error}
              </Typography>
            )}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StyledSubmitButton type="submit" variant="contained" style={{ backgroundColor: '#FAB141', color: 'white', margin: '15px 0px 15px' }}>
                Enviar e-mail de recuperação
              </StyledSubmitButton>
            </div>
          </StyledForm>
        )}

        <StyledLink component={Link} to="/entrar" variant="body2" style={{ marginTop: '16px' }}>
          Voltar para a página de login
        </StyledLink>
      </StyledPaper>
    </StyledContainer>
  );
}

export default RedefinirSenha;
