import React,{ useState , useEffect} from "react" 
import { useNavigate, useLocation } from "react-router-dom"; 
import { tokens } from "../../theme"; 
import { Box, Button, TextField,useTheme} from "@mui/material"; 
import Header from "../../components/Header";

// import { Link } from "react-router-dom";
const FormInvoice = () =>{
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    cost: "",
    date: "",
    id:"",
  });
  
  const navigate = useNavigate();
    const theme = useTheme(); 
    const colors = tokens(theme.palette.mode);  
    const id = useLocation();
    const ii = id?.state?.id;
    console.log(ii)
    useEffect(() => {
        fetch(`http://localhost:3333/Invoices/${ii}`)
        .then((data1) => data1.json())
        .then((data1) => setData({...data1,name:data1.name,email:data1.email,phone:data1.phone,cost:data1.cost,date:data1.date}))
      }, [ii])
      
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
      function Fromsubmit (e){
        e.preventDefault();
        console.log(data)
        if(ii){
        fetch(`http://localhost:3333/Invoices/${ii}`,{
          method: 'PUT',
          headers: {
            "Content-type":'application/json; charset=UTF-8',
          },
          body: JSON.stringify(data)
        })  
        .then(response => response.json())
        .then(response => {console.log(response)
        });
      }
      else{
        fetch(`http://localhost:3333/Invoices`,{
          method: 'POST',
          headers: {
            "Content-type":'application/json; charset=UTF-8',
          },
          body: JSON.stringify(data)
        })  
        .then(response => response.json())
        .then(response => {console.log(response)
        });
      }
        navigate('/invoices')
        
        
        
        
      }
    return(
        <>
            <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
       <form onSubmit={Fromsubmit}>
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
            value={data?.name}
            name="name"
            error={nameError}
            // helperText={touched.name && errors.name}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Cost"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.cost}
            name="cost"
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
            value={data?.email}
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
            value={data?.phone}
            name="phone"
            error={nameError}
            // helperText={touched.phone && errors.phone}
            sx={{ gridColumn: "span 4" }}
          />
           <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={data?.date}
            name="date"
            error={nameError}
            // helperText={touched.phone && errors.phone}
            sx={{ gridColumn: "span 4" }}
          />
          </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          {ii?<Button type="submit" color="secondary" variant="contained">
            Update User
          </Button>:<Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>}
        </Box>
      </form>
      </Box>
        </>
    )
}
export default FormInvoice;