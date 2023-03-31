import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import './InvoiceView.css'
import { Link } from "react-router-dom";
function InvoiceView() {
  //   const navigate = useNavigate();
  const id = useLocation();
  const ii = id?.state?.id;
  // console.log(ii)
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`http://localhost:3333/Invoices/${ii}`)
      .then((data1) => data1.json())
      .then((data1) => setData(data1));
  }, []);
  return (
    <Box m="20px">
      <Header title="View" subtitle="The detail of view" />
      <Link style={{right:"0",padding:"15px", border:"1px solid #3e4396", textDecoration:"none",backgroundColor:"#3e4396", color:"#fff",borderRadius:"5px"}} to="/invoices">Go Back</Link>
      <div className="view">
      <table id="customers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.name}</td>
            <td>{data?.email}</td>
            <td>{data?.phone}</td>
            <td id="d">${data?.cost}</td>
            <td>{data?.date}</td>
          </tr>
        </tbody>
      </table>

      </div>
    </Box>
  );
}
export default InvoiceView;
