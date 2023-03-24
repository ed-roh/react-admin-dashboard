import { Box, Button, TextField,useTheme, Typography} from "@mui/material"; 
// import { Formik } from "formik"; 
import { tokens } from "../../theme"; 
// import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"; 
import Header from "../../components/Header"; 
import Select from '@mui/material/Select'; 
import InputLabel from '@mui/material/InputLabel'; 
import MenuItem from '@mui/material/MenuItem'; 
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"; 
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"; 
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"; 
import React,{ useState , useEffect} from "react" 
import { useNavigate } from "react-router-dom"; 
const Form = () => {  
 
 
 
  // const [access, setAccess] = React.useState('user'); 
  const theme = useTheme();  
  const colors = tokens(theme.palette.mode); 
  
 
  const [tid, setTid] = useState()
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    access: "user",
    id:"2",
  });
  
  
  useEffect(() => {
    fetch("http://localhost:3333/Team")
      .then((data) => data.json())
      .then((data) => setTid(data.length+1))
      
  }, [])


  const navigate = useNavigate();
  // const initialValues = {
  //   name: "",
  //   email: "",
  //   age: "",
  //   phone: "",
  //   access: "", 
  // };
    // const [sdata, setSdata] = useState()
  // setData((id)=>{return{
  //   [id]:tid
  // }
  // })
    
    
    const isNonMobile = useMediaQuery("(min-width:600px)");


  const handleChangeaccess = (e) => {
    const name = e.target.name;
    const value = e.target.value;
 
    setData((prev)=>{
      return{
        ...prev,[name]:value
      }
      
    })
    
  };
  const handleChange = (e) => {
    handleNameChange(e);
    const name = e.target.name;
    const value = e.target.value;
    
    setData((prev)=>{
      return{
        ...prev,[name]:value
      }
    })
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 50 + ITEM_PADDING_TOP,
        width: 800,
      },
    },
  };
  function Fromsubmit (e){
    e.preventDefault();
    console.log(data)
    
    fetch("http://localhost:3333/Team",{
      method: 'post',
      headers: {
        "Content-type":'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    })  
    .then(response => response.json())
    .then(response => {console.log(response)
    });
    navigate('/team')
    
    
    
    
  }
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };
  
  const handleBlur = () => {
    if (name === '') {
      setNameError(true);
    }
  };
//   setData((prev) => [
//     // ...prev,
//     // {
//     //     id: "30"
//     // }, 
// ]);

  // console.log(data.id)

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />



      <form onSubmit={Fromsubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
              {/* <div>
      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        onBlur={handleBlur}
        error={nameError}
        helperText={nameError ? 'Name is required' : ''}
      />
    </div> */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.name}
            name="name"
            error={nameError}
            // helperText={touched.name && errors.name}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Age"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.age}
            name="age"
            error={nameError}
            // helperText={touched.age && errors.age}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.email}
            name="email"
            error={nameError}
            // helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="phone Number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.phone}
            name="phone"
            error={nameError}
            // helperText={touched.phone && errors.phone}
            sx={{ gridColumn: "span 4" }}
          />
          <InputLabel 
          id="demo-simple-select-label"
          width="60%"
          >
           <Box
            width="60%"
            m="0 auto"
            p="15px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              data.access === "admin"
                ? colors.greenAccent[600]
                : data.access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
          >
            {data.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {data.access === "manager" && <SecurityOutlinedIcon />}
            {data.access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {data.access}
            </Typography>
          </Box>
          
            </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.access} 
            label="Access"
            name="access"
            autoWidth
            onChange={handleChangeaccess}
            sx={{ gridColumn: "span 2" }}
            MenuProps={MenuProps}
            error={nameError}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"manager"}>Manager</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
          </Select>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  );
};





export default Form;
