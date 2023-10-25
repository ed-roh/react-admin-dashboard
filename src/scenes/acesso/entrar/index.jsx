import React from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import styled from '@mui/system/styled';
import LogoAT from '../../../Imgs/variacaoLogoAT.png';
import { Link } from 'react-router-dom';

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
  return (
    <StyledContainer maxWidth="xs">
      <StyledPaper elevation={3}>
        <img src={LogoAT} alt="LogoAT" style={{ maxHeight: '56px' }} />

        <Typography component="h1" variant="h3" style={{ marginTop: '14px' }}>
          Acesse sua conta
        </Typography>

        <StyledForm noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            fullWidth
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
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
