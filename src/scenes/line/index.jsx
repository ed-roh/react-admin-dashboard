import { Box, CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import axios from "../../axios/axios";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";

const Line = () => {
  const [data, setData] = useState(undefined);

  const getUsersCountByMonth = async () => {
    await axios.get(`admin/stats/getUsersCountByMonth`).then((res) => {
      setData([
        {
          id: "users",
          color: tokens("dark").greenAccent[500],
          data: res.data,
        },
      ]);
    });
  };

  useEffect(() => {
    getUsersCountByMonth();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Graphique linéaire"
        subtitle="Graphique linéaire simple montrant les dates d'inscription des utilisateurs par mois"
      />
      <Box height="75vh">
        {!data && (
          <Box>
            <CircularProgress color="success" />
          </Box>
        )}
        {data && <LineChart data={data} />}
      </Box>
    </Box>
  );
};

export default Line;
