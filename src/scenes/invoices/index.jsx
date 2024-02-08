import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

import MaterialTable from 'material-table'
import '@mui/material/styles';
import '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import { FirstPage, LastPage, ChevronLeft, ChevronRight, Search, Clear } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Checkbox from '@mui/material/Checkbox';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

axios.defaults.baseURL = 'https://elections-bice.vercel.app/v1';

const Invoices = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableKey, setTableKey] = useState(0);
  const [users, setUsers] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState({});

  const [initialDataFetched, setInitialDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const response = await axios.get('/elections/data');
        const usersData = response.data.results;

        // Set the users and initialize checkbox status based on 'voted' parameter
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

    // Call the fetchData function only if initial data has not been fetched
    if (!initialDataFetched) {
      fetchData();
    }
  }, [initialDataFetched]);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: 'right', // Align text to the right in body cells
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'right', // Align text to the right in body cells

    },
  }));

  const StyledVotedTableCell = styled(TableCell)(({ theme, voted }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: 'right', // Align text to the right in body cells
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor: voted ? "#90EE90" : "#FF7F7F",
      textAlign: 'right', // Align text to the right in body cells
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

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

      // Update state without fetching data again
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === rowData.id ? { ...user, voted: newVotedStatus } : user
        )
      );

      // Force re-render by changing the key
      setTableKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };


  const columns = [
    {
      title: "Change",
      field: "edit",
      render: (rowData) => (
        <>
          <Box>
            <Button onClick={() => handleApply(rowData, rowData.checkboxStatus)}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <HowToVoteIcon sx={{ mr: "10px" }} />
              לשנות
            </Button>
            <Checkbox
              checked={checkboxStatus[rowData.id]}
              onChange={() => handleCheckboxChange(rowData)}
            />
          </Box>
        </>
      ),
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right', className: 'custom-header',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700],
        padding: "20px 10px 20px 10px",
        fontSize: "20px",
        cursor: "pointer"
      }
    },
    {
      title: "הצביע", field: "voted",
      cellStyle: { textAlign: 'right', className: 'custom-cell' },
      headerStyle: {
        textAlign: 'right', className: 'custom-header',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700],
        padding: "20px 10px 20px 10px",
        fontSize: "20px",
        cursor: "pointer"
      }
    },
    {
      title: "מס קלפי", field: "ballot",
      cellStyle: { textAlign: 'right', className: 'custom-cell' },
      headerStyle: {
        textAlign: 'right', className: 'custom-header',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700],
      }
    },
    {
      title: "מס בית", field: "house_number",
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700]
      }
    },
    {
      title: "רחוב", field: "street",
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700]
      }
    },
    {
      title: "שם אב", field: "father_name",
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700]
      }
    },
    {
      title: "שם משפחה", field: "last_name",
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700]
      }
    },
    {
      title: "שם פרטי", field: "first_name",
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700]
      }
    },
    {
      title: "ת.ז", field: "id",
      cellStyle: { textAlign: 'right' },
      headerStyle: {
        textAlign: 'right',
        backgroundColor: colors.blueAccent[700],
        borderStyle: "solid", borderColor: "white",
        borderTopColor: colors.blueAccent[700],
        borderBottomColor: colors.blueAccent[700]
      }
    }
  ]; //cursor pointer


  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      {<Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
        <MaterialTable
          key={tableKey}
          className="custom-material-table"
          title="רשימת המצביעים"
          columns={columns.map((col) => ({
            ...col,
            render: (rowData) => {
              if (col.field === "edit") {
                return col.render(rowData);
              } else if (col.field === "voted") {
                return (
                  <StyledTableRow>
                    <StyledVotedTableCell align="right" voted={rowData.voted}>
                      {rowData.voted ? <ThumbUpIcon sx={{ mr: "10px" }} /> : <ThumbDownIcon sx={{ mr: "10px" }} />}
                    </StyledVotedTableCell>
                  </StyledTableRow>
                );
              } else {
                return (
                  <StyledTableRow>
                    <StyledTableCell align="right">
                      {rowData[col.field]}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            },
          }))}
          options={{
            debounceInterval: 700,
            padding: "dense",
            filtering: true,
            pageSize: 25,
            pageSizeOptions: [],
          }}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = 'https://elections-bice.vercel.app/v1/elections/data?';
              if (query.search) {
                url += `q=${query.search}`;
              }
              if (query.filters.length) {
                const filter = query.filters.map((filter) => {
                  return `${filter.column.field}${filter.operator}${filter.value}&`;
                });
                url += `${filter.join('')}`;
              }
              url += `page=${query.page + 1}`
              if (query.orderBy) {
                url += `&sort=${query.orderBy.field}:${query.orderDirection}`;
              };

              fetch(url)
                .then((resp) => resp.json())
                .then((resp) => {
                  resolve({
                    data: resp.results,
                    page: query.page,
                    totalCount: 5854,
                  });
                });
            })
          }
          icons={{
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            Filter: FilterListIcon,
            SortArrow: ArrowDownwardIcon,
            Search: Search,
            Clear: Clear
          }}
        />
      </Box>}
      <>
        <ThemeProvider theme={theme}>

        </ThemeProvider>
        {/* ... existing commented out components */}
      </>
    </Box>


  );
};

export default Invoices;
