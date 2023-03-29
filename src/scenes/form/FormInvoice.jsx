import React,{ useState , useEffect} from "react" 
import { useNavigate, useLocation } from "react-router-dom"; 
import { tokens } from "../../theme"; 
import { Box, Button, TextField,useTheme, Typography} from "@mui/material"; 
import Header from "../../components/Header";
const FormInvoice = () =>{
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    id:"",
  });
  
    const theme = useTheme();  
    const [data1, setData1] = useState()
    const id = useLocation();
    const ii = id.state.id;
    console.log(ii)
    useEffect(() => {
        fetch(`http://localhost:3333/Invoices/${ii}`)
        .then((data) => data.json())
        .then((data) => setData1(data))
      }, [])
      // console.log(data1.name)
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

    return(
        <>
            <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
       <form>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
            value={data1.name}
            name="name"
            error={nameError}
            // helperText={touched.name && errors.name}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="cost"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data1.cost}
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
            value={data1.email}
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
            value={data1.phone}
            name="phone"
            error={nameError}
            // helperText={touched.phone && errors.phone}
            sx={{ gridColumn: "span 4" }}
          />
          </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
      </Box>
        </>
    )
}
export default FormInvoice;