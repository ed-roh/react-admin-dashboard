import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import './index.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCarousel from "../global/Slider2";
import Nortification from "../nortification/Nortification";
import Navigation from "../nav/Navigation";
// import SliderData from "../global/SliderData";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [record, setRecord] = useState([]);
  const [marks, setMarks] = useState([]);



  //   const fetchData = (async () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/student');
        setRecord(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [])
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get('/data');
        setMarks(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarks();
  }, []);

  // ...

  const fetchMaxScore = (category) => {
    if (marks.length > 0) {
      const categoryScores = marks.map((entry) => entry.scores[category].score);
      const maxScore = Math.max(...categoryScores);
      return maxScore;
    }
    return 0;
  };

  const maxAptitudeScore = fetchMaxScore('aptitude');
  const maxCommunicationScore = fetchMaxScore('verbal');

  const maxTechnicalScore = fetchMaxScore('technical');
  // Display only the first 10 records
  const limitedRecords = record.slice(0, 10);

  return (
    <div className="content" style={{ backgroundColor: "white", marginTop: '40px' }}>
      <div style={{ backgroundColor: "white" }}>
        <div className="col main pt-5 mt-3 container">
          <h2 className="d-sm-block" style={{ color: "blue", textAlign: 'center', padding: '0' }}>Welcome to your Dashboard</h2>

          <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>

          </div>

          <div className="row mb-3">
            <div className="col-xl-4 col-sm-6 py-2">
              <div className="card bg-success text-white h-100">
                <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                  <div className="rotate">
                    <i className="fa fa-code fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">Technical</h6>
                  <h1 className="display-4">{maxTechnicalScore}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2">
              <div className="card text-white bg-info h-100">
                <div className="card-body bg-info">
                  <div className="rotate">
                    <i className="fa fa-cubes fa-4x" aria-hidden="true"></i>
                  </div>
                  <h6 className="text-uppercase">Aptitude</h6>
                  <h1 className="display-4">125</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2">
              <div className="card text-white bg-primary h-100">
                <div className="card-body">
                  <div className="rotate">
                    <i className="fa fa-info fa-4x" aria-hidden="true"></i>
                  </div>
                  <h6 className="text-uppercase">Test Shares</h6>
                  <h1 className="display-4">36</h1>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="row">
            {/* <div className="col-lg-7 col-md-6 col-sm-5 col-xs-12">
              <div className="card">
                 <div className="card-header">
                  <h2><i className="fa fa-hand-pointer-o" aria-hidden="true"></i> Test Information</h2>
                </div> 
                <div className="card-body">
                  
                </div>
                
              </div>
            </div> */}

            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h2><i className="fa fa-file-alt"></i> Notifications</h2>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <nav className=" navbar-light bg-light" style={{textAlign:"center"}}>
                      <a className="navbar-brand"   href="#">Nortification</a>
                    </nav>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MyCarousel />
      </div>
    </div>
  );
};

export default Dashboard;
