import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Container, Paper, Typography, TextField, Button, Grid, Link as MuiLink, IconButton, InputAdornment } from '@mui/material';
import styled from '@mui/system/styled';
import LogoAT from '../../../Imgs/variacaoLogoAT.png';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../../Firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
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
});

function Entrar() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [showSenha, setShowSenha] = useState(false); // Corrigido para "showSenha"

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowSenha(!showSenha); // Corrigido para "showSenha"
  };

  const handleSignIn = () => {
    if (!email || !senha) {
      enqueueSnackbar('Por favor, preencha todos os campos!', { variant: 'error' });
      return;
    }

    // Autenticar o usuário com Firebase
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Autenticação bem-sucedida
        enqueueSnackbar('Logado(a) com sucesso!', { variant: 'success' });
        // Redirecionar o usuário para /dashboard aqui
        console.log('Autenticação bem-sucedida', userCredential);
      })
      .catch((error) => {
        enqueueSnackbar('E-mail e/ou senha inválidos', { variant: 'error' });
      });
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledPaper elevation={3}>
        <img src={LogoAT} alt="LogoAT" style={{ maxHeight: '56px' }} />
        
        <Typography component="h1" variant="h3" style={{ marginTop: '10px' }}>
          Acesse sua conta
        </Typography>
        
        <Grid container>
        <Grid item xs>
        <Typography variant="body2" color='#dcdcdc' style={{ marginTop: '26px', marginBottom: '2px' }} >
          *Campos obrigatórios
        </Typography>
        </Grid>
        </Grid>

        <StyledForm noValidate onSubmit={(e) => {
          e.preventDefault(); // Evita a submissão padrão do formulário
          handleSignIn();
        }}>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            fullWidth
            autoFocus
            onChange={handleEmailChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            name="senha"
            label="Senha"
            type={showSenha ? 'text' : 'password'} // Corrigido para "password"
            autoComplete="current-password"
            required
            fullWidth
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showSenha ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StyledSubmitButton type="submit" variant="contained" style={{ backgroundColor: '#FAB141', color: 'white', margin: '15px 0px 15px' }}>
              Entrar
            </StyledSubmitButton>
          </div>

          <Grid container>
            <Grid item xs>
              <StyledLink component={Link} to="/senha" variant="body2">
                Esqueceu a senha?
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink component={Link} to="/cadastro" variant="body2">
                Criar conta
              </StyledLink>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Entrar;
