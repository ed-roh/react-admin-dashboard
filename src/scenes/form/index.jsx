import { Box, Button, TextField,useTheme, Typography} from "@mui/material";
// import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import React,{ useState } from "react"
const Form = () => {
  const [access, setAccess] = React.useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const initialValues = {
  //   name: "",
  //   email: "",
  //   age: "",
  //   phone: "",
  //   access: "",
  // };
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    access: ""
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  function handleSubmit() {
    console.log(data)
  }
  const handleChange = (event) => {
    setAccess(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />



      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            // onBlur={handleBlur}
            onChange={handleChange}
            value={data.name}
            name="name"
            // error={!!touched.name && !!errors.name}
            // helperText={touched.name && errors.name}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Age"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={data.age}
            name="age"
            // error={!!touched.age && !!errors.age}
            // helperText={touched.age && errors.age}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={data.email}
            name="email"
            // error={!!touched.email && !!errors.email}
            // helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="phone Number"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={data.phone}
            name="phone"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address 1"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={data.access}
            name="access"
            // error={!!touched.access && !!errors.access}
            // helperText={touched.access && errors.access}
            sx={{ gridColumn: "span 4" }}
          />
          <Box 
          id="demo-simple-select-label"
          width="60%"
          m="0 auto"
          pt="25px"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            access === "admin"
              ? colors.greenAccent[600]
              : access === "manager"
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius="4px"
          >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px"}} justifyContent="center" >
              {access}
            </Typography>
            </Box>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.access}
            label="Access"
            autoWidth
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  age: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  access: yup.string().required("required"),
});


export default Form;
