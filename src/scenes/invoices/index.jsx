import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import React, {useState, useEffect} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Invoices = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {

      field: "action", headerName: "Actions", sortable: false, flex: 1, align: 'center', headerAlign: 'center',hide: false,
      renderCell: (params) => {
        const api = params.api;
        const thisRow = {};
  
        api.getAllColumns().filter((c) => c.field !== "check" && !!c).forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
  
       
  
        return (
          <Box>
                        <VisibilityIcon onClick={() => handleItemAction({ title: "View", action: "view", row: thisRow })} />
            <EditIcon onClick={() => handleItemAction({ title: "Edit", action: "edit", row: thisRow })} />
            <DeleteIcon onClick={() => handleItemAction({ title: "Delete", action: "delete", row: thisRow,open:'true' })} />
          </Box>
  
  
  
        )
      }
    },
  ];
  const handleItemAction=(itemrow)=>{
    switch(itemrow.title){
      case 'View':
      console.log("view")
      break;
      case 'Edit':
      navigate(
        '/FormInvoice',
        {
          state: {
            id : itemrow.row.id
          }
        }
      )      
      break;
      case 'Delete':
        setId(itemrow?.row?.id)
        setOpen(true);

      break;
    }

  }
  const [tableData, setTableData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

 

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    allData();

  }, [])
  const allData=()=>{
    fetch("http://localhost:3333/Invoices")
    .then((data) => data.json())
    .then((data) => setTableData(data))
  }
  const deleteData=()=>{
    fetch(`http://localhost:3333/Invoices/${id}`,{
      method: 'delete',
    })
    .then((data) => data.json())
    .then((data) => setOpen(false))
    allData();
    
  }

  console.log(tableData)
  return (

    // delete dialog box
    <>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete The Invoice Row?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Sure You Want To Delete .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteData}>Yes</Button>
        </DialogActions>
      </Dialog>
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
        {/* <DataGrid checkboxSelection rows={tableData} columns={columns} /> */}
        <DataGrid
              sx={{
                '& .MuiDataGrid-toolbarContainer': {
                  pb: 2
                },
                '& MuiDataGrid-toolbarContainer-toolbarQuickFilter': {
                  m: 20,
                },
              }}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              rows={tableData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onRowClick={handleRowClick}
              pagination
              checkBoxSelection
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
      </Box>
    </Box>
    </>
  );
};

























// import React,{useState,useEffect} from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import {
//   GridRowModes,
//   DataGridPro,
//   GridToolbarContainer,
//   GridActionsCellItem,
// } from '@mui/x-data-grid-pro';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
//   randomId,
// } from '@mui/x-data-grid-generator';

// const initialRows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired,
// };

// function Invoices() {
//     const [tableData, setTableData] = useState([])

//   useEffect(() => {
//     fetch("http://localhost:3333/Invoices")
//       .then((data) => data.json())
//       .then((data) => console.log(data))

//   }, [])

//   const [rows, setRows] = React.useState(tableData);
//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStart = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleRowEditStop = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   const handleDeleteClick = (id) => () => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const columns = [
//     { field: 'name', headerName: 'Name', width: 180, editable: true },
//     { field: 'age', headerName: 'Age', type: 'number', editable: true },
//     {
//       field: 'dateCreated',
//       headerName: 'Date Created',
//       type: 'date',
//       width: 180,
//       editable: true,
//     },
//     {
//       field: 'lastLogin',
//       headerName: 'Last Login',
//       type: 'dateTime',
//       width: 220,
//       editable: true,
//     },
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       cellClassName: 'actions',
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         height: 500,
//         width: '100%',
//         '& .actions': {
//           color: 'text.secondary',
//         },
//         '& .textPrimary': {
//           color: 'text.primary',
//         },
//       }}
//     >
//       <DataGridPro
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStart={handleRowEditStart}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         slots={{
//           toolbar: EditToolbar,
//         }}
//         slotProps={{
//           toolbar: { setRows, setRowModesModel },
//         }}
//       />
//     </Box>
//   );
// }
export default Invoices;
