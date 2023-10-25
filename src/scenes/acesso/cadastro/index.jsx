import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Link as MuiLink, Grid, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import styled from '@mui/system/styled';
import InputMask from 'react-input-mask';
import LogoAT from '../../../Imgs/variacaoLogoAT.png';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 16,
  backgroundColor: '#8C52FF',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const StyledLink = styled(MuiLink)({
  color: 'white',
  textDecorationColor: 'white',
});

function Cadastro() {
  const [tipo, setTipo] = useState('empresa'); // Valor padrão: 'empresa'

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledPaper elevation={3}>
        <img src={LogoAT} alt="LogoAT" style={{ maxHeight: '56px' }} />

        <Typography component="h1" variant="h3" style={{ marginTop: '14px' }}>
          Criar uma conta
        </Typography>

        <StyledForm noValidate>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <RadioGroup row name="tipo" value={tipo} onChange={handleTipoChange}>
              <FormControlLabel value="empresa" control={<Radio />} label="Empresa" />
              <FormControlLabel value="cliente" control={<Radio />} label="Cliente" />
            </RadioGroup>
          </div>

          {tipo === 'empresa' && (
            <>
              <InputMask mask="99.999.999/9999-99" maskChar={null}>
                {() => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="CNPJ"
                    name="cnpj"
                    autoComplete="cnpj"
                    placeholder="Ex: 00.000.000/0000-00"
                    required
                    fullWidth
                    autoFocus
                  />
                )}
              </InputMask>
              <TextField
                variant="outlined"
                margin="normal"
                label="Razão Social"
                name="razaoSocial"
                autoComplete="organization"
                required
                fullWidth
              />

              <TextField
                variant="outlined"
                margin="normal"
                label="Email Profissional"
                name="email"
                type="email"
                autoComplete="email"
                required
                fullWidth
              />
            </>
          )}

          {tipo === 'cliente' && (
            <>
              <InputMask mask="999.999.999-99" maskChar={null}>
                {() => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="CPF"
                    name="cpf"
                    autoComplete="cpf"
                    placeholder="Ex: 000.000.000-00"
                    required
                    fullWidth
                  />
                )}
              </InputMask>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Nome"
                  name="nome"
                  autoComplete="given-name"
                  required
                  fullWidth
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Sobrenome"
                  name="sobrenome"
                  autoComplete="family-name"
                  style={{ marginLeft: '16px' }}
                  required
                  fullWidth
                />
              </div>

              <TextField
                variant="outlined"
                margin="normal"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                fullWidth
              />
            </>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            label="Criar Senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StyledSubmitButton
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#FAB141', color: 'white', margin: '15px 0px 15px' }}
            >
              Criar conta
            </StyledSubmitButton>
          </div>

          <Grid container>
            <Grid item xs>
              <StyledLink component={Link} to="/entrar" variant="body2" >
                Já possui conta?
              </StyledLink>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Cadastro;
