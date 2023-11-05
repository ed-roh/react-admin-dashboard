import * as React from 'react';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import 'swiper/swiper-bundle.css';
import './styles.css';

import InicioImage from '../../Imgs/inicio.png';
import EmpresasImage from '../../Imgs/Empresas.png';
// import ClientesImage from '../../Imgs/Clientes.png';
import LogoAT from '../../Imgs/LogoAT.png';

function Home() {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
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
                    <img src={LogoAT} alt="Logo" style={{ maxHeight: '46px' }} />

                    {/*
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, }} >
                        <Button onClick={() => slideTo(0)} sx={{ marginRight: 8, textTransform: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px' }} > Início </Button>
                        <Button onClick={() => slideTo(1)} sx={{ marginRight: 8, textTransform: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px'  }} > Para Empresas </Button>
                        <Button onClick={() => slideTo(2)} sx={{ textTransform: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px'  }} > Para Clientes </Button>
                    </Box>
    */}

                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>

                        <Button component={Link} to="/entrar"
                            sx={{
                                cursor: 'pointer', borderRadius: '10px', padding: '3px 7px',
                                fontSize: '15px', color: '#FFF', backgroundColor: '#FAB141',
                                boxShadow: '8px 8px 6px rgba(0, 0, 0, 0.1)',
                                '&:not(:last-child)': { marginRight: '10px', },
                                '&:hover': { backgroundColor: '#FF914D', },
                            }} >
                            Entrar
                        </Button>

                        <Button component={Link} to="/cadastro"
                            sx={{
                                cursor: 'pointer', borderRadius: '10px', padding: '3px 7px',
                                fontSize: '15px', color: '#FFF', backgroundColor: '#FAB141',
                                boxShadow: '8px 8px 6px rgba(0, 0, 0, 0.1)',
                                '&:not(:last-child)': { marginRight: '10px', },
                                '&:hover': { backgroundColor: '#FF914D', },
                            }}>
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
                    className="swiper-container" 
                >
                    <SwiperSlide>
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" >
                            <img src={InicioImage} alt="Slide 1" style={{ maxWidth: '100%', height: '100%' }} />
                        </Box>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" >
                            <img src={EmpresasImage} alt="Slide 2" style={{ maxWidth: '100%' }} />
                        </Box>
                    </SwiperSlide>

                    {/*
                    <SwiperSlide>
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" >
                            <img src={ClientesImage} alt="Slide 3" style={{ maxWidth: '100%' }} />
                        </Box>
                    </SwiperSlide>
                        */}

                </Swiper>
            </Container>

        </div>
    );
}

export default Home;
