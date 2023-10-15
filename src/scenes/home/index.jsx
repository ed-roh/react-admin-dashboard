import * as React from 'react';
import AppBar from '@mui/material/AppBar';
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

import InicioImage from '../../Imgs/inicio.png';
import EmpresasImage from '../../Imgs/Empresas.png';
import ClientesImage from '../../Imgs/Clientes.png';

function Home() {

    const slides = [
        { image: InicioImage },
        { image: EmpresasImage },
        { image: ClientesImage },
    ];

    return (
        <div>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 0,
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Aqui começa a seção do Navbar */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <Button
                            component={Link}
                            to="InicioImage"
                            sx={{ color: 'inherit' }}
                        >
                            Início
                        </Button>
                        <Button
                            component={Link}
                            to="/slide2"
                            sx={{ color: 'inherit' }}
                        >
                            Benefícios
                        </Button>
                        <Button
                            component={Link}
                            to="/slide3"
                            sx={{ color: 'inherit' }}
                        >
                            Sobre Nós
                        </Button>
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
                            to="/cadastrar-se"
                            sx={{ color: 'inherit' }}
                        >
                            Cadastrar-se
                        </Button>
                    </Box>

                    {/* Fim da seção do Navbar */}
                </Toolbar>
            </Container>

            <Container maxWidth="x1" style={{ margin: 0, padding: 0 }}>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                minHeight="80vh"
                            >
                                <img src={slide.image} alt={slide.title} style={{ maxWidth: '100%' }} />
                                <Typography variant="h4">{slide.title}</Typography>
                                <Typography variant="body1">{slide.content}</Typography>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>

            {/* Aqui começa a seção do Footer */}
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    borderTop: '1px solid #ccc',
                    textAlign: 'center',
                }}
            >
                <p>
                    <span>Trade Stream</span> <FontAwesomeIcon icon={faCopyright} /> 2023
                </p>
                <p> Desenvolvido <FontAwesomeIcon icon={faCode} color="orange" /> Aimée Ferreira</p>
            </Box>
            {/* Fim da seção do Footer */}
        </div>
    );
}

export default Home;
