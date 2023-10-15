import * as React from 'react';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import 'swiper/swiper-bundle.css'; // Import the Swiper CSS

import InicioImage from '../../Imgs/inicio.png';
import EmpresasImage from '../../Imgs/Empresas.png';
import ClientesImage from '../../Imgs/Clientes.png';
import LogoAT from '../../Imgs/LogoAT.png';

function Home() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      // Atualize o Swiper após a montagem do componente
      swiperRef.current.swiper.update();
    }
  }, []);

  const slideTo = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={LogoAT} alt="Logo" style={{ maxHeight: '48px' }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <Button onClick={() => slideTo(0)} sx={{ marginRight: 8 ,  textTransform: 'none' , color: 'black'}} > Início </Button>
            <Button onClick={() => slideTo(1)} sx={{ marginRight: 8 ,  textTransform: 'none' , color: 'black' }} > Para Empresas </Button>
            <Button onClick={() => slideTo(2)} sx={{ textTransform: 'none' , color: 'black'}} > Para Clientes </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexGrow: 0,
            }}
          >
            <Button
              component={Link}
              to="/entrar"
              sx={{ color: 'inherit', mr: 1 }}
            >
              Entrar
            </Button>
            <Button
              component={Link}
              to="/cadastro"
              sx={{ color: 'inherit' }}
            >
              Cadastrar-se
            </Button>
          </Box>
        </Toolbar>
      </Container>

      <Container maxWidth="xl" style={{ margin: 0, padding: 0 }}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          ref={swiperRef}
        >
          <SwiperSlide>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <img src={InicioImage} alt="Slide 1" style={{ maxWidth: '100%' }} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <img src={EmpresasImage} alt="Slide 2" style={{ maxWidth: '100%' }} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <img src={ClientesImage} alt="Slide 3" style={{ maxWidth: '100%' }} />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Container>

      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderTop: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        <p>
          <span>Todos os direitos reservados</span> <FontAwesomeIcon icon={faCopyright} /> 2023
        </p>
        <p> Desenvolvido <FontAwesomeIcon icon={faCode} color="orange" /> Aimée Ferreira</p>
      </Box>
    </div>
  );
}

export default Home;
