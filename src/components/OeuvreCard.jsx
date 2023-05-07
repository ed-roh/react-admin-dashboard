import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../axios/axios";
import { tokens } from "../theme";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { getCategorieByID } from "../utils/categorie";

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  carousel: {
    position: "relative",
  },
  carouselButton: {
    transform: "translateY(-50%)",
  },
});

const OeuvreCard = forwardRef(({ oeuvre, onClose }, ref) => {
  const carouselRef = useRef(null);

  useImperativeHandle(ref, () => ({
    slidePrev: () => carouselRef.current?.slidePrev(),
    slideNext: () => carouselRef.current?.slideNext(),
  }));

  const handleCarouselPrev = () => {
    carouselRef?.current?.slidePrev();
  };

  const handleCarouselNext = () => {
    carouselRef?.current?.slideNext();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();

  const [categorie, setCategorie] = useState("");

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

  useEffect(() => {
    handleGetCategorie();
  }, []);

  return (
    <Card ref={ref}>
      <CardHeader
        title={titre_oeuvre}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Carousel
        sx={{
          width: "50%",
          height: "50%",
        }}
        autoPlay={false}
        indicators={false}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          className: classes.carouselButton,
        }}
        PrevIcon={
          <IconButton onClick={handleCarouselPrev}>
            <NavigateBefore />
          </IconButton>
        }
        NextIcon={
          <IconButton onClick={handleCarouselNext}>
            <NavigateNext />
          </IconButton>
        }
        ref={carouselRef}
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
          <strong>Techniques et materiaux:</strong> {techniques_et_materiaux}
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
    </Card>
  );
});

export default OeuvreCard;
