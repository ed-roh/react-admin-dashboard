import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
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

import { Link } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Contacts = () => {
  
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
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
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
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
      navigate(
        '/ContactView',
        {
          state: {
            id : itemrow.row.id
          }
        }
      )
      break;
      case 'Edit':
      navigate(
        '/FormContact',
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
    fetch("http://localhost:3333/contact")
    .then((data) => data.json())
    .then((data) => setTableData(data))
  }

  const deleteData=()=>{
    fetch(`http://localhost:3333/contact/${id}`,{
      method: 'delete',
    })
    .then((data) => data.json())
    .then((data) => setOpen(false))
    allData();
  }

  console.log(tableData)

  return (
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
      <Header 
        title="CONTACTS" 
        subtitle="List of Contacts for Future Reference"
      />
      <Link style={{right:"0",padding:"15px", border:"1px solid #3e4396", textDecoration:"none",backgroundColor:"#3e4396", color:"#fff",borderRadius:"5px"}} to="/FormContact">Add New User</Link>
    
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
    </>
  );
};

export default Contacts;
