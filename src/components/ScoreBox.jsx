import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { CircularProgress } from "@mui/material";
import { Height } from "@mui/icons-material";

const ScoreBox = ({ score }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
          }}
          size={70}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "#00cc00" : "#009900",
            position: "absolute",
            left: 0,
          }}
          size={70}
          thickness={4}
          value={score}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h1" component="div" color="secondary">
            {score}
          </Typography>
        </Box>
      </Box>
      <Typography m="10px" variant="h3" component="div" color="secondary">
        Risk Score
      </Typography>
    </>
  );
};

export default ScoreBox;
