import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Link as MuiLink, Grid, IconButton, InputAdornment } from '@mui/material';
import styled from '@mui/system/styled';
import InputMask from 'react-input-mask';
import LogoAT from '../../../Imgs/variacaoLogoAT.png';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      // Verifique se o email já está em uso
      const emailQuery = query(collection(db, 'usuários'), where('email', '==', email)); // Corrigido para 'usuários'
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        setError("Este email já está em uso.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await sendEmailVerification(userCredential.user);

      // Salve os campos adicionais no Firestore
      const user = userCredential.user;
      const userRef = collection(db, 'usuários'); // Corrigido para 'usuários'

      // Adicione um documento com os dados do usuário
      await addDoc(userRef, {
        cnpj: cnpj,
        razaoSocial: razaoSocial,
        email: email,
        senha: senha,
      });

      window.location.href = '/dashboard';

    } catch (error) {
      console.error("Erro ao criar a conta", error);
      setError("Erro ao criar a conta. Por favor, tente novamente.");
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledPaper elevation={3}>
        <img src={LogoAT} alt="LogoAT" style={{ maxHeight: '56px' }} />

        <Typography component="h1" variant="h3" style={{ marginTop: '14px' }}>
          Criar uma conta
        </Typography>

        <Grid container>
        <Grid item xs>
        <Typography variant="body2" color='#dcdcdc' style={{ marginTop: '26px', marginBottom: '2px' }} >
          *Campos obrigatórios
        </Typography>
        </Grid>
        </Grid>

        <StyledForm noValidate onSubmit={handleSignUp}>
          {error && <div>{error}</div>}

          <InputMask mask="99.999.999/9999-99" maskChar={null} value={cnpj} onChange={(e) => setCnpj(e.target.value)} >
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
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            label="Criar Senha"
            name="senha"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            fullWidth
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
              <StyledLink component={Link} to="/entrar" variant="body2">
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
