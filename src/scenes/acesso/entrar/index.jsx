import React, { useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Remover a mensagem de erro ao digitar nos campos
  if (errorMessage) {
    setErrorMessage('');
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Remover a mensagem de erro ao digitar nos campos
  if (errorMessage) {
    setErrorMessage('');
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    // Limpe qualquer mensagem de erro anterior
    setErrorMessage('');

    // Verificar se o email e a senha estão preenchidos
    if (!email || !password) {
      setButtonClicked(true);
      setErrorMessage(<strong>Por favor, preencha todos os campos!</strong>);
      return;
    }

    // Autenticar o usuário com Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Autenticação bem-sucedida', userCredential);
      })
      .catch((error) => {
        setErrorMessage(<strong>Email ou senha inválidos.</strong>);
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

        <StyledForm noValidate>
          <TextField padding="0"
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
            name="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            fullWidth
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {errorMessage && (
            <Typography variant="body2" color="error" style={{ textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledSubmitButton component={Link} to="/dashboard" type="button" variant="contained" onClick={handleSignIn} style={{ backgroundColor: '#FAB141', color: 'white', margin: '15px 0px 15px' }}>
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
