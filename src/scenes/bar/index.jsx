import { Box, CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";

const Bar = () => {
  const [data, setData] = useState(undefined);

  const getBarChartData = async () => {
    axios.get("admin/stats/usersPerType").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getBarChartData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Histogramme"
        subtitle="Histogramme simple montrant les utilisateurs par type"
      />
      <Box height="75vh">
        {!data && (
          <Box>
            <CircularProgress color="success" />
          </Box>
        )}
        {data && (
          <BarChart
            data={data}
            keys={["count"]}
            indexBy={"type"}
            axisBottomLegend="Type"
            axisLeftLegend="Nombre"
          />
        )}
      </Box>
    </Box>
  );
};

export default Bar;
