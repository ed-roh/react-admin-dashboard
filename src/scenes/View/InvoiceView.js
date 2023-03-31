import React, {useState, useEffect} from 'react'
import {useLocation } from "react-router-dom"; 
import Header from "../../components/Header";
import { Box,useTheme} from "@mui/material"; 
function InvoiceView () {
    //   const navigate = useNavigate();
        const id = useLocation();
        const ii = id?.state?.id;
        // console.log(ii)
    const [data, setData] = useState();
    useEffect(() => {
        fetch(`http://localhost:3333/Invoices/${ii}`)
        .then((data1) => data1.json())
        .then((data1) => setData(data1))
      }, [])
  return (

    <Box m="20px">
    <Header title="INVOICES" subtitle="List of Invoice Balances" />
    <div className="view">
        
    </div>
    <h1>Ubaidullah {data?.cost}</h1>
  </Box>

  )
}
export default InvoiceView;