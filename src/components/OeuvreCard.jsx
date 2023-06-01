import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../axios/axios";
import { tokens } from "../theme";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { useRef, useImperativeHandle, useState, useEffect } from "react";
import { getCategorieByID } from "../utils/categorie";

const useStyles = makeStyles({
  media: {
    height: 0,
    maxWidth: "100%",
    paddingTop: "100%", // 16:9
  },
  carousel: {
    position: "relative",
  },
  carouselButton: {
    transform: "translateY(-50%)",
  },
});

const OeuvreCard = ({ oeuvre, onClose }) => {
  const carouselRef = useRef(null);

  useImperativeHandle(null, () => ({
    slidePrev: () => carouselRef.current?.slidePrev(),
    slideNext: () => carouselRef.current?.slideNext(),
  }));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();

  const [categorie, setCategorie] = useState("");
  const [avis, setAvis] = useState(null);

  const {
    id_oeuvre,
    id_categorie,
    id_artisan,
    titre_oeuvre,
    contexte_realisation,
    date_realisation,
    date_publication,
    description,
    dimensions,
    images_oeuvre,
    prix,
    techniques_et_materiaux,
  } = oeuvre;

  const deleteOeuvre = async (id) => {
    await axios.delete(`/admin/oeuvre/${id}`).catch((err) => {
      console.log(err);
    });
  };

  const handleGetCategorie = async () => {
    const categorie = await getCategorieByID(id_categorie);
    setCategorie(categorie.nom_categorie);
  };

  const getAvis = async () => {
    await axios.get(`avis/?id_oeuvre=${id_oeuvre}`).then((res) => {
      setAvis(res.data);
    });
  };

  useEffect(() => {
    handleGetCategorie();
    getAvis();
  }, []);

  return (
    <Card sx={{ height: "fit-content" }}>
      <CardHeader
        title={titre_oeuvre}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={5} sx={{ padding: "0 0.7rem" }}>
          <Carousel
            sx={
              {
                // width: "100%",
                // height: "fit-content",
              }
            }
            autoPlay={true}
            indicators={true}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
              className: classes.carouselButton,
            }}
            PrevIcon={<NavigateBefore />}
            NextIcon={<NavigateNext />}
          >
            {images_oeuvre?.map((image) => (
              <CardMedia
                key={image}
                className={classes.media}
                image={image}
                title={titre_oeuvre}
              />
            ))}
          </Carousel>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              <strong>Titre:</strong> {titre_oeuvre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Categorie:</strong> {categorie}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Contexte réalisation:</strong> {contexte_realisation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Date réalisation:</strong>{" "}
              {new Date(date_realisation).toLocaleDateString("fr-FR")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Date publication:</strong>{" "}
              {new Date(date_publication).toLocaleDateString("fr-FR")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Dimensions:</strong> {dimensions}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Techniques et materiaux:</strong>{" "}
              {techniques_et_materiaux}
            </Typography>
            <hr style={{ width: "50%" }} />
            <Typography variant="h3" gutterBottom>
              <strong>Prix:</strong> {prix} {"DA"}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 5, color: colors.redAccent[500] }}
              onClick={() => deleteOeuvre(id_oeuvre)}
            >
              Supprimer
            </Button>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          sx={{ padding: "0 1.5rem", height: "fit-content" }}
        >
          {avis && (
            <>
              <Typography variant="h2">Les avis:</Typography>
              <Paper
                sx={{
                  padding: "1.2rem 0",
                  mb: 5,
                  maxHeight: "35rem",
                  overflowY: "auto",
                }}
              >
                {avis?.map((avis, index) => {
                  return (
                    <span key={index}>
                      <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                          <Avatar alt="photo" src={avis.user.photo} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                          <h4 style={{ margin: 0, textAlign: "left" }}>
                            {avis.user.nom} {avis.user.prenom}
                          </h4>
                          <p style={{ textAlign: "left" }}>{avis.contenu}</p>
                          <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                          </p>
                        </Grid>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        style={{ margin: "10px 0" }}
                      />
                    </span>
                  );
                })}
              </Paper>
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default OeuvreCard;
