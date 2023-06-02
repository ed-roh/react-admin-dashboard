import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [primaryStats, setPrimaryStats] = useState(undefined);
  const [barChartData, setBarChartData] = useState(undefined);
  const [data, setData] = useState(undefined);

  const getStats = async () => {
    try {
      // Oeuvres
      axios.get("admin/stats/oeuvres").then((res) =>
        setPrimaryStats((prev) => ({
          ...prev,
          oeuvres: res.data,
        }))
      );

      // Categories
      axios.get("admin/stats/categories").then((res) =>
        setPrimaryStats((prev) => ({
          ...prev,
          categories: res.data,
        }))
      );

      // Users
      axios.get("admin/stats/users").then((res) =>
        setPrimaryStats((prev) => ({
          ...prev,
          users: res.data,
        }))
      );
      // Signalements Traité
      axios.get("admin/stats/signalementsTraite").then((res) =>
        setPrimaryStats((prev) => ({
          ...prev,
          signalementsTraite: res.data,
        }))
      );

      // Signalements non Traité
      axios.get("admin/stats/signalementsNonTraite").then((res) =>
        setPrimaryStats((prev) => ({
          ...prev,
          signalementsNonTraite: res.data,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getBarChartData = async () => {
    axios.get("admin/stats/usersPerType").then((res) => {
      setBarChartData(res.data);
    });
  };

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
    getStats();
    getBarChartData();
    getUsersCountByMonth();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Tableau de bord"
          subtitle="Bienvenue sur votre tableau de bord"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!primaryStats?.oeuvres && (
              <Box>
                <CircularProgress m={10} color="success" />
              </Box>
            )}
            {primaryStats?.oeuvres && (
              <StatBox
                title={primaryStats?.oeuvres}
                subtitle="Les Oeuvres existants"
                progress="0.75"
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!primaryStats?.categories && (
              <Box>
                <CircularProgress m={10} color="success" />
              </Box>
            )}
            {primaryStats?.categories && (
              <StatBox
                title={primaryStats?.categories}
                subtitle="Les Categories existants"
                progress="0.50"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!primaryStats?.users && (
              <Box>
                <CircularProgress m={10} color="success" />
              </Box>
            )}
            {primaryStats?.users && (
              <StatBox
                title={primaryStats?.users}
                subtitle="Utilisateurs existants"
                progress="0.30"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!primaryStats?.signalementsTraite && (
              <Box>
                <CircularProgress m={10} color="success" />
              </Box>
            )}
            {primaryStats?.signalementsTraite && (
              <StatBox
                title={primaryStats?.signalementsTraite}
                subtitle="Signalements traité"
                progress="0.30"
                icon={
                  <DoneOutlineOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!primaryStats?.signalementsNonTraite && (
              <Box>
                <CircularProgress m={10} color="success" />
              </Box>
            )}
            {primaryStats?.signalementsNonTraite && (
              <StatBox
                title={primaryStats?.signalementsNonTraite}
                subtitle="Signalements non traité"
                progress="0.30"
                icon={
                  <ReportProblemOutlinedIcon
                    sx={{ color: "red", fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Grid>

        {/* ROW 2 */}
        <Grid item xs={12} sm={6}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Grid
              container
              sx={{ padding: "30px 30px 0 30px" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={1}>
                <PersonAddIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h5" fontWeight="600">
                  Nombre d'utilisateur inscrit par mois
                </Typography>
              </Grid>
            </Grid>
            <Box height="350px" m="0">
              {!data && (
                <Box ml={20} mt={15}>
                  <CircularProgress m={10} color="success" />
                </Box>
              )}
              {data && <LineChart isDashboard={true} data={data} />}
            </Box>
          </Box>
        </Grid>

        {/* ROW 3 */}
        <Grid item xs={12} sm={6}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Grid
              container
              sx={{ padding: "30px 30px 0 30px" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={1}>
                <PersonAddIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h5" fontWeight="600">
                  Graph d'utilisateurs
                </Typography>
              </Grid>
            </Grid>
            <Box height="350px">
              {!barChartData && (
                <Box ml={20} mt={15}>
                  <CircularProgress m={10} color="success" />
                </Box>
              )}
              {barChartData && (
                <BarChart
                  isDashboard={true}
                  data={barChartData}
                  keys={["count"]}
                  indexBy={"type"}
                  axisBottomLegend={"Type"}
                  axisLeftLegend={"Nombre"}
                />
              )}
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={6} overflow={"hidden"} mb={"40px"}>
          <Box
            backgroundColor={colors.primary[400]}
            overflow="auto"
            maxHeight={"19rem"}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
