import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "../../components/Header";

// import { Link } from "react-router-dom";
const FormContact = () => {
  const [data, setData] = useState({
    id: "",
    registrarId: "",
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  {
    /*  Registrar ID    Name     Age       Phone    Email     Address      City    zipcode */
  }
  const navigate = useNavigate();
   
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const id = useLocation();

  const ii = id?.state?.id;

  console.log(ii);

  useEffect(() => {

    fetch(`http://localhost:3333/contact/${ii}`)

      .then((data1) => data1.json())

      .then((data1) =>
      
        setData({

          ...data1,
          name: data1.name,
          email: data1.email,
          phone: data1.phone,

        })
      );

  }, [ii]);

  const handleChange = (e) => {
    handleNameChange(e);
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [name, setName] = useState("");

  const [nameError, setNameError] = useState(false);

  const handleNameChange = (e) => {

    setName(e.target.value);

    setNameError(false);

  };
  const handleBlur = () => {
    if (name === "") {
      setNameError(true);
    }
  };

  function Fromsubmit(e) {

    e.preventDefault();

    console.log(data);

    if (ii) {
      fetch(`http://localhost:3333/contact/${ii}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    } 

    else {

      fetch(`http://localhost:3333/contact`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    }

    navigate("/contacts");

  }
  return (
    <>
      <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />

        {/*  Registrar ID    Name     Age       Phone    Email     Address      City    zipcode */}

        <form onSubmit={Fromsubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Registar ID"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data?.registrarId}
              name="registrarId"
              error={nameError}
              sx={{ gridColumn: "span 2" }}
            />
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
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Age"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data?.age}
              name="age"
              error={nameError}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.city}
              name="city"
              error={nameError}
              sx={{ gridColumn: "span 2" }}
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
              sx={{ gridColumn: "span 2" }}
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
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="zipcode"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data?.zipCode}
              name="zipCode"
              error={nameError}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data?.address}
              name="address"
              error={nameError}
              sx={{ gridColumn: "span 8" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            {ii ? (
              <Button type="submit" color="secondary" variant="contained">
                Update User
              </Button>
            ) : (
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};
export default FormContact;
