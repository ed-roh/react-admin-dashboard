import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Checkbox, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { tokens } from "../../theme";
import Header from "../../components/Header";

axios.defaults.baseURL = 'https://elections-bice.vercel.app/v1';

const Invoices2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState({});
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/elections/data');
        const usersData = response.data.results;

        setUsers(usersData);

        const initialCheckboxStatus = {};
        usersData.forEach((user) => {
          initialCheckboxStatus[user.id] = user.voted;
        });
        setCheckboxStatus(initialCheckboxStatus);
        setInitialDataFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    if (!initialDataFetched) {
      fetchData();
    }
  }, [initialDataFetched]);

  const handleCheckboxChange = (rowData) => {
    setCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [rowData.id]: !rowData.voted,
    }));
  };

  const handleApply = async (rowData) => {
    try {
      const newVotedStatus = checkboxStatus[rowData.id];

      await axios.put(`/elections/data`, {
        id: rowData.id,
        voted: newVotedStatus,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === rowData.id ? { ...user, voted: newVotedStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  const columns = [
    {
      field: "edit",
      headerName: "לשנות",
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Button
            onClick={() => handleApply(params.row)}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            <HowToVoteIcon sx={{ mr: "10px" }} />
            לשנות
          </Button>
          <Checkbox
            checked={checkboxStatus[params.row.id]}
            onChange={() => handleCheckboxChange(params.row)}
          />
        </Box>
      ),
      width: 200,
      headerAlign: "right",
      align: "right",
      hide: true,
    },
    {
      field: "voted",
      headerName: "הצביע",
      renderCell: (params) => (
        <Box bgcolor={params.row.voted ? "#90EE90" : "#FF7F7F"} textAlign="right">
          {params.row.voted ? <ThumbUpIcon sx={{ mr: "10px" }} /> : <ThumbDownIcon sx={{ mr: "10px" }} />}
        </Box>
      ),
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "ballot",
      headerName: "מס קלפי",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "house_number",
      headerName: "מס בית",
      width: 150,
      headerAlign: "right",
      align: "right",
      hide: true,
    },
    {
      field: "street",
      headerName: "רחוב",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "father_name",
      headerName: "שם אב",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "last_name",
      headerName: "שם משפחה",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "first_name",
      headerName: "שם פרטי",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "id",
      headerName: "ת.ז",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={25}
          rowsPerPageOptions={[]}
        />
      </Box>
    </Box>
  );
};

export default Invoices2;
